// import "mocha";
// import Todo_Model from "../app/Models/Todo.model";
// import * as assert from "assert";
// import * as chai from 'chai';
import serverConfig from "../serverConfig";
import * as mongoose from "mongoose";
import Todo from "../Models/Todo.model";
const url = serverConfig.apiUrl;
// const server = require("../server"); // server must be running before performing these tests
const app = require("../server");
const request = require("supertest");
const should = require("should");
let testTodoId = mongoose.Types.ObjectId();

describe("Todo Rest API Tests", () => {
  beforeAll(async () => {
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
      console.log(`requesting to ${url}/tasks`);
      const response = await request(app).get(`${url}/tasks`);
      // assert(response.status === 200);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([expect.objectContaining({})])
      );
    });
  });

  describe("Get TodoById", () => {
    it("checks if a specific task is being fetched properly", async () => {
      console.log(testTodoId);
    });
  });

  afterAll(async () => {
    Todo.findByIdAndDelete(testTodoId, function(err, result) {
      if (err) console.log('error in deleting test todo ->', err);
      else console.log("test completed",result);
    });
  });
});
