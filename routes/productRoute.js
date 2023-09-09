const db = require("../database");
const express = require("express");
const productRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const productController = require("../controller/productController");

productRoute.get("/:id", productController.get);

productRoute.get("/findall", productController.findAll);

productRoute.post("/", authGuard, roleGuard("admin"), productController.post);

productRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), productController.update);

productRoute.delete("/:id", authGuard, roleGuard("admin"), productController.remove);

module.exports = productRoute;
