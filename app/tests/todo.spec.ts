import serverConfig from "../serverConfig";
import Todo from "../Models/Todo.model";
const url = serverConfig.apiUrl;
const app = require("../server");
const request = require("supertest");

// a demo static id to create a new todo and then delete it in the testing.
const testTodoId = "5ba7b664750cf529f001a2d1";
let testTodo = {
  _id: testTodoId,
  title: "Testing Todo",
  description: "Testing Todo Description",
  done: false
};
describe("Todo Rest API Tests", () => {

  // Create a new Todo
  describe('Create a new Todo', () => {
    it('should create a new todo and return it', async () => {
      const resp = await request(app).post(`${url}/tasks`).send(testTodo);
      expect(resp.status).toBe(200);
      // should return the same todo which we have just passed it to be created
      expect(resp.body).toEqual(
        expect.objectContaining({_id: testTodo._id, title: testTodo.title, description: testTodo.description})
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

  // Update Todo
  describe('Update Todo', () => {
    it('should update the existing Todo', async () => {
      let todoToUpdate = {
        title: 'update',
        description: 'updated description',
        done: true
      }
      const resp = await request(app).put(`${url}/tasks/${testTodoId}`).send(todoToUpdate);
      let updatedTodo = resp.body.newTask;
      delete(updatedTodo._id);
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual(
        expect.objectContaining({status: "ok", newTask: updatedTodo})
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