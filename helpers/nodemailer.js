const nodemailer = require('nodemailer');

async function main(input) {
    let testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    let info = await transporter.sendMail({
        from: testAccount.smtp.user,
        to: input,
        subject: "Register Review.app",
        text: "Anda telah melakukan registrasi di Review.app"
    })
    console.log("SENT : %s", info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}

module.exports = main