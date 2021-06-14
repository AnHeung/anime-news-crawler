const Axios = require('axios')
const { NEWS_API_URL } = require('../appConstant')


const saveAnimationNewsCrawlerData = async (data) => {

    const params = { data }

    return Axios.post(NEWS_API_URL, params)
        .then(data => {
            console.log('saveAnimationNewsCrawlerData 성공')
            return true;
        })
        .catch(e => {
            console.error(`saveAnimationNewsCrawlerData 통신 에러 ${e}`)
            return false
        })
}

const getAnimationNewsCrawlerData = async (startDate, endDate) => {

    const params = { startDate, endDate }

    return Axios.get(NEWS_API_URL, { params })
        .then(result => {
            if (result.data.err) return [];
            return result.data.data
        })
        .catch(e => {
            console.error(`saveAnimationNewsCrawlerData 통신 에러 ${e}`)
            return []
        })
}

module.exports = {
    saveAnimationNewsCrawlerData: saveAnimationNewsCrawlerData,
    getAnimationNewsCrawlerData: getAnimationNewsCrawlerData
}