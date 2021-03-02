require('dotenv').config()

const mail = require('./src/Mail')
const venus = require('./src/Venus')

const main = async () => {
    const usage = await venus.getBorrowUsage()
    const subject = (usage * 100).toFixed(2) + '% is your current collateral usage'

    mail.send({
        to: process.env.MAILGUN_DANGER_EMAIL || process.env.MAILGUN_WARNING_EMAIL,
        subject,
        message: subject
            + '<br><br>'
            + 'To check it out access <a href="https://app.venus.io">app.venus.io</a>',
    })
}

main()
