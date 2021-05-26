const cheerio = require('cheerio');
const Axios = require('axios');
const { ANIME_CORNER_WEEK_RANK_URL, ANIME_CORNER_BASE_URL } = require('./appConstant');
const { getNoArr, dateToFormat } = require('./util/utils')

const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const cookieJar = new tough.CookieJar();

axiosCookieJarSupport(Axios);

const getAnimeCornerData = async (siteUrl) => {

    const $ = await getAnimeCornerCheerio(siteUrl)

    if ($) {
        const result = Array.from($('div.tt-post'))
            .map(data => {
                const image = $(data).find('a img').attr('data-ezsrc') ||$(data).find('a img').attr('src');
                const category = $(data).find('div.tt-post-cat').text();
                const title = $(data).find('a.tt-post-title').text();
                const url = $(data).find('a.tt-post-title').attr('href')
                const date = dateToFormat($(data).find('span.tt-post-date').text());
                const summary = $(data).find('div.simple-text').text().trim();
                return { image, category, title, date, summary, url }
            })
        return result;
    }
    return [];
}


const getAllAniCornerDatas = async () => {

    const lastPageNo = await getLastPage()
    const pageArr = getNoArr(lastPageNo)

    return pageArr.reduce((acc, pageNo) => {
        acc = acc
            .then(data => {
                return new Promise((res) => {
                    setTimeout(async () => {
                        const siteUrl = `${ANIME_CORNER_BASE_URL}page/${pageNo}`
                        const aniCornerData = await getAnimeCornerData(siteUrl)
                        const siteArr = data ? [...data, ...aniCornerData] : [...aniCornerData]
                        res(siteArr)
                    }, 300);
                })
            })
        return acc;
    }, Promise.resolve())
        .catch(e => {
            console.error(`getAllAniCornerDatas error :${e}`)
            return false
        })
}

const getAniCornerDataToSelectDate = async (selectDate) => {

    const lastPageNo = await getLastPage()
    const totalPageArr = getNoArr(lastPageNo)
    const selectPageArr = [];
    
    for (let i = 1; i < totalPageArr.length; i++) {

        const siteUrl = `${ANIME_CORNER_BASE_URL}page/${i}`
        const $ = await getAnimeCornerCheerio(siteUrl)
        let isSelectDate = true;
        

        if ($) {
            const result = Array.from($('div.tt-post'))
            isSelectDate = result.some(data => dateToFormat($(data).find('span.tt-post-date').text()) === selectDate)
            if (!isSelectDate) return selectPageArr;
            for (let j = 0; j < result.length; j++) {

                const date = dateToFormat($(result[j]).find('span.tt-post-date').text());
                if (selectDate === date) {
                    const image = $(result[j]).find('a img').attr('data-ezsrc') ||$(result[j]).find('a img').attr('src');
                    const category = $(result[j]).find('div.tt-post-cat').text();
                    const title = $(result[j]).find('a.tt-post-title').text();
                    const url = $(result[j]).find('a.tt-post-title').attr('href')
                    const summary = $(result[j]).find('div.simple-text').text().trim();
                    selectPageArr.push({ image, category, title, date, summary, url })
                    isSelectDate = true
                }
            }
        }
    }
    return selectPageArr;
}

getLastPage = async () => {
    const $ = await getAnimeCornerCheerio(ANIME_CORNER_BASE_URL)

    if ($) {
        const lastPageNo = Array.from($('ul.page-numbers li a'))
            .map(data => parseInt($(data).text()) || 0)
            .reduce((acc, pageNo) => {
                if (pageNo > acc) acc = pageNo;
                return acc;
            })
        return lastPageNo;
    }
    return 0;
}

getAnimeCornerCheerio = async (url) => {
    return Axios.get(url, {
        jar: cookieJar,
        withCredentials: true, // If true, send cookie stored in jar
    })
        .then(res => cheerio.load(res.data, { ignoreWhitespace: true }))
        .catch(e => {
            console.error(`getAnimeCornerCheerio 에러 ${e}`)
            return false
        })
}


module.exports = {
    getAllAniCornerDatas: getAllAniCornerDatas,
    getAnimeCornerData: getAnimeCornerData,
    getAniCornerDataToSelectDate: getAniCornerDataToSelectDate
}
