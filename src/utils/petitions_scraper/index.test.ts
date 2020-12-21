import petitions_scraper from './index'

describe('petitions_scraper', () => {
  it('청와대 갤러리에서 번호 입력시 json 출력 확인', async () => {
    const res = await petitions_scraper(594884)
    // console.log(res)
  })
})
