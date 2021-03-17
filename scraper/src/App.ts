import { board_list_scraper, parser } from "utils";

import {BOARD} from "typings"

const S = require("fxjs/Strict");
const L = require("fxjs/Lazy");
const C = require("fxjs/Concurrency");

const today = new Date();
today.setDate( today.getDate() + 30);
today.setHours(0)
today.setMinutes(0)
today.setSeconds(0)
today.setMilliseconds(0)
console.log(today);

S.go(
    L.range(1),
    L.map((o: number) => board_list_scraper(o)),
    L.map((o: string) => parser(o)),
    //L.filter((o: BOARD) => +o.end_date >= +today),
    S.take(30),
    // S.tap((o : any) => console.log(o)),
    S.each(console.log),
    //parser,
)

// res.then(html => {

// })
