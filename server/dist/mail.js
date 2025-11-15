import FormData from 'form-data';
import Mailgun from 'mailgun.js';
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
export const sendEmail = async (to, subject, html) => {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: `Your App <noreply@${process.env.MAILGUN_DOMAIN}>`,
        to: [to],
        subject,
        html,
    });
};
export { mg };
//# sourceMappingURL=mail.js.map