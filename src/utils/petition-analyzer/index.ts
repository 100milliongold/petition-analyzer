import { INDEX, PETION_LIST, PETION, PETITION_IDX_LIST } from 'typings'
import { petitions_get_list, get_nouns, get_parser } from 'utils'
import _ from 'lodash'
// const dfd = require('danfojs-node')

// /**
//  * 청와대 갤러리에서 가져온 리스트를 DataFrame 으로 변경
//  * @param start
//  * @param end
//  */
// const get_data_frame = (data: PETION_LIST) => {
//   const df = new dfd.DataFrame(data)
//   return df
// }

/**
 * 판다스에서 쓰이는 value_counts
 * @param df
 */
const count_categoty = (df: any) => {
  return df['category'].value_counts()
}

const test = (df: any) => {
  return df['category'].value_counts()
}

const petition_analyzer = async (start: INDEX, end: INDEX) => {
  const data = await petitions_get_list(start, end)
  const parser = await get_parser()

  // const word = await Promise.all(
  //   _(data)
  //     .map('content')
  //     .tap((o) => console.log(o))
  //     .map((word: string) => get_nouns(word))
  //     .value()
  // )

  const word = await Promise.all(
    data.map(async (o: PETION) => await get_nouns(o.content, parser))
  )
  console.log(word)

  const category = _(data)
    .map('category')
    .groupBy()
    .map(({ length }, name) => ({ value: length, name }))
    .value()

  // const df = get_data_frame(data)
  // const c_category = count_categoty(df)

  // const names = c_category.index
  // const values = c_category.values

  // df['keyword'] = df['content'].map(get_nouns)
  // df.print()

  // const category = names.map((name: string, index: number) => ({
  //   name,
  //   value: values[index],
  // }))

  return {
    category,
    // text,
  }
}

export default petition_analyzer
