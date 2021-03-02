const axios = require('axios')
const moment = require('moment')
const mail = require('./Mail')

class Bdollar {
    constructor() {
        this.lastNotificationMoment = moment().subtract(1, 'days')
    }

    async handle({ apiUrl, priceThreshold, notificationEmail }) {
        const price = await this.price({ apiUrl })

        if (await this.shouldNotify({ price, priceThreshold }))
            await this.sendNotification({
                price,
                notificationEmail,
            })
    }

    async price({ apiUrl }) {
        return (await axios(apiUrl, {
            params: {
                token: 'BDO',
            },
        })).data.data.price
    }

    async shouldNotify({ price, priceThreshold }) {
        return price < priceThreshold
            && moment()
                .subtract(1, 'hours')
                .isSameOrAfter(this.lastNotificationMoment)
    }

    async sendNotification({ price, notificationEmail }) {
        this.lastNotificationMoment = moment()

        await mail.send({
            to: notificationEmail,
            subject: `$${ price.toFixed(3) } per BDO.`,
            message: `Current bDollar price is $${ price.toFixed(2) }.`,
        })
    }
}

module.exports = new Bdollar()
