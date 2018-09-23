import "mocha";
// import * as chai from 'chai';
// import Todo_Model from "../app/Models/Todo.model";
// import * as assert from "assert";
import serverConfig from "serverConfig";
import * as mongoose from "mongoose";
import Todo from "Models/Todo.model";
const url = serverConfig.apiUrl;
const server = require("../server"); // server must be running before performing these tests
const app = require("../server");
const request = require("supertest");
const should = require("should");

let id = Math.ceil(Math.random() * 1000000);
// Get Todo

describe("Todo Rest API Tests", () => {
  beforeEach(async () => {
    // its require just to make sure that the server is running before we start testing
    // let server = require("../server");
    let testTodoId = mongoose.Types.ObjectId();
    let testTodo = {
      id: testTodoId,
      title: "Testing Todo",
      description: "Testing Todo Description",
      done: false
    };
    let newTodo = new Todo(testTodo);
    await newTodo.save();
  });

  describe("Get Todos", () => {
    it("Retrieve list of tasks", async () => {
      const response = await request(app).get(`${url}/tasks`);
      // assert(response.status === 200);
      // console.log(response);
      let result = await request(server).get("/api/todos");
      expect(result.status).toBe(200);
    });
  });
  /*
  // Get a specific Todo
  describe("GET a single Todo", function() {
    it("Retrieve a task", function(done) {
      request(app)
        .get("/todo/api/v1.0/tasks/" + id)
        .expect(200)
        .end(function(err, res) {
          done();
        });
    });
  });

  // Post
  describe("Post Todo", () => {
    it("Create a new task", function(done) {
      request(app)
        .post("/todo/api/v1.0/tasks")
        .send({
          title: "test_title",
          description: "test_description"
        })
        .then(res => {
          res.statusCode.should.eql(200);
          done();
        })
        .catch(done);
    });
  });

  // PUT
  describe("Update Todo", function() {
    it("Update an existing task", function(done) {
      request(app)
        .put("/todo/api/v1.0/tasks/" + id)
        .send({
          title: "testing",
          description: "test is working",
          done: "false"
        })
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          done();
        });
    });
  });

  // Delete
  describe("DELTE Todo", function() {
    it("Delete an existing task", function(done) {
      request(app)
        .delete("/todo/api/v1.0/tasks/" + id)
        .expect(200)
        .end(function(err, res) {
          done();
        });
    });
  });
*/
});
