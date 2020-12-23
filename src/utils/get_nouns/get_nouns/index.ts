import _ from 'lodash'

const mod = require('korean-text-analytics');
const task = new mod.TaskQueue();

/**
 * 형태소 분석기 : 명사만 추출
 * @param text
 */
const analytics = (str : string) : Promise<string[]> => {
  return new Promise( (resolve, reject) => {
    mod.ExecuteMorphModule(str, function (err:any, rep:any) {
      if (err) reject(err)
      const res = _(rep.morphed)
        .filter(({ tag }) => tag === 'NNG')
        .map(({ word }) => word)
        .value();        
      resolve(res)
    })
  })
}


export default analytics
