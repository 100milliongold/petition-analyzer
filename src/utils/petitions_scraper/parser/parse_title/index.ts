import { TITLE } from 'typings'

/**
 * 타이틀 추출
 * @param $
 */
const getTitle = ($: any): TITLE => {
  const title = $('h3[class=petitionsView_title]').eq(0).text()
  return title
}
export default getTitle
