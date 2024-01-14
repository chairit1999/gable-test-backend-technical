const Storage = require("node-storage");
const userStorage = new Storage("./storage/user");
const todoStorage = new Storage("./storage/todo");

module.exports = { userStorage, todoStorage };
