import { getFirstIndex } from "utils";
import { scraper } from "petitions_scraper_npm";
import { PETION } from "petitions_scraper_npm/dist/typings";

import db from './db';
import { Board } from "model";

import { config } from 'dotenv'

 
const Strict = require("fxjs/Strict");
const L = require("fxjs/Lazy");
const C = require("fxjs/Concurrency");

const { go, delay, each , log, tap } = Strict

const day_length = 1

const delay_count = 1000 * 3


config();


const find_data = new Date();
find_data.setDate( find_data.getDate() + 30 - 1 - day_length);
find_data.setHours(0)
find_data.setMinutes(0)
find_data.setSeconds(0)
find_data.setMilliseconds(0)
// console.log(find_data);

getFirstIndex().then( async (index : number) => {
    
    db();

    await go(
        L.range(Infinity),
        L.map(delay(delay_count)),
        L.map((o : number) => index - o),
        L.map((o : number) => scraper(o)),
        L.take(500),
        each(({
            begin,
            category,
            content,
            crawled_at,
            end,
            num_agree,
            status,
            title,
            petition_idx
        } : PETION) => {
            const board = new Board({
                begin,
                category,
                content,
                crawled_at,
                end,
                num_agree,
                status,
                title,
                petition_idx
            })
            board.save().then(() => console.log(`${petition_idx} save!!`))
        }),
    )

    // console.log(list);
    

})
