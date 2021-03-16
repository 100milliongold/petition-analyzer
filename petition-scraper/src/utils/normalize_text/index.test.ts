import normalize_text from './index'
import text from './sample'
describe('normalize_text', () => {
  const str = normalize_text(text)
  test('개행문자 및 탭문자 제거 확인', async () => {
    expect(str).not.toMatch(/(\\t|\\n|\\s)/i)
  })
})
