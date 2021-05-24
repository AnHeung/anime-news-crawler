const { getAllAniCornerDatas, getAnimeCornerData, getAniCornerDataToSelectDate } = require('./animeCornerCrawler')
const { getToday } = require('./util/utils')
const { saveAnimationNewsCrawlerData, getAnimationNewsCrawlerData } = require('./repository/repository')

const crawlingTodayAnimationNews = async () => {

    try {
        const today = getToday()
        const todayUpdateNews = await getAniCornerDataToSelectDate(today)
        if (!todayUpdateNews || todayUpdateNews && todayUpdateNews.length === 0) {
            console.log('crawlingTodayAnimationNews 업데이트 내용이 없습니다.')
            return false;
        }
        return await saveAnimationNewsCrawlerData(todayUpdateNews)

    } catch (e) {
        console.error(`crawlingTodayAnimationNews ${e}`)
        return false
    }

}

const crawlingAllAnimationNews = async () => {
    try {
        const aniCornerDates = await getAllAniCornerDatas()
        if (aniCornerDates) {
            return await saveAnimationNewsCrawlerData(aniCornerDates)
        }
    } catch (e) {
        console.error(`crawlingAllAnimationNews error :${e}`)
        return false
    }
}

module.exports = {
    crawlingTodayAnimationNews: crawlingTodayAnimationNews,
    crawlingAllAnimationNews: crawlingAllAnimationNews
}