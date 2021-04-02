const puppeteer = require('puppeteer');

const url = "https://news.ycombinator.com/";

async function run () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: 'screenshot.png'});
    browser.close();
}

run();