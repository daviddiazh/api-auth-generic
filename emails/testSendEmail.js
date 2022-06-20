const nodemailer = require("nodemailer");
const fs = require('fs')

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'jalyn.haley12@ethereal.email', // generated ethereal user
      pass: '8J5M4ZwqBGpTUzphRK', // generated ethereal password
    },
  });

  const pathFileHtml = `${__dirname}/index.html`;
  const readFileHtml = fs.createReadStream(pathFileHtml);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'jalyn.haley12@ethereal.email', // sender address
    to: "jalyn.haley12@ethereal.email", // list of receivers
    subject: "Hello since NODE✔", // Subject line
    text: "Hello world in TEXT?", // plain text body
    html: readFileHtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendEmail();