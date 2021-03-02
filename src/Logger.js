const colors = require('colors')
const moment = require('moment')

module.exports = {
    log(message) {
        console.log(colors.gray(moment().toString()), colors.green(message))
    },

    error(error) {
        console.log(colors.gray(moment().toString()), colors.red(error))
    },
}
