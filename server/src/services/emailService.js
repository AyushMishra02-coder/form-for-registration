import nodemailer from 'nodemailer';
import { registrationConfirmation } from '../emails/registrationConfirmation.js';

let transporter;
let transporterKey;

function getTransporter() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return null;

  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const key = `${SMTP_HOST}:${port}:${secure}:${SMTP_USER}`;
  if (transporter && transporterKey === key) return transporter;

  transporterKey = key;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000
  });
  return transporter;
}

export async function sendRegistrationConfirmation(registration) {
  const mailer = getTransporter();
  if (!mailer) return { status: 'not_configured' };

  const fromName = process.env.MAIL_FROM_NAME || 'Zevyon Esports';
  const fromEmail = process.env.MAIL_FROM_EMAIL || process.env.SMTP_USER;
  await mailer.sendMail({
    from: { name: fromName, address: fromEmail },
    to: registration.email,
    ...registrationConfirmation(registration)
  });
  return { status: 'sent' };
}
