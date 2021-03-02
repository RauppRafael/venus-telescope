require('dotenv').config()

const bdollar = require('./src/Bdollar')
const venus = require('./src/Venus')
const logger = require('./src/Logger')

const main = async () => {
    try {
        const usage = await venus.handle({
            yieldWatchApiUrl: process.env.YIELDWATCH_API_URL,
            wallet: process.env.WALLET_ADDRESS,
            notificationEmail: process.env.MAILGUN_NOTIFICATION_EMAIL,
            dangerEmail: process.env.MAILGUN_DANGER_EMAIL,
        })

        logger.log(`Current collateral usage is ${ (usage * 100).toFixed(2) }%`)
    }
    catch (e) {
        // TODO send email
        throw e
    }

    try {
        const price = await bdollar.handle({
            apiUrl: process.env.BDOLLAR_API_URL,
            priceThreshold: process.env.BDOLLAR_PRICE_THRESHOLD,
            notificationEmail: process.env.MAILGUN_NOTIFICATION_EMAIL,
        })

        logger.log(`Current BDO price is $${ price.toFixed(3) }`)
    }
    catch (e) {
        // TODO send email
        throw e
    }

    setTimeout(main, (60000 * 5) + 1000)
}

main()
