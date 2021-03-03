require('dotenv').config()

const bdollar = require('./src/Bdollar')
const venus = require('./src/Venus')
const mail = require('./src/Mail')
const logger = require('./src/Logger')
const stringToBoolean = require('./src/helpers/string-to-boolean')

const sendErrorEmail = async (error) => {
    await mail.send({
        to: process.env.MAILGUN_DANGER_EMAIL || process.env.MAILGUN_NOTIFICATION_EMAIL,
        subject: `Venus Telescope Error!`,
        message: error,
    })
}

const main = async () => {
    try {
        const usage = await venus.handle({
            wallet: process.env.WALLET_ADDRESS,
            notificationEmail: process.env.MAILGUN_NOTIFICATION_EMAIL,
            dangerEmail: process.env.MAILGUN_DANGER_EMAIL,
            usageDangerLow: process.env.VENUS_USAGE_DANGER_LOW,
            usageLow: process.env.VENUS_USAGE_LOW,
            usageHigh: process.env.VENUS_USAGE_HIGH,
            usageDangerHigh: process.env.VENUS_USAGE_DANGER_HIGH
        })

        logger.log(`Current collateral usage is ${ (usage * 100).toFixed(2) }%`)
    }
    catch (e) {
        await sendErrorEmail(e)

        throw e
    }

    if (stringToBoolean(process.env.BDOLLAR_ENABLED)) {
        try {
            const price = await bdollar.handle({
                priceThreshold: process.env.BDOLLAR_PRICE_THRESHOLD,
                notificationEmail: process.env.MAILGUN_NOTIFICATION_EMAIL,
            })

            logger.log(`Current BDO price is $${ price.toFixed(3) }`)
        }
        catch (e) {
            await sendErrorEmail(e)

            throw e
        }
    }

    setTimeout(main, (60000 * 5) + 1000)
}

main()
