const expressFunction = require("express");
const router = expressFunction.Router();

router.route("").post((req, res) => {
  res.send("a");
});

router.route("").get((req, res) => {
  res.send("b");
});

router.route("/:id").get((req, res) => {
  res.send("a");
});

router.route("").patch((req, res) => {
  res.send("a");
});

router.route("").delete((req, res) => {
  res.send("a");
});

module.exports = router;
