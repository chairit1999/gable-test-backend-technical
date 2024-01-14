const expressFunction = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = expressFunction.Router();
const { userStorage } = require("../storage/storage");
const { validateSignin } = require("../middleware/validation");
const key = process.env.SECRET_KEY || "MY_KEY";

const compareHash = async (plaintext, hashText) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plaintext, hashText, (err, data) => {
      if (err) {
        reject(new Error("Error bcrypt compare"));
      } else {
        resolve(data);
      }
    });
  });
};

router.route("").post(validateSignin, async (req, res) => {
  try {
    const users = await userStorage.get("user");

    const user = users?.find((item) => item.email == req.body.email);

    if (!user) {
      return res.status(400).json({ message: "email or password is wrong" });
    }

    const comparePassword = await compareHash(
      req.body.password,
      user?.password
    );

    if (comparePassword) {
      const token = jwt.sign(user, key, { expiresIn: "10h" });
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json({ message: "email or password is wrong" });
    }
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;
