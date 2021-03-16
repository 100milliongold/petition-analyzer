import express from 'express'
import morgan from 'morgan'

import routes from 'routes'

class App {
  public app: express.Application

  /**
   * @ class App
   * @ method bootstrap
   * @ static
   *
   */
  public static bootstrap(): App {
    return new App()
  }

  constructor() {
    this.app = express()
    // log only 4xx and 5xx responses to console
    this.app.use(
      morgan('dev', {
        skip: function (req, res) {
          return res.statusCode < 400
        },
      })
    )
    this.app.use('/', routes)
  }
}

export default App
