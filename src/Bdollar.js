const axios = require('axios')
const mail = require('./Mail')
const moment = require('moment')
const { throttle } = require('throttle-debounce')

class Bdollar {
    constructor() {
        const minute = 60000

        this.throttleSendEmail = throttle(minute * 60, true, this.sendEmail)
    }

    async handle({ apiUrl, priceThreshold, notificationEmail }) {
        const price = await this.price({ apiUrl })

        if (price < priceThreshold)
            this.throttleSendEmail({
                price,
                notificationEmail,
            })

        return price
    }

    async price({ apiUrl }) {
        return (await axios(apiUrl, {
            params: {
                token: 'BDO',
            },
        })).data.data.price
    }

    async sendEmail({ price, notificationEmail }) {
        await mail.send({
            to: notificationEmail,
            subject: `$${ price.toFixed(3) } per BDO.`,
            message: `Current bDollar price is $${ price.toFixed(2) }.`,
        })

        console.log(`${ moment().toString() } | Bdollar notification sent`)
    }
}

module.exports = new Bdollar()
