import * as Express from 'express';
import { Request, Response } from "express";
import * as bodyParser from 'body-parser';
import TodoRoutes from './Routes/Todo.routes';
import DBConnection from './dbConnection';

class App {
  public app: Express.Application;
  private dbConnection: DBConnection;
  private router: TodoRoutes;
  constructor() {
    this.app = Express();
    this.dbConnection = new DBConnection();
    this.router = new TodoRoutes();
    this.configureApp();
  }

  private configureApp() {
    this.dbConnection.connect(); // connect to mongodb

    // use middlewares here
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());

    this.app.use((req: Request, res: Response, next: Function) => {
      // allows cors options from all origins
      res.header('Access-Control-Allow-Origin', "*");

      // not required here but will allow session related information in login type of applications
      res.header("Access-Control-Allow-Credentials", "true");

      // allow request methods
      res.header("Access-Control-Allow-Methods", "DELETE,PUT,GET,POST");

      // allow content-type headers
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
    });

    // Initialize Router
    this.router.routes(this.app);
  }
}

export default new App().app;