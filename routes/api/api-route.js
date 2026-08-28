const express = require("express");

const authRouter = require("./auth-route");
const accountRouter = require("./account-route");
const userRouter = require("./user-route");

const categoryRouter = require("./product-routes/category-route");
const subCategoryRouter = require("./product-routes/subCategory-route");
const produuctRouter = require("./product-routes/product-route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/users", userRouter);

router.use("/categories", categoryRouter);
router.use("/subCategories", subCategoryRouter);
router.use("/products", produuctRouter);

module.exports = router;
