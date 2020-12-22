const { KMR, KKMA } = require('koalanlp/API')
const { initialize } = require('koalanlp/Util')
const { Tagger, Parser } = require('koalanlp/proc')

const koalanlp = async () => {
    await initialize({packages: {KMR: '2.0.4', KKMA: '2.0.4'}, verbose: true});
    let tagger = new Tagger(KMR);
    let tagged = await tagger("안녕하세요. 눈이 오는 설날 아침입니다.");
    for(const sent of tagged) {
        console.log(sent.getNouns());
        
        console.log(sent.toString());
    }

}

export default koalanlp
