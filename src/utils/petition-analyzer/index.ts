import { INDEX, PETION_LIST, PETION, PETITION_IDX_LIST } from 'typings'
import { petitions_get_list, get_nouns } from 'utils'
import _ from 'lodash'


/**
 * 청와대 갤러리에서 분석
 * @param start 
 * @param end 
 */
const petition_analyzer = async (start: INDEX, end: INDEX) => {
  const data = await petitions_get_list(start, end)

  const res = await Promise.all(_(data)
    .map('content')
    .map(async content => await get_nouns(content))
    .value()
  )

  const keyword = 
    _(res)
      .flattenDeep().groupBy()
      .map(({ length }, name) => ({ value: length, name }))
      .value()  

  const category = _(data)
    .map('category')
    .groupBy()
    .map(({ length }, name) => ({ value: length, name }))
    .value()

  return {
    category,
    keyword,
  }
}

export default petition_analyzer
