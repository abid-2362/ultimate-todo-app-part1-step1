# Todo Rest API in TpyeScript and NodeJS
Ultimate Todo App
Part 1 Step 1. Todo Rest API using MongoDB with NodeJS

Testing is being done by sending actual requests to the end points and comparing the incoming data from the API. It means that it creates a dummy todo, fetch it, update it and then delete it at the end of the tests.

Jest is used for testing purposes with supertest

### To start the app with tests,
1. Clone the repo and go to the repo directory
2. Install dependencies with `npm install`
3. Run `npm run test` command from the directory

**There are 5 API endpoints for CRUD operations.**
#### Create Todo (Post Request)
1. /todo/api/v1.0/tasks

#### Get All Todos (get Request)
2. /todo/api/v1.0/tasks

#### Get Todo By Specific Id (get Request)
3. /todo/api/v1.0/tasks/:id

#### Update Todo (Put Request)
4. /todo/api/v1.0/tasks/:id

#### Get Delete Todo (Delete Request)
5. /todo/api/v1.0/tasks/:id

*Completed By Abid Ali.*