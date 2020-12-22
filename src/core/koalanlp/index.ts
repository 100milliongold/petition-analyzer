import { parse } from 'dotenv/types'

const { KMR, KKMA } = require('koalanlp/API')
const { initialize } = require('koalanlp/Util')
const { Tagger, Parser } = require('koalanlp/proc')

const parser = new Parser(KKMA)

export default parse
