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
// dynamic id generation creates problem, it stores 1 character ahead in database that is why,
// the delete request failed every time.
// const testTodoId = mongoose.Types.ObjectId();
//  so the solution is to hardcode a generated id into the code for testing purpose.
const testTodoId = "5ba7b664750cf529f001a2d1";
let testTodo = {
  _id: testTodoId,
  title: "Testing Todo",
  description: "Testing Todo Description",
  done: false
};
describe("Todo Rest API Tests", () => {
  beforeAll(async () => {
    let newTodo = new Todo(testTodo);
    await newTodo.save();
  });

  // Create a new Todo
  describe('Create a new Todo', () => {
    it('should create a new todo and return it', async () => {
      const resp = await request(app).post(`${url}/tasks`).send(testTodo);
      expect(resp.status).toBe(200);
      // should return the same todo which we have just passed it to be created
      expect(resp.body).toEqual(
        expect.objectContaining(testTodo)
      );
    });
  });

  // get all todos
  describe("Get Todos", () => {
    it("Retrieve list of tasks", async () => {
      const res = await request(app).get(`${url}/tasks`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.arrayContaining([expect.objectContaining({})])
      );
    });
  });

  // get todo by id
  describe("Get TodoById", () => {
    it("checks if a specific task is being fetched properly", async () => {
      const resp = await request(app).get(`${url}/tasks/${testTodoId}`);
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual(
        expect.objectContaining({})
      );
    });
  });

  // Delete a Todo
  describe("Delete a Todo", () => {
    it('should delete the demo todo', async () => {
      console.log(testTodoId);
      const resp = await request(app).delete(`${url}/tasks/${testTodoId}`);
      expect(resp.body).toEqual(
        expect.objectContaining({status: "ok"})
      );
    });
  });

  afterAll(async () => {
    Todo.findByIdAndDelete(testTodoId, function(err, result) {
      if (err) console.log('error in deleting test todo ->', err);
      else console.log("test completed",result);
    });
  });
});
