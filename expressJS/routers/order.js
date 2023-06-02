const express = require("express");
const {
  newOrder,
  getAllOrder,
  getSingleOrder,
  editOrder,
  deleteOrder,
  likeOrder,
  undoLikeOrder,
} = require("../controllers/order");
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/authorization/auth");
const {
  checkQuestionExist,
} = require("../middlewares/database/databeseErrorHelpers");
const router = express.Router();

router.post("/order", getAccessToRoute, newOrder);
router.get("/", getAllOrder);
router.get("/:id", checkQuestionExist, getSingleOrder);
//Aşağıdakilerde zaten türlerini belirttiğimiz için /edit ve /delete yazmadan da yapabiliriz
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editOrder
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteOrder
);
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeOrder);
router.get(
  "/:id/undo_like",
  [getAccessToRoute, checkQuestionExist],
  undoLikeOrder
);

router.use("/:question_id/answers", checkQuestionExist, answer)

module.exports = router;