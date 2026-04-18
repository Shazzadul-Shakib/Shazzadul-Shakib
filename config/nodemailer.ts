import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_USER;
const emailPass = (process.env.EMAIL_PASS || process.env.PASS || '').replace(
  /\s+/g,
  '',
);

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export const mailOptions = {
  from: emailUser,
  to: emailUser,
};
