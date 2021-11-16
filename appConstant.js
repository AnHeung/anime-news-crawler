require('dotenv-flow').config({
    node_env: process.env.NODE_ENV || 'dev',
    silent: true
});

const ANIME_CORNER_BASE_URL = 'https://animecorner.me/'
const ANIME_CORNER_WEEK_RANK_URL = 'https://animecorner.me/category/anime-corner/rankings/anime-of-the-week/'
const NEWS_API_URL = process.env.NEWS_API_URL
const API_KEY = process.env.API_KEY
const API_KEY_VALUE = process.env.API_KEY_VALUE


module.exports ={
    ANIME_CORNER_BASE_URL:ANIME_CORNER_BASE_URL,
    ANIME_CORNER_WEEK_RANK_URL:ANIME_CORNER_WEEK_RANK_URL,
    NEWS_API_URL:NEWS_API_URL,
    API_KEY:API_KEY,
    API_KEY_VALUE,API_KEY_VALUE 
}