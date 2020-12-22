import _ from 'lodash'

const { KMR, KKMA } = require('koalanlp/API')
const { initialize } = require('koalanlp/Util')
const { Tagger, Parser } = require('koalanlp/proc')

/**
 * 형태소 분석기 : 명사만 추출
 * @param text
 */
const koalanlp = async (text: string, parser: any): Promise<string[]> => {
  // try {
  //   await initialize({ packages: { KKMA: '2.0.4' }, verbose: true })
  // } catch (error) {}

  // let parser = new Parser(KKMA)

  let sentences = await parser(text)

  return _(sentences)
    .flatMap(({ _items }) => _items)
    .flatMap(({ _items }) => _items)
    .filter(({ _tag }) => _tag === 'NNG')
    .map(({ _surface }) => _surface)
    .value()
}

export default koalanlp
