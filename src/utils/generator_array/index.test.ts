import generator_array from './index'
describe('generator_array', () => {
  const start = 594871
  const end = 594877
  const result = generator_array(start, end)
  it('리스트 생성이 되는지 확인', () => {
    expect(result.length).toEqual(end - start + 1)
  })
  it('첫번째 배열 항목이 시작번호와 일치하는지 확인', () => {
    expect(result[0]).toEqual(start)
  })

  it('마직막 배열 항목이 끝번호와 일치하는지 확인', () => {
    expect(result[result.length - 1]).toEqual(end)
  })

  it('시작번호가 끝번호 보다 클경우 빈배열이 생성되는지 확인', () => {
    const error = generator_array(end, start)
    expect(error.length).toEqual(0)
  })
})
