"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Todo_controller_1 = require("../Controllers/Todo.controller");
var serverConfig_1 = require("../serverConfig");
var TodoRoutes = /** @class */ (function () {
    function TodoRoutes() {
        this.todoController = new Todo_controller_1.default();
        this.apiUrl = serverConfig_1.default.apiUrl;
    }
    TodoRoutes.prototype.routes = function (app) {
        // to create a new task, post request
        app.route(this.apiUrl + '/tasks').post(this.todoController.createNewTask);
        // to retrieve all tasks, get request
        app.route(this.apiUrl + '/tasks').get(this.todoController.getAllTasks);
        // get task by id.
        app.route(this.apiUrl + '/tasks/:id').get(this.todoController.getTaskById);
        // update an existing task
        app.route(this.apiUrl + '/tasks/:id').put(this.todoController.updateTask);
        // delete task
        app.route(this.apiUrl + '/tasks/:id').delete(this.todoController.deleteTask);
    };
    return TodoRoutes;
}());
exports.default = TodoRoutes;
