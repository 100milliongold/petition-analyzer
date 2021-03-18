import { getFirstIndex } from "utils";
import { scraper } from "petitions_scraper_npm";
import { PETION } from "petitions_scraper_npm/dist/typings";

const S = require("fxjs/Strict");
const L = require("fxjs/Lazy");
const C = require("fxjs/Concurrency");

const { go, delay,  } = S

const day_length = 1

const delay_count = 1000 * 3

const find_data = new Date();
find_data.setDate( find_data.getDate() + 30 - 1 - day_length);
find_data.setHours(0)
find_data.setMinutes(0)
find_data.setSeconds(0)
find_data.setMilliseconds(0)
// console.log(today);

getFirstIndex().then( async (index : number) => {
    const list : PETION[]  = await go(
        L.range(Infinity),
        L.map(delay(delay_count)),
        L.map((o : number) => index - o),
        L.map((o : number) => scraper(o)),
        L.take(3),
        C.takeAll,
    )

    console.log(list);
    

})
