"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var assert = require("assert");
// import Todo_Model from "../app/Models/Todo.model";
var server = require('../app/server'); // server must be running before performing these tests
var app = require("../app/server");
var request = require("supertest");
var should = require("should");
var id = Math.ceil(Math.random() * 1000000);
// Get Todo
describe("Get Todos", function () {
    it("Retrieve list of tasks", function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app).get("/todo/api/v1.0/tasks")];
                case 1:
                    response = _a.sent();
                    assert(response.status === 200);
                    return [2 /*return*/];
            }
        });
    }); });
});
// Get a specific Todo
describe("GET a single Todo", function () {
    it("Retrieve a task", function (done) {
        request(app)
            .get("/todo/api/v1.0/tasks/" + id)
            .expect(200)
            .end(function (err, res) {
            done();
        });
    });
});
// Post
describe("Post Todo", function () {
    it("Create a new task", function (done) {
        request(app)
            .post("/todo/api/v1.0/tasks")
            .send({
            title: "test_title",
            description: "test_description"
        })
            .then(function (res) {
            res.statusCode.should.eql(200);
            done();
        })
            .catch(done);
    });
});
// PUT
describe("Update Todo", function () {
    it("Update an existing task", function (done) {
        request(app)
            .put("/todo/api/v1.0/tasks/" + id)
            .send({ title: 'testing', description: 'test is working', done: 'false' })
            .expect(200)
            .end(function (err, res) {
            if (err)
                throw err;
            done();
        });
    });
});
// Delete
describe("DELTE Todo", function () {
    it("Delete an existing task", function (done) {
        request(app)
            .delete("/todo/api/v1.0/tasks/" + id)
            .expect(200)
            .end(function (err, res) {
            done();
        });
    });
});
//# sourceMappingURL=todo.spec.js.map