const expressFunction = require("express");
const router = expressFunction.Router();
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const { userStorage } = require("../storage/storage");

const makeHash = async (plainText) => {
  const result = await bcrypt.hash(plainText, 10);
  return result;
};

router.route("").post(async (req, res) => {
  const hashPassword = await makeHash(req.body.password);
  const user = await userStorage.get("user");

  const isDuplicateEmail = user?.find((item) => item.email === req.body.email);

  if (isDuplicateEmail) {
    return res.status(400).send({ message: "duplicate an email" });
  }

  userStorage.put("user", [
    ...(user || []),
    {
      id: v4(),
      email: req.body.email,
      password: hashPassword,
    },
  ]);
  return res.status(200).send("register complete");
});

module.exports = router;
