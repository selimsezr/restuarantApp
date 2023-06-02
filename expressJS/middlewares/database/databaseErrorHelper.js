const User = require("../../models/User");
const Order = require("../../models/Order");
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

const checkOrderExist = asyncErrorWrapper(async (req, res, next) => {
  const Order_id = req.params.id || req.params.Order_id;

  const Order = await Order.findById(Order_id);

  if (!Order) {
    return next(new CustomError("There is no such Order with that id", 400));
  }
  next();
});
module.exports = { checkUserExist, checkOrderExist };