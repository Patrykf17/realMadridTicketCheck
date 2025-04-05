
class realMadridPage {

    dateConfirmed;
    ticketsAvailable;

    get elements() {
        return {
            cookiesBtn: () => cy.get('#onetrust-accept-btn-handler'),
            monthBtn: (month) => cy.get('.rm-chip__label').contains(month),
            filtersBtn: () => cy.get('.events-filter__label'),
            firstTeamCheckbox: () => cy.get("input[id='realmadrid-com:sports/futbol/primer-equipo-masculino']"),
            showEventsBtn: () => cy.get('.rm-button__content'),
            matchdayHeader: (matchdayNumber) => cy.get('.event-card__subtitle').contains(`Matchday ${matchdayNumber}`),
            dateText: (date) => cy.get('.event-card__info').contains(date),
            ticketsStatus: () => cy.get('.event-card__text'),
        };
    }

    navigate() {
        cy.visit('/tickets');
    }

    acceptCookies() {
        this.elements.cookiesBtn().click();
    }

    selectMonth(month) {
        this.elements.monthBtn(month).click();
    }

    applyFirstTeamFilter() {
        this.elements.filtersBtn().click();
        this.elements.firstTeamCheckbox().check().should('be.checked');
    }

    showFilteredEvents() {
        this.elements.showEventsBtn().click();
    }

    assertMatchdayVisible(matchdayNumber) {
        this.elements.matchdayHeader(matchdayNumber).should('be.visible');
    }

    verifyDateConfirmation(matchdayNumber, date) {
        this._withinMatchdayCard(matchdayNumber, () => {
            this.elements.dateText(date)
                .should('be.visible')
                .invoke('text')
                .then((text) => {
                    if (text.includes('(date and time to be confirmed)')) {
                        this.dateConfirmed = false;
                        cy.log('Date is not confirmed');
                    } else {
                        this.dateConfirmed = true;
                        cy.log('Date is confirmed');
                    }
                });
        });
        return cy.wrap(this.dateConfirmed);
    }

    verifyTicketAvailability(matchdayNumber) {
        this._withinMatchdayCard(matchdayNumber, () => {
            this.elements.ticketsStatus()
                .should('be.visible')
                .invoke('text')
                .then((text) => {
                    if (text.includes('Tickets for general public available soon')) {
                        this.ticketsAvailable = true;
                        cy.log('Tickets are available');
                    } else {
                        this.ticketsAvailable = false;
                        cy.log('Tickets are not available');
                    }
                });
        });
        return cy.wrap(this.ticketsAvailable);
    }

    _withinMatchdayCard(matchdayNumber, callback) {
        this.elements.matchdayHeader(matchdayNumber)
            .parents('.event-card__content')
            .within(callback);
    }

    sendEmail() {
        cy.wrap({
            dateConfirmed: this.dateConfirmed,
            ticketsAvailable: this.ticketsAvailable
        }).then((data) => {
            return cy.task('sendEmail', data);
        });
    }
}

export default new realMadridPage();
