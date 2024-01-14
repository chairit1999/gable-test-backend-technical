const Joi = require("joi");

const todoSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().required(),
});

const signupSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const signinSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const validateTodo = async (req, res, next) => {
  const body = req.body;
  try {
    await todoSchema.validateAsync(body);
    next();
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

const validateSignup = async (req, res, next) => {
  const body = req.body;
  try {
    await signinSchema.validateAsync(body);
    next();
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

const validateSignin = async (req, res, next) => {
  const body = req.body;
  try {
    await signupSchema.validateAsync(body);
    next();
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

module.exports = { validateTodo, validateSignup, validateSignin };
