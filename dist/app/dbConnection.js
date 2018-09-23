"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var DBConnection = /** @class */ (function () {
    function DBConnection() {
    }
    DBConnection.prototype.connect = function () {
        mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true })
            .then(function (connection) {
            console.log('MongoDB connected');
        })
            .catch(function (err) {
            console.log('db connection error', err);
        });
    };
    return DBConnection;
}());
exports.default = DBConnection;
//# sourceMappingURL=dbConnection.js.map