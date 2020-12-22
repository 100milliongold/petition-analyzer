import { get_parser, get_nouns } from 'utils'

const sample =
  '이제 살던 빌라를 팔고 다른 곳으로 이사를 갈려고 해도, 이행강제금을 냈음에도 불구하고 구청 건물대장에 불법건축물이라고 기재되어 있어서 매수자가 나타나질 않는 상황이 되었습니다. 2014년 불법건축물양성화특별법이 시행되었으나 잘 알지 못하여 시기 를 놓쳤는데, 더불어민주당 서영교 국회의원님께서 이러한 서민들의 어려움을 헤아려 특별법을 발의하였다고 하는데 아직 국회통과가 안되었다고 들었습니다. 빠른 시일내 양성화특별법이 통과되어 전국적으로 소형 빌라에 사는 서민들의 불안함을 조금이나마 풀어주시기 를 청원합니다'

describe('get_nouns', () => {
  test('형태소 분석기 테스트', async () => {
    const parser = await get_parser()
    const test1 = await get_nouns(sample, parser)
    const test2 = await get_nouns(sample, parser)
    console.log({ test1, test2 })
  }, 30000)
})
