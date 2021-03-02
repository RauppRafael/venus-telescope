const axios = require('axios')

const getVenusAccount = async () => {
    const url = process.env.YIELDWATCH_API_URL + process.env.WALLET_ADDRESS + '?platforms=venus'

    return (await axios(url)).data.result.Venus
}

module.exports = {
    async getBorrowUsage() {
        const venus = await getVenusAccount()
        const values = venus.supplyBorrowData.totalUSDValues

        return values.borrow / (values.supply * 0.6)
    },
}
