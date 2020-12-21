import { STATUS } from 'typings'

/**
 * 상태 정보 추출
 * @param $
 */
const parse_status = ($: any): STATUS => {
  const status_list = $('div[class=petitionsView_grapy] li')

  let status = null

  const stage_names = ['청원시작', '청원진행중', '청원종료', '브리핑']

  status_list.each((i: number, elem: any) => {
    const text: string = $(elem).text()
    if (text.includes('청원진행중')) {
      try {
        status = <STATUS>stage_names[i]
      } catch (error) {}
    }
  })

  return status
}
export default parse_status
