require('dotenv').config();
const axios = require('axios');

const main = async function() {
    const url = process.env.YIELDWATCH_API_URL + process.env.WALLET_ADDRESS + '?platforms=venus'
    const venus = (await axios(url)).data.result.Venus
    const values = venus.supplyBorrowData.totalUSDValues

    const limit = values.supply * 0.6

    console.log('limit', limit)
    console.log('borrowed', values.borrow)
    console.log('used', 100 * values.borrow / limit)
}

main()
