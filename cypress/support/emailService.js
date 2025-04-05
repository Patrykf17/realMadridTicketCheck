const nodemailer = require('nodemailer');

module.exports = {
    send: (dateConfirmed, ticketsAvailable) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const text = !dateConfirmed ?
            '⚠️ Date not confirmed' :
            ticketsAvailable ?
                '✅ Tickets available' :
                '❌ Tickets unavailable';

        return transporter.sendMail({
            from: `"Real Madrid Tickets Status" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_RECIPIENT,
            subject: '🎟️ Ticket Update',
            text
        });
    }
};
