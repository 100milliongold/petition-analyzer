import parse_meta from './parse_meta'
import parse_content from './parse_content'
import parse_title from './parse_title'
import parse_number_of_agree from './parse_number_of_agree'
import parse_status from './parse_status'
import check_closed_petition from './is_closed_petition'

import { HTML, PETION } from 'typings'

const cheerio = require('cheerio')

const parser = (html: HTML): PETION | undefined => {
  const $ = cheerio.load(html)

  const is_closed_petition = check_closed_petition($)

  const { category, begin, end } = parse_meta($)

  const title = parse_title($)
  const content = parse_content($)
  const num_agree = parse_number_of_agree($)
  const status = parse_status($)

  const crawled_at = new Date()

  return {
    begin,
    category,
    content,
    crawled_at,
    end,
    num_agree,
    status,
    title,
    petition_idx: undefined,
  }
}

export default parser
