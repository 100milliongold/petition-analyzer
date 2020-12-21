import { normalizeText } from '../../../../utils'

import { CONTENT } from 'typings'

/**
 * 글내용 추출
 * @param $
 */
const getContent = ($: any): CONTENT => {
  const content = <CONTENT>(
    normalizeText(
      $('div[class=petitionsView_write] div[class=View_write]').text()
    )
  )
  return content
}
export default getContent
