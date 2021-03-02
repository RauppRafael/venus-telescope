var mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
})

module.exports = {
    async send({ subject, message, to }) {
        const data = {
            from: process.env.MAILGUN_FROM_EMAIL,
            html: message,
            to,
            subject,
        }

        mailgun.messages().send(data, (error) => {
            if (error) console.log(error)
        })
    },
}
