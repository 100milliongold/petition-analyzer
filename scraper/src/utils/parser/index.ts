import cheerio from 'cheerio'
import { BOARD } from "typings";

/**
 * 출력된 데이터를 토대로 json으로 파싱한다.
 * @param html 
 * @returns 
 */
const parser_html = (html : string) => {
    const $ = cheerio.load(html);

    const lists = $('.bl_body ul.petition_list > li');

    const res : BOARD[] = [];

    lists.each((index, element) => {
        const end_date = $(element).find('.bl_wrap .bl_date').text().replace("청원 종료일" , "").trim();
        const pageNo = $(element).find('.bl_wrap .bl_subject a').attr("href")?.replace("/petitions/" , "").trim();
        
        const date = new Date(`${end_date}T00:00:00+09:00`);    
        if(end_date && pageNo){
            res.push({
                end_date : date,
                pageNo : parseInt(pageNo)
            })
        }
    })
    
    return res;
}



export default parser_html;