require('dotenv-flow').config({
    node_env: process.env.NODE_ENV || 'dev',
    silent: true
});

const ANIME_CORNER_BASE_URL = process.env.ANIME_CORNER_BASE_URL
const ANIME_CORNER_WEEK_RANK_URL = process.env.ANIME_CORNER_WEEK_RANK_URL
const KUMA_API_NEWS_URL = process.env.KUMA_API_NEWS_URL


module.exports ={
    ANIME_CORNER_BASE_URL:ANIME_CORNER_BASE_URL,
    ANIME_CORNER_WEEK_RANK_URL:ANIME_CORNER_WEEK_RANK_URL,
    KUMA_API_NEWS_URL:KUMA_API_NEWS_URL
}