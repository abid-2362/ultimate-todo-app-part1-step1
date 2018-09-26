"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Todo_model_1 = require("../Models/Todo.model");
var TodoController = /** @class */ (function () {
    function TodoController() {
    }
    TodoController.prototype.createNewTask = function (req, res) {
        var newTodo = new Todo_model_1.default();
        if (req.body._id) {
            newTodo._id = req.body._id;
        }
        newTodo.title = req.body.title;
        newTodo.description = req.body.description;
        newTodo.save(function (err, todo) {
            if (err)
                res.send(err);
            res.send(todo);
        });
    };
    TodoController.prototype.getAllTasks = function (req, res) {
        var query = Todo_model_1.default.find();
        query.select("_id title description done");
        query.exec(function (err, todos) {
            if (err)
                res.send({ status: 'error', message: 'Error in fetching your result' });
            else if (todos.length === 0)
                res.send({ status: 'error', message: 'No tasks found' });
            else
                res.send(todos);
        });
    };
    TodoController.prototype.getTaskById = function (req, res) {
        var taskId = req.params.id;
        var query = Todo_model_1.default.findById(taskId);
        query.select("_id title description done");
        query.exec(function (err, todo) {
            if (err)
                res.send({ status: 'error', message: 'Error in fetching your result' });
            else if (todo === null) {
                res.send({ status: 'error', message: 'No task found' });
            }
            else {
                res.send(todo);
            }
        });
    };
    TodoController.prototype.deleteTask = function (req, res) {
        var taskId = req.params.id;
        Todo_model_1.default.findByIdAndRemove(taskId, function (err, result) {
            if (err)
                res.send({ status: 'error', message: 'Error in deleting the task' });
            else if (result === null)
                res.send({ status: "error", message: "It seems like this task has already been deleted." });
            else
                res.send({ status: "ok", message: 'Task deleted successfully' });
        });
    };
    TodoController.prototype.updateTask = function (req, res) {
        var taskId = req.params.id;
        var task = {
            title: req.body.title,
            description: req.body.description,
            done: req.body.done
        };
        Todo_model_1.default.findByIdAndUpdate(taskId, task, { new: true, select: "_id title description done" }, function (err, result) {
            if (err)
                res.send({ status: "error", message: "We are unable to save this task. please try later" });
            else
                res.send({ status: "ok", message: "Task Updated", newTask: result });
        });
    };
    return TodoController;
}());
exports.default = TodoController;
