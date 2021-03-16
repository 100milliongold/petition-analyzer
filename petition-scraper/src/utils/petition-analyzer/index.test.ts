import petition_analyzer from './index'
import { petitions_get_list } from 'utils'
import scraper from 'petitions_scraper_npm'

describe('petitions_scraper', () => {
  it('판다스 테스트', async () => {
    const res = await scraper(594878, 594884)
    console.log(res)
  }, 30000)
})
