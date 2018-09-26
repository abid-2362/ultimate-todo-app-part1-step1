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

  describe('Create  New Todo', () => {
    // Create a new Todo
    describe('Create a new Todo', () => {
      it('should pass if todo is created successfully', async () => {
        const resp = await request(app).post(`${url}/tasks`).send(testTodo);
        expect(resp.status).toBe(200);
        // should return the same todo which we have just passed it to be created
        expect(resp.body).toEqual(
          expect.objectContaining({_id: testTodo._id, title: testTodo.title, description: testTodo.description})
        );
      });
    });

    describe('Create New Todo Error', () => {
      it('should return error if title is missing in request', async () => {
        let todo = JSON.parse(JSON.stringify(testTodo));
        delete todo.title;
        const resp = await request(app).post(`${url}/tasks`).send(todo);
        expect(resp.status).toBe(200);
        // should return the same todo which we have just passed it to be created
        expect(resp.body).toEqual(
          expect.objectContaining({status: "error"})
        );
      })
    });

    describe('Create New Todo Error', () => {
      it('should return error if description is missing in request', async () => {
        let todo = JSON.parse(JSON.stringify(testTodo));
        delete todo.description;
        const resp = await request(app).post(`${url}/tasks`).send(todo);
        expect(resp.status).toBe(200);
        // should return the same todo which we have just passed it to be created
        expect(resp.body).toEqual(
          expect.objectContaining({status: "error"})
        );
      })
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

    it("returns error if id is not found or invalid", async () => {
      let invalidId = "123123123";
      const resp = await request(app).get(`${url}/tasks/${invalidId}`);
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual(
        expect.objectContaining({status: "error", message: "invalid id"})
      );
    });
  });

  // Update Todo
  describe('Update Todo', () => {
    let todoToUpdate = {
      title: 'update',
      description: 'updated description',
      done: true
    };
    it('should update the existing Todo', async () => {
      const resp = await request(app).put(`${url}/tasks/${testTodoId}`).send(todoToUpdate);
      let updatedTodo = resp.body.newTask;
      delete(updatedTodo._id);
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual(
        expect.objectContaining({status: "ok", newTask: updatedTodo})
      );
    });

    it('should return error and not update if title is missing', async () => {
      let invalidUpdate = JSON.parse(JSON.stringify(todoToUpdate));
      delete invalidUpdate.title;
      const resp = await request(app).put(`${url}/tasks/${testTodoId}`).send(invalidUpdate);
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual(
        expect.objectContaining({status: "error"})
      );
    });

    it('should return error and not update if description is missing', async () => {
      let invalidUpdate = JSON.parse(JSON.stringify(todoToUpdate));
      delete invalidUpdate.description;
      const resp = await request(app).put(`${url}/tasks/${testTodoId}`).send(invalidUpdate);
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual(
        expect.objectContaining({status: "error"})
      );
    });

    it('should return error and not update if done status is missing', async () => {
      let invalidUpdate = JSON.parse(JSON.stringify(todoToUpdate));
      delete invalidUpdate.done;
      const resp = await request(app).put(`${url}/tasks/${testTodoId}`).send(invalidUpdate);
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual(
        expect.objectContaining({status: "error"})
      );
    });

  });

  // Delete a Todo
  describe("Delete a Todo", () => {
    it('should delete the demo todo', async () => {
      const resp = await request(app).delete(`${url}/tasks/${testTodoId}`);
      expect(resp.body).toEqual(
        expect.objectContaining({status: "ok"})
      );
    });
  });
});