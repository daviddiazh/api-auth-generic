const nodemailer = require("nodemailer");
const fs = require('fs');
const { config } = require('../../config/index')

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: config.fromEmailEmail, // generated ethereal user
      pass: config.fromEmailPassword, // generated ethereal password
    },
  });

  const pathFileHtml = `${__dirname}/template.html`;
  const readFileHtml = fs.createReadStream(pathFileHtml);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.fromEmailEmail, // sender address
    to: 'danielle.hyatt48@ethereal.email', // list of receivers
    subject: "Hello since NODE✔", // Subject line
    html: readFileHtml, // html body
    attachments: [
      {
      filename: 'iconoddhtransparente.png',
      path: __dirname + '/iconoddhtransparente.png',
      cid: 'iconoddhtransparente'
      }
    ]
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendEmail();