import express from 'express'
const router = express.Router()

router.get('/test', (request, response, next) => {
  response.send('Hello world!')
})

router.get('/list', (request, response, next) => {
  response.send('Hello world!')
})

export default router
