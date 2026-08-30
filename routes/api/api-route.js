const express = require("express");

const authRouter = require("./auth-route");
const accountRouter = require("./account-route");
const userRouter = require("./user-route");

const categoryRouter = require("./product-routes/category-route");
const subCategoryRouter = require("./product-routes/subCategory-route");
const produuctRouter = require("./product-routes/product-route");
const goldPricingRouter = require("./product-routes/goldPricing-route");

const cartRouter = require("./shopping-routes/cart-route");
const checkoutRouter = require("./shopping-routes/checkout-route");
const orderRouter = require("./shopping-routes/order-route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/users", userRouter);

router.use("/categories", categoryRouter);
router.use("/subCategories", subCategoryRouter);
router.use("/products", produuctRouter);
router.use("/goldPricing", goldPricingRouter);

router.use("/cart", cartRouter);
router.use("/checkout", checkoutRouter);
router.use("/orders", orderRouter);

module.exports = router;
