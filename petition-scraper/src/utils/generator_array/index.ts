import { INDEX, PETITION_IDX_LIST } from 'typings'

/**
 * 시작번호 , 끝 번호 입력시 리스트 추출
 * @param start
 * @param end
 */
const generator_array = (start: INDEX, end: INDEX): PETITION_IDX_LIST => {
  if (start < end) {
    const length = end - start + 1
    return Array.from({ length }, (_, i) => i + start)
  } else {
    return []
  }
}

export default generator_array
