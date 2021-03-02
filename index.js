require('dotenv').config()

const venus = require('./src/Venus')
const bdollar = require('./src/Bdollar')

const main = async () => {
    try {
        await venus.handle({
            yieldWatchApiUrl: process.env.YIELDWATCH_API_URL,
            wallet: process.env.WALLET_ADDRESS,
            notificationEmail: process.env.MAILGUN_NOTIFICATION_EMAIL,
            dangerEmail: process.env.MAILGUN_DANGER_EMAIL,
        })

        console.log('Venus handled')
    }
    catch (e) {
        console.log(e)
    }

    try {
        await bdollar.handle({
            apiUrl: process.env.BDOLLAR_API_URL,
            priceThreshold: process.env.BDOLLAR_PRICE_THRESHOLD,
            notificationEmail: process.env.MAILGUN_NOTIFICATION_EMAIL,
        })

        console.log('Bdollar handled')
    }
    catch (e) {
        console.log(e)
    }

}

main()
// setInterval(main, 60000)
