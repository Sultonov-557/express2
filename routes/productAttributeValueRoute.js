const express = require("express");
const productAttributeValueRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const controller = require("../controller/addressController");

productAttributeValueRoute.get("/findall", controller.findAll);

productAttributeValueRoute.get("/:id", controller.get);

productAttributeValueRoute.post("/", authGuard, roleGuard("admin"), controller.post);

productAttributeValueRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), controller.update);

productAttributeValueRoute.delete("/:id", authGuard, roleGuard("admin"), controller.remove);

module.exports = productAttributeValueRoute;