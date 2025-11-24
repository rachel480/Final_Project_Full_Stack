const nodemailer = require('nodemailer');

const sendEmail = async ({ from = 'English City', fromEmail, to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${from}" <${process.env.EMAIL_USER || fromEmail}>`,
    to,
    subject,
    html,
    attachments: [
      {
        filename: "logo.jpg",
        path: __dirname + "/logo.jpg",
        cid: "mylogo"
      }
    ]
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
};

module.exports = { sendEmail }