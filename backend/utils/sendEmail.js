import nodemailer from "nodemailer"

export const sendEmail = async (email, subject, content) => {
    try {
        const transport = nodemailer.createTransport({
            port: 587,
            secure: false,
            host: 'smtp.gmail.com',
            auth: {
                user: 'tsedeniyazewdu116@gmail.com',
                pass: 'gujzgavxhtxaazjz'
            }
        })

        const mailOptions = {
            from: 'tsedeniyazewdu116@gmail.com',
            to: email,
            subject: subject,
            html: content
        }

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Email not sent", error)
            } else {
                console.log("Email sent succussfully", info.response)
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}