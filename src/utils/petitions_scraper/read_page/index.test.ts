import getHtml from './index'

describe('getHtml', () => {
  test('청와대 갤러리에서 글이 수집이 되는지 테스트', async () => {
    const res = await getHtml(594884)
    expect(res).not.toBeNull()
  })
})
