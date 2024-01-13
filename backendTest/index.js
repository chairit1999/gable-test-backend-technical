const expressFunction = require("express");
app = expressFunction();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Option,Authorization"
  );
  return next();
});

app.use(expressFunction.json({ limit: "100mb" }));
app.use("/todo", require("./api/todo-list"));

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
