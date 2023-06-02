const User = require("../../models/User");
const Question = require("../../models/Question");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../../helpers/error/CustomError");

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError("There is no such user with that id", 400));
  }
  //req.data = user //bu kodu kullarak controllers -> user.js den kopyaladığımız const user=... kodunu silebilirsiniz
  next();
});

const checkQuestionExist = asyncErrorWrapper(async (req, res, next) => {
  const question_id = req.params.id || req.params.question_id;

  const question = await Question.findById(question_id);

  if (!question) {
    return next(new CustomError("There is no such question with that id", 400));
  }
  next();
});
module.exports = { checkUserExist, checkQuestionExist };