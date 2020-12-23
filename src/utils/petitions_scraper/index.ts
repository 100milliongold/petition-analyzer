import { HTML, INDEX, PETION } from 'typings'

import read_page from './read_page'
import parser from './parser'

const petitions_scraper = async (
  petition_idx: INDEX
): Promise<PETION | undefined> => {
  try {
    const res = await read_page(petition_idx)
    const html = <HTML>res.data

    const json = parser(html)

    if (json !== undefined) {
      const {
        begin,
        category,
        content,
        crawled_at,
        end,
        num_agree,
        status,
        title,
      } = json
      return {
        begin,
        category,
        content,
        crawled_at,
        end,
        num_agree,
        status,
        title,
        petition_idx,
        keywords: undefined
      }
    } else {
      return undefined
    }
  } catch (error) {
    return undefined
  }
}

export default petitions_scraper
