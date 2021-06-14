const moment = require('moment')
require('moment-timezone')

const getToday = () => {
    try {
        return moment(new Date()).format('yyyy-MM-DD')
    } catch (e) {
        const date = new Date();
        const year = date.getFullYear();
        const month = ("0" + (1 + date.getMonth())).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);

        return year + "-" + month + "-" + day;
    }
}

const getAmericaTodayTime = () => {
    try {
        return moment().tz("America/Los_Angeles").format('yyyy-MM-DD');
    } catch (e) {
        return getToday()
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
    getAmericaTodayTime: getAmericaTodayTime,
    getNoArr: getNoArr,
    dateToFormat: dateToFormat
}