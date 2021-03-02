const axios = require('axios')
const mail = require('./Mail')
const moment = require('moment')
const { throttle } = require('throttle-debounce')

class Venus {
    constructor() {
        const minute = 60000

        this.throttleSendDangerEmail = throttle(minute * 2, true, this.sendEmail)
        this.throttleSendNotificationEmail = throttle(minute * 60, true, this.sendEmail)
    }

    async handle({ wallet, yieldWatchApiUrl, notificationEmail, dangerEmail }) {
        const account = await this.account({ wallet, yieldWatchApiUrl })
        const usage = await this.getBorrowUsage({ account })

        const danger = usage < 0.50 || usage > 0.8
        const notify = usage < 0.55 || usage > 0.73

        if (danger) {
            this.throttleSendDangerEmail({ usage, to: dangerEmail })
        }
        else if (notify) {
            this.throttleSendNotificationEmail({ usage, to: notificationEmail })
        }

        return usage
    }

    async account({ wallet, yieldWatchApiUrl }) {
        const response = await axios(yieldWatchApiUrl + wallet + '?platforms=venus')

        return response.data.result.Venus
            ? response.data.result.Venus
            : console.log(response)
    }

    async getBorrowUsage({ account }) {
        const { borrow, supply } = account.supplyBorrowData.totalUSDValues

        return borrow / (supply * 0.6)
    }

    async sendEmail({ usage, to }) {
        const subject = (usage * 100).toFixed(2) + '% is your current collateral usage'

        await mail.send({
            to,
            subject,
            message: subject
                + '<br><br>'
                + 'To check it out access <a href="https://app.venus.io">app.venus.io</a>',
        })

        console.log(`${ moment().toString() } | Venus notification sent`)
    }
}

module.exports = new Venus()
