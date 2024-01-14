const expressFunction = require("express");
const dotenv = require("dotenv");
const app = expressFunction();
const appPort = process.env.APP_PORT || 3000;
dotenv.config({ path: `.env` });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST,GET,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Option,Authorization"
  );
  return next();
});

app.use(expressFunction.json({ limit: "100mb" }));
app.use("/todo", require("./api/todo-list"));
app.use("/signup", require("./api/signup"));
app.use("/signin", require("./api/signin"));

app.listen(appPort, function () {
  console.log(`Listening on port ${appPort}`);
});
