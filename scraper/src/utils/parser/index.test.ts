import parser_html from "./index";
import html from './sample'

describe('parser_html', () => {
  test('파셔', () => {
    const res = parser_html(html)
    console.log(res);
    
  })
})


