import Todo from "../Models/Todo.model";
import { Request, Response } from "express";

interface todoTemplate {
  title: string,
  description: string,
  done: boolean
}

export default class TodoController {
  public createNewTask(req: Request, res: Response) {
    let newTodo = new Todo();
    if(req.body._id) {
      newTodo._id = req.body._id;
    }
    newTodo.title = req.body.title;
    newTodo.description = req.body.description;
    newTodo.save((err, todo) => {
      if (err) res.send(err);

      res.send(todo);
    });
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
    let taskId = req.params.id;
    let query = Todo.findById(taskId);
    query.select("_id title description done");
    query.exec((err, todo) => {
      if (err)
        res.send({ status: 'error', message: 'Error in fetching your result'})
      else if(todo === null) {
        res.send({ status: 'error', message: 'No task found'} );
      } else {
        res.send(todo);
      }
    });
  }

  public deleteTask(req: Request, res: Response) {
    let taskId = req.params.id;
    Todo.findByIdAndRemove(taskId, (err, result) => {
      if(err) res.send({status: 'error', message: 'Error in deleting the task'});
      else if(result === null) res.send({status: "error", message: "It seems like this task has already been deleted."});
      else res.send({status: "ok", message: 'Task deleted successfully'});
    });
  }

  public updateTask(req: Request, res: Response) {
    let taskId = req.params.id;
    let task: todoTemplate = {
      title: req.body.title,
      description: req.body.description,
      done: req.body.done
    };
    Todo.findByIdAndUpdate(taskId, task, {new: true, select: "_id title description done"}, (err, result) => {
      if(err)
        res.send({status: "error", message: "We are unable to save this task. please try later"});
      else
        res.send({status: "ok", message: "Task Updated", newTask: result});
    });
  }
}