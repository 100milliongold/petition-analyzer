import { INDEX } from 'typings'
import { petitions_get_list } from 'utils'

const dfd = require('danfojs-node')

const get_data_frame = async (start: INDEX, end: INDEX) => {
  const data = await petitions_get_list(start, end)
  const df = new dfd.DataFrame(data)
  return df
}

const count_categoty = (df: any) => {
  return df['category'].value_counts()
}

const petition_analyzer = async (start: INDEX, end: INDEX) => {
  const df = await get_data_frame(start, end)
  const c_category = count_categoty(df)
  const names = c_category.index
  const values = c_category.values

  const category = names.map((name: string, index: number) => ({
    name,
    value: values[index],
  }))

  return {
    category,
  }
}

export default petition_analyzer
