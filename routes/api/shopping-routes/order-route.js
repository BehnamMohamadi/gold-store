const express = require("express");

const {
  prepareOrder,
  getMyOrders,
  getMyOrderHistory,
  getMyOrder,
  cancelOrder,
  getAllOrders,
} = require("../../../controller/shopping-controllers/order-controller");

const { protect, restrictTo } = require("../../../middleware/auth-middleware");

const { validateParam } = require("../../../middleware/validate-param");

const {
  orderIdSchema,
} = require("../../../validation/shopping-validations/order-validation");

const router = express.Router();

router.use(protect);

router.get("/all", restrictTo("admin"), getAllOrders);

router.get("/history", getMyOrderHistory);

router.get("/", getMyOrders);

router.post("/", prepareOrder);

router.get("/:orderId", validateParam("orderId", orderIdSchema), getMyOrder);

router.delete("/:orderId", validateParam("orderId", orderIdSchema), cancelOrder);

module.exports = router;
