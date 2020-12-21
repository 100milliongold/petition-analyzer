import { INDEX, PETION_LIST } from 'typings'
import { petitions_scraper, generator_array } from 'utils'

const petitions_get_list = async (
  start: INDEX,
  end: INDEX
): Promise<PETION_LIST> => {
  const list = generator_array(start, end).map((idx: INDEX) =>
    petitions_scraper(idx)
  )

  const res = await Promise.all(list)
  const result = <PETION_LIST>res.filter((res) => res !== undefined)
  return result
}

export default petitions_get_list
