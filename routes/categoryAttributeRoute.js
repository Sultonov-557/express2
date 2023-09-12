const express = require("express");
const categoryAttributeRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const categoryAttributeController = require("../controller/addressController");

categoryAttributeRoute.get("/findall", adressController.findAll);

categoryAttributeRoute.get("/:id", adressController.get);

categoryAttributeRoute.post("/", authGuard, roleGuard("admin"), adressController.post);

categoryAttributeRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), adressController.update);

categoryAttributeRoute.delete("/:id", authGuard, roleGuard("admin"), adressController.remove);

module.exports = categoryAttributeRoute;