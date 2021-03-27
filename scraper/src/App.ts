import { getFirstIndex } from "utils";
import { scraper } from "petitions_scraper_npm";
import { PETION } from "petitions_scraper_npm/dist/typings";

import dateFormat from "dateformat";

import { config } from 'dotenv'


const Strict = require("fxjs/Strict");
const S = Strict
const L = require("fxjs/Lazy");
const C = require("fxjs/Concurrency");

const { go, delay, each , log, tap, map } = Strict

const day_length = 1

const delay_count = 1000 * 3


var presto = require('presto-client');
var client = new presto.Client({user: 'myname', port : 8080 , host: '192.168.0.14'});

/**
 * env
 */
 config();

const find_data = new Date();
find_data.setDate( find_data.getDate() + 30 - 1 - day_length);
find_data.setHours(0)
find_data.setMinutes(0)
find_data.setSeconds(0)
find_data.setMilliseconds(0)
console.log(find_data);

const query = (query :string) => new Promise((resolve, reject) => client.execute({
    query:   query,
    catalog: 'hive',
    schema:  'default',
    // state:   function(error: any, query_id: any, stats: any){ console.log({message:"status changed", id:query_id, stats:stats}); },
    // columns: function(error: any, data: any){ console.log({resultColumns: data}); },
    // data:    function(error: any, data: any, columns: any, stats: any){ console.log(data); },
    success: function(error: any, stats: any){ return resolve(stats); },
    error:   function(error: any){ reject(error) }
}))



getFirstIndex().then( async (index : number) => {
   
    await go(
        L.interval(delay_count),
        L.map((o : number) => index - o),
        L.map((o : number) => scraper(o)),
        L.takeUntil( (o : PETION) => o.petition_idx && o.petition_idx < 597213),
        //L.take(5),
        map(({
                begin,
                category,
                content,
                crawled_at,
                end,
                num_agree,
                status,
                title,
                petition_idx
            } : PETION) => `INSERT INTO petitions ("begin", "category", "content", "crawled_at", "end", "num_agree", "status", "title", "petition_idx" ) VALUES ('${dateFormat(begin , "yyyy-mm-dd")}', '${category}', '${content}','${dateFormat(crawled_at , "yyyy-mm-dd")}', '${dateFormat(end , "yyyy-mm-dd")}', ${num_agree}, '${status}', '${title}', ${petition_idx})`
        ),
        // map(query),
        each(log)
        // each(({
        //     begin,
        //     category,
        //     content,
        //     crawled_at,
        //     end,
        //     num_agree,
        //     status,
        //     title,
        //     petition_idx
        // } : PETION) => {
        //     console.log({
        //         title, end, petition_idx
        //     });
        //     const query = `INSERT INFO petitions (begin, category, content, crawled_at, end, num_agree, status, title, petition_idx ) VALUES ('${begin}', '${category}', '${content}','${crawled_at}', '${end}', '${num_agree}', '${status}', '${title}', '${petition_idx}')`
           
        // }),
    )

    // console.log(list);
    

})
