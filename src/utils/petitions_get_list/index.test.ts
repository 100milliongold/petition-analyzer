import petitions_get_list from './index'

describe('petitions_scraper', () => {
  it('청와대 갤러리에서 번호 입력시 json 출력 확인', async () => {
    const res = await petitions_get_list(594878, 594884)
  })
})
