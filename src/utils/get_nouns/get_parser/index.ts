const { KMR, KKMA } = require('koalanlp/API')
const { initialize } = require('koalanlp/Util')
const { Tagger, Parser } = require('koalanlp/proc')

const get_parser = async () => {
  try {
    await initialize({ packages: { KKMA: '2.0.4' }, verbose: true })
  } catch (error) {}
  let parser = new Parser(KKMA)
  return parser
}

export default get_parser
