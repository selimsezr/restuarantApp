const Question = require("../models/Order");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const newOrder = asyncErrorWrapper(async (req, res, next) => {
  const information = req.body;

  const question = await Question.create({
    ...information,
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    data: question,
  });
});
const getAllOrder = asyncErrorWrapper(async (req, res, next) => {
  const question = await Question.find();
  return res.status(200).json({
    success: true,
    data: question,
  });
});

const getSingleOrder = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findById(id);
  return res.status(200).json({
    success: true,
    data: question,
  });
});
const editOrder = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body; //Burası siteden girilen değer

  let question = await Question.findById(id);

  question.title = title; //Burası da güncelenen yeni değerler
  question.content = content;

  question = await question.save();

  return res.status(200).json({
    success: true,
    data: question,
  });
});
const deleteOrder = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  await Question.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Question deleted successfully",
  });
});
const likeOrder = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  if (question.likes.includes(req.user.id)) {
    return next(new CustomError("You already liked this question", 400));
  }
  question.likes.push(req.user.id);
  await question.save();

  return res.status(200).json({
    success: true,
    data: question,
  });
});
const undoLikeOrder = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);

  if (!question.likes.includes(req.user.id)) {
  return next(new CustomError("You can not undo like questions", 400))
  }
  const index = question.likes.indexOf(req.user.id);

  question.likes.splice(index,1);

  await question.save();
  return res.status(200).json({
    success: true,
    data: question
  })
});
module.exports = {
  newOrder,
  getAllOrder,
  getSingleOrder,
  editOrder,
  deleteOrder,
  likeOrder,
  undoLikeOrder
};