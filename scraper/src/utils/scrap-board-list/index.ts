import puppeteer from 'puppeteer'
const getHtml = async (pageNum : number) : Promise<string> => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www1.president.go.kr/petitions/?c=0&only=0&page=${pageNum}&order=0`);
        await page.waitForSelector('.bl_no', { timeout: 1000 });
    
         // 페이지의 HTML을 가져온다.
        const content = await page.content();    
        await browser.close();
        return content;
      } catch (error) {
        console.log(error);
        throw new error;
      }
}



export default getHtml;