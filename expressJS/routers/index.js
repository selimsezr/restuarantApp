const express = require("express");
const order = require("./order");
const user = require("./user");
const admin = require("./admin");

const router = express.Router();

router.use("/orders", order);
router.use("/users", user);
router.use("/admin", admin);

module.exports = router;