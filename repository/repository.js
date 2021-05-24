const Axios = require('axios')
const { KUMA_API_NEWS_URL } = require('../appConstant')


const saveAnimationNewsCrawlerData = async (data) => {

    const params = { data }

    return Axios.post(KUMA_API_NEWS_URL, params)
        .then(true)
        .catch(e => {
            console.error(`saveAnimationNewsCrawlerData 통신 에러 ${e}`)
            return false
        })
}

const getAnimationNewsCrawlerData = async () => {

    return Axios.get(KUMA_API_NEWS_URL)
        .then(result => result.data)
        .catch(e => {
            console.error(`saveAnimationNewsCrawlerData 통신 에러 ${e}`)
            return false
        })
}

module.exports = {
    saveAnimationNewsCrawlerData: saveAnimationNewsCrawlerData,
    getAnimationNewsCrawlerData: getAnimationNewsCrawlerData
}