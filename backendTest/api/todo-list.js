const expressFunction = require("express");
const authorization = require("../middleware/authorize");
const router = expressFunction.Router();
const { v4 } = require("uuid");
const { todoStorage } = require("../storage/storage");

router.route("").post(authorization, async (req, res) => {
  const userId = req.headers.user.id;
  const { title, date } = req.body;
  const todo = await todoStorage.get("todo");

  const payload = {
    id: v4(),
    userId,
    title,
    date,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };

  todoStorage.put("todo", [...(todo || []), payload]);
  return res.status(201).send(payload);
});

router.route("").get(authorization, async (req, res) => {
  const userId = req.headers.user.id;
  const todo = await todoStorage.get("todo");

  const findTodoByUser = todo?.filter((item) => item.userId == userId);
  return res.status(200).send(findTodoByUser);
});

router.route("/:id").get(authorization, async (req, res) => {
  const todo = await todoStorage.get("todo");
  const findTodoById = todo?.find((item) => item.id == req.params.id);
  if (!findTodoById) {
    res.status(400).send({ message: "not found todo" });
  }

  res.status(200).send(findTodoById);
});

router.route("/:id").patch(authorization, async (req, res) => {
  const userId = req.headers.user.id;
  const id = req.params.id;
  const { title, date } = req.body;
  const todo = await todoStorage.get("todo");

  const payload = {
    userId,
    id,
    title,
    date,
    updatedAt: new Date().getTime(),
  };

  const findTodoIndexById = todo?.findIndex((item) => item.id == id);
  if (findTodoIndexById != -1) {
    payload["createdAt"] = todo[findTodoIndexById].createdAt;
    todo[findTodoIndexById] = payload;
  } else {
    return res.send(400).send({ message: "not found todo" });
  }
  todoStorage.put("todo", todo);
  return res.status(200).send(payload);
});

router.route("/:id").delete(authorization, async (req, res) => {
  const id = req.params.id;
  const todo = await todoStorage.get("todo");

  const findTodoIndexById = todo?.findIndex((item) => item.id == id);
  if (findTodoIndexById != -1) {
    todo.splice(findTodoIndexById, 1);
  } else {
    return res.status(400).send({ message: "not found todo" });
  }
  todoStorage.put("todo", todo);

  return res.status(200).send("ok");
});

module.exports = router;
