import realMadridPage from '../support/realMadridPage';

const matchdayNumber = 38;
const month = 'May';
const dayOfMonth = '25';
const date = month + ' ' + dayOfMonth;

describe('Real Madrid Ticket Check', () => {
    it('Check if tickets are available', () => {
        realMadridPage.navigate();
        realMadridPage.acceptCookies();
        realMadridPage.selectMonth(month);
        realMadridPage.applyFirstTeamFilter();
        realMadridPage.showFilteredEvents();
        realMadridPage.assertMatchdayVisible(matchdayNumber);
        realMadridPage.verifyDateConfirmation(matchdayNumber, date).then(() => {
            realMadridPage.verifyTicketAvailability(matchdayNumber).then(() => {
                realMadridPage.sendEmail();
            });
        });
    });
});