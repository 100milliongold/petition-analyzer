import { board_list_scraper } from "utils";


const res = board_list_scraper(0)

res.then(o => console.log(o))

console.log(res);
