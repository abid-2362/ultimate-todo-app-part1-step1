import TodoController from '../Controllers/Todo.controller';
import * as Express from 'express';
import config from '../serverConfig';
export default class TodoRoutes {
  private todoController: TodoController;
  private apiUrl: string;
  constructor() {
    this.todoController = new TodoController();
    this.apiUrl = config.apiUrl;
  }

  public routes(app: Express.Application) {
    // to create a new task, post request
    app.route(this.apiUrl+'/tasks').post(this.todoController.createNewTask);

    // to retrieve all tasks, get request
    app.route(this.apiUrl+'/tasks').get(this.todoController.getAllTasks);

    // get task by id.

    // update an existing task

    // delete task
    app.route(this.apiUrl+'/tasks/:id').delete(this.todoController.deleteTask);
  }
}