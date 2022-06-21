const bcrypt = require('bcrypt');
const userModel = require('../models/User')

const nodemailer = require("nodemailer");
const fs = require('fs');
const { config } = require('../config/index')

const createUser = async (data) => {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await userModel.create({
        ...data,
        password: hash
    });
    let newObjectUser = newUser;
    newObjectUser = newObjectUser.toObject();
    delete newObjectUser.password;
    console.log(newObjectUser)
    return newObjectUser;
}

const findAll = async () => {
    const data = await userModel.find();
    return data;
}

const findByEmail = async (email) => {
    const user = await userModel.findOne({email});
    return user;
}

const sendEmail = async (email) => {
    const user = await userModel.findOne({email});
    if( !user ){
        throw new Error('Ocurrio un error - Email')
    }
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: config.fromEmailEmail, // generated ethereal user
          pass: config.fromEmailPassword, // generated ethereal password
        },
    });

    const pathFileHtml = `${__dirname}/emails/template.html`;
    const readFileHtml = fs.createReadStream(pathFileHtml);

    const currentYear = new Date().getFullYear();

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: config.fromEmailEmail, // sender address
        to: `${user.email}`, // list of receivers
        subject: "Welcome to the App", // Subject line
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-size: 14px;
                    color: rgb(43, 43, 43);
                    background-color: rgb(236, 236, 236);
                }
                h1 {
                    text-align: center;
                    color: blue;
                }
                .footer {
                    text-align: center;
                }
            </style>
            <title>HTML</title>
        </head>
        <body>
            <img width="100px" src="cid:iconoddhtransparente" alt="Logo App">
            <h1>Welcome user, emails sended with Node.js</h1>
            <p>With this email get all information of us products!</p>
            
            <br /><br /><br /><br />
        
            <footer class="footer">&copy; Copyright David Diaz</footer>
        </body>
        </html>`, // html body
        attachments: [
            {
                filename: 'iconoddhtransparente.png',
                path: __dirname + '/emails/iconoddhtransparente.png',
                cid: 'iconoddhtransparente'
            }
        ]
    });
}


module.exports = {
    createUser,
    findAll,
    findByEmail,
    sendEmail
}
