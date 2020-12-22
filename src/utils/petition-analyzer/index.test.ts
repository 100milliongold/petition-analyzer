import petition_analyzer from './index'

describe('petitions_scraper', () => {
  it('판다스 테스트', async () => {
    const res = await petition_analyzer(594878, 594884)
    console.log(res)
  }, 30000)
})
