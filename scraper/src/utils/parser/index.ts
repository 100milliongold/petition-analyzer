import cheerio from 'cheerio'


const parser_html = (html : string) => {
    const $ = cheerio.load(html);

    const lists = $('.bl_body ul.petition_list > li');
    
    return lists.map((index, element) => {
        const end_time = $(element).find('.bl_wrap .bl_date').text().replace("청원 종료일" , "").trim();
        
        console.log(end_time);
        
        return end_time;
    })
}



export default parser_html;