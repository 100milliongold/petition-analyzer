import express from 'express'
import { petition_analyzer } from "utils";

const router = express.Router()

router.get('/test', (request, response, next) => {
  response.send('Hello world!')
})

router.get('/analyzer/:start/:end', (req, res, next) => {
  const start = <string> req.params.start;
  const end = <string> req.params.end;

  const start_num = parseInt(start)
  const end_num = parseInt(end)

  petition_analyzer(start_num , end_num).then(result => {
    res.json(result)
  })
  
})

export default router
