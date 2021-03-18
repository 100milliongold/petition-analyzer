import { board_list_scraper, parser } from "utils";

import {BOARD} from "typings"

const S = require("fxjs/Strict");
const L = require("fxjs/Lazy");

/**
 * 가장 최근 글 번호를 추출하는 메서드
 * @returns 최근 게시글 번호 
 */
// 이것이 함수형이다.
const res = async () => await S.go(
    L.range(1),
    L.map((o: number) => board_list_scraper(o)),
    L.flatMap((o: string) => parser(o)),
    S.take(1),
    (o : BOARD[]) => o[0].pageNo,
)


export default res;

