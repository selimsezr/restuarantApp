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
  getOrderOwnerAccess,
} = require("../middlewares/authorization/auth");
const {
  checkOrderExist
} = require("../middlewares/database/databeseErrorHelpers");
const router = express.Router();

router.post("/order", getAccessToRoute, newOrder);
router.get("/", getAllOrder);
router.get("/:id", checkOrderExist, getSingleOrder);
//Aşağıdakilerde zaten türlerini belirttiğimiz için /edit ve /delete yazmadan da yapabiliriz
router.put(
  "/:id/edit",
  [getAccessToRoute, checkOrderExist, getOrderOwnerAccess],
  editOrder
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkOrderExist, getOrderOwnerAccess],
  deleteOrder
);
router.get("/:id/like", [getAccessToRoute, checkOrderExist], likeOrder);
router.get(
  "/:id/undo_like",
  [getAccessToRoute, checkOrderExist],
  undoLikeOrder
);


module.exports = router;