import { INDEX } from 'typings'

const axios = require('axios')

const getHtml = async (index: INDEX) => {
  // https://github.com/lovit/petitions_scraper/blob/810f15f34b20fee30778ddc5e14a2d9ef4fb952b/petitions_scraper/parser.py#L8
  try {
    return await axios.get(`https://www1.president.go.kr/petitions/${index}`, {
      headers: {
        Referer:
          'https://www1.president.go.kr/petitions/?c=0&only=2&page=4&order=1',
      },
    })
  } catch (error) {
    throw error
  }
}

export default getHtml
