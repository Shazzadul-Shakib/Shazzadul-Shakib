import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shakib1186@gmail.com",
    pass: process.env.PASS,
  },
});

export const mailOptions = {
  from: "shakib1186@gmail.com",
  to: "shakib1186@gmail.com",
};
