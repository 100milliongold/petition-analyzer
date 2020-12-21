const text = '청원 요건에 위배되어 관리자에 의해 비공개된 청원입니다.'

/**
 * 비공개 청원 여부 확인
 * @param $
 */
const is_closed_petition = ($: any): boolean => {
  try {
    const res = <string>$('span[class=text]').eq(0).text().trim()
    return res === text
  } catch (error) {
    return false
  }
}

export default is_closed_petition
