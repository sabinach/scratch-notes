const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.forextradingbig.com/instaforex-broker-review/?ref=hackernoon.com';

axios.get(url)
	.then(response => {
		const html = response.data;
	})
	.catch(error => {
		console.log(error);
	})