const moment = require('moment')

const getToday = () => {
    try {
        return moment(new Date()).format('yyyy-MM-DD')
    } catch (e) {
        return moment(new Date())
    }
}


const getNoArr = (no) => {
    const noArr = [];

    for (let i = 1; i <= no; i++) {
        noArr.push(i)
    }
    return noArr
}

const dateToFormat = (date) => {
    try {
        if (!date) return "정보없음"
        const format = "yyyy-MM-DD"
        const formatDate = moment(new Date(date)).format(format) || "정보없음"
        return formatDate
    } catch (e) {
        console.error(`dateToFormat error :${e}`)
        return date
    }
}

module.exports = {
    getToday: getToday,
    getNoArr: getNoArr,
    dateToFormat: dateToFormat
}