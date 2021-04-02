const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.forextradingbig.com/instaforex-broker-review/?ref=hackernoon.com';

axios.get(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const scrapedata = $('a', '.comment-bubble').text()
        console.log(scrapedata);
    })
    .catch(error => {
        console.log(error);
    })
