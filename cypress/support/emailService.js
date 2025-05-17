import nodemailer from 'nodemailer';

export const send = ({ dateConfirmed, ticketsAvailable }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const dateStatus = dateConfirmed ? '✅ Date is confirmed' : '⚠️ Date not confirmed';
    const ticketStatus = ticketsAvailable ? '✅ Tickets available' : '❌ Tickets unavailable';
    const text = `${dateStatus}\n${ticketStatus}`;

    return transporter.sendMail({
        from: `"Real Madrid Tickets Status" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECIPIENT,
        subject: '🎟️ Ticket Update',
        text
    });
};