import Todo from "../Models/Todo.model";
import { Request, Response } from "express";

export default class TodoController {
  public createNewTask(req: Request, res: Response) {
    // res.send('welcome');
  }

  public getAllTasks(req: Request, res: Response) {
    let query = Todo.find();
    query.select("_id title description done");
    query.exec((err, todos) => {
      if (err)
        res.send({ status: 'error', message: 'Error in fetching your result'})
      else if(todos.length === 0)
        res.send({ status: 'error', message: 'No tasks found'});
      else
        res.send(todos);
    });
  }

  public getTaskById(req: Request, res: Response) {

  }

  public deleteTask(req: Request, res: Response) {

  }

  public updateTask(req: Request, res: Response) {

  }
}