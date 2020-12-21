import { CATEGORY, BEGIN, END, META } from 'typings'

/**
 * 카테고리 , 시작일 종료일 추출
 * @param $
 */
const getMeta = ($: any): META => {
  const meta = $('ul[class=petitionsView_info_list] li')
  const category = <CATEGORY>meta.eq(0).text().substring(4)

  const begin_text = meta.eq(1).text().substring(4)
  const begin = <BEGIN>new Date(begin_text)

  const end_text = meta.eq(2).text().substring(4)
  const end = <END>new Date(end_text)

  return {
    category,
    begin,
    end,
  }
}
export default getMeta
