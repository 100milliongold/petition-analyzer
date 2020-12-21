import express from "express";

import routes from "./routes";


class App {
  public app: express.Application;

  /**
   * @ class App
   * @ method bootstrap
   * @ static
   * 
   */
  public static bootstrap (): App {
    return new App();
  }

  constructor () {
    this.app = express();
    this.app.use("/", routes);
  }
}

export default App;