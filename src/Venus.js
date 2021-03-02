const axios = require('axios')
const mail = require('./Mail')

module.exports = {
    async handle({ wallet, yieldWatchApiUrl, notificationEmail, dangerEmail }) {
        const account = await this.account({ wallet, yieldWatchApiUrl })
        const usage = await this.getBorrowUsage({ account })

        await this.sendNotification({ usage, notificationEmail, dangerEmail })
    },

    async account({ wallet, yieldWatchApiUrl }) {
        const url = yieldWatchApiUrl + wallet + '?platforms=venus'

        return (await axios(url)).data.result.Venus
    },

    async getBorrowUsage({ account }) {
        const { borrow, supply } = account.supplyBorrowData.totalUSDValues

        return borrow / (supply * 0.6)
    },

    async sendNotification({ usage, notificationEmail, dangerEmail }) {
        const subject = (usage * 100).toFixed(2) + '% is your current collateral usage'

        await mail.send({
            to: dangerEmail || notificationEmail,
            subject,
            message: subject
                + '<br><br>'
                + 'To check it out access <a href="https://app.venus.io">app.venus.io</a>',
        })
    },
}
