import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text,
  });
};

export default sendEmail;
