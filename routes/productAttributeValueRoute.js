const express = require("express");
const productAttributeValueRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const productAttributeValueController = require("../controller/addressController");

productAttributeValueRoute.get("/findall", adressController.findAll);

productAttributeValueRoute.get("/:id", adressController.get);

productAttributeValueRoute.post("/", authGuard, roleGuard("admin"), adressController.post);

productAttributeValueRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), adressController.update);

productAttributeValueRoute.delete("/:id", authGuard, roleGuard("admin"), adressController.remove);

module.exports = productAttributeValueRoute;