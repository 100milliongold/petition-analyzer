import { getFirstIndex } from "utils";
import { scraper } from "petitions_scraper_npm";
import { PETION } from "petitions_scraper_npm/dist/typings";

import dateFormat from "dateformat";

import { config } from 'dotenv'

import mysql from "mysql";

import { schedule } from "node-cron";

const Strict = require("fxjs/Strict");
const S = Strict
const L = require("fxjs/Lazy");
const C = require("fxjs/Concurrency");

const { go, pipe, delay, each , log, tap, map } = Strict

const day_length = 1

const delay_count = 1000 * 3


/**
 * env
 */
config();

/**
 * 시간 설정
 */
const find_data = new Date();
find_data.setHours(0)
find_data.setDate( find_data.getDate() -2 )
find_data.setMinutes(0)
find_data.setSeconds(0)
find_data.setMilliseconds(0)
console.log(find_data);

/**
 * mysql 접속정보
 */
const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    port     : process.env.PORT ? parseInt(process.env.PORT) : undefined,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : 'petitions'
});
connection.connect();


/**
 * maria DB 으로 쿼리문 전송
 * @param query 쿼리문
 * @returns 
 */
const query = (query : string) : any => new Promise((resolve , reject) => connection.query(query, (error, rows : any, fields : any) => {
    if (error) reject(error);
    resolve({rows , fields })
}))

/**
 * prepare statement
 * @param query 
 * @param values 
 * @returns 
 */
const inSertquery = (query : string, values: string[]) : Promise<any> => new Promise((resolve , reject) => connection.query(query, values , (error, rows : any, fields : any) => {
    if (error) reject(error);
    resolve({rows , fields })
}))

/**
 * Each 문으로 Insert
 */
const eachInsert = pipe(
    each(({
        begin,
        category,
        content,
        crawled_at,
        end,
        num_agree,
        status,
        title,
        petition_idx,

    } : PETION) => {
        const inertString : string = `('${dateFormat(begin , "yyyy-mm-dd")}', '${category}', '${content}','${dateFormat(crawled_at , "yyyy-mm-dd")}', '${dateFormat(end , "yyyy-mm-dd")}', ${num_agree}, '${status}', '${title}', ${petition_idx} )`;
        const values : string[] = [
            `${dateFormat(begin , "yyyy-mm-dd")}`,
            `${category}`,
            `${content}`,
            `${dateFormat(crawled_at , "yyyy-mm-dd")}`,
            `${dateFormat(end , "yyyy-mm-dd")}`, 
            `${num_agree}`,
            `${status}`,
            `${title}`, 
            `${petition_idx}`
        ]
        const query = `INSERT INTO petitions (\`begin\`, \`category\`, \`content\`, \`crawled_at\`, \`end\`, \`num_agree\`, \`status\`, \`title\`, \`petition_idx\` ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`
        inSertquery(query , values).then(({rows}) => console.log(rows))
    })
)


/**
 * 시작번호를 기준으로 3초마다 한번씩 가져오는 메서드
 * @param start 시작 게시판 번호
 * @returns 
 */
const scrapPetitions = async (start : number) => await go(
    /**
     * 3초마다 1씩증가
     */
    L.interval(delay_count),
    /**
     * -1 씩감소
     */
    L.map((o : number) => start - o),
    /**
     * 글번호을 토대로 게시판 글 수집
     */
    L.map((o : number) => scraper(o)),
    // L.take(5),

    /**
     * 게시날짜와 비교해서 기준치보다 작을경우 중단
     */
    L.takeUntil( (o : PETION) => o.begin && o.begin.getTime() <= find_data.getTime()),
)

/**
 * 전체 작업 내용 
 * @returns 
 */
const job = () => go(
    // 1. 게시판을 불려와서 첫번째 글번호를 추측하고
    getFirstIndex(),
    // 2. 해당 첫번째 글번호를 토대로 3초당 -1 씩 감소해서 수집
    scrapPetitions,
    // 3. 3초마다 수집된 글은 디비에 삽입 
    eachInsert,
)

/**
 * 
 * cron job
    +-------------------- second (0 - 59)
    |  +----------------- minute (0 - 59)
    |  |  +-------------- hour (0 - 23)
    |  |  |  +----------- day of month (1 - 31)
    |  |  |  |  +-------- month (1 - 12)
    |  |  |  |  |  +----- day of week (0 - 6) (Sunday=0 or 7)
    |  |  |  |  |  |  +-- year [optional]
    |  |  |  |  |  |  |
    *  *  *  *  *  *  * command to be executed 
 */
schedule('0 0 * * *' , () => {
    job()
})

