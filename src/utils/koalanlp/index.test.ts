import koalanlp from './'

describe('koalanlp', () => {
  test('형태소 분석기 테스트', async () => {
      await koalanlp()
  }, 30000)
})