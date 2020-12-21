import { NUM_AGREE } from 'typings'

const regex = /[^0-9\.]+/g

/**
 * 추천 동의수 추출
 * @param $
 */
const parse_number_of_agree = ($: any): NUM_AGREE => {
  const num_agree = <string>(
    $('div[class=Reply_area_head] span').text().replace(regex, '')
  )
  return parseInt(num_agree)
}
export default parse_number_of_agree
