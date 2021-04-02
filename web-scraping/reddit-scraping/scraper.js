const puppeteer = require ('puppeteer');

const url = 'https://www.reddit.com/r/scraping/'

//initiating Puppeteer
puppeteer
  .launch()
  .then(async browser => {
  
    //opening a new page and navigating to Reddit
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('body');
  
    //manipulating the page's content
    let grabPosts = await page.evaluate(() => {
        let allPosts = document.body.querySelectorAll('.Post');
          
        //storing the post items in an array then selecting for retrieving content
        scrapeItems = [];
        allPosts.forEach(item => {
            let postTitle = item.querySelector('h3').innerText;
            let postDescription = '';
            try { postDescription = item.querySelector('p').innerText; } 
            catch(err) {}
            scrapeItems.push({
                postTitle: postTitle,
                postDescription: postDescription,
            });
        });
        let items = {
        "redditPosts": scrapeItems,
        };
        return items;
    });
    //outputting the scraped data
    console.log(grabPosts);
    //closing the browser
    await browser.close();
  })
  //handling any errors
  .catch (error => {
    console.error(error);
  });