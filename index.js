require('dotenv').config()

const venus = require('./src/Venus')

const main = async () => {
    await venus.handle({
        wallet: process.env.WALLET_ADDRESS,
        yieldWatchApiUrl: process.env.YIELDWATCH_API_URL,
        warningEmail: process.env.MAILGUN_DANGER_EMAIL,
        dangerEmail: process.env.MAILGUN_WARNING_EMAIL,
    })
}

main()
