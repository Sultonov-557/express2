const express = require("express");
const categoryAttributeRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const controller = require("../controller/addressController");

categoryAttributeRoute.get("/findall", controller.findAll);

categoryAttributeRoute.get("/:id", controller.get);

categoryAttributeRoute.post("/", authGuard, roleGuard("admin"), controller.post);

categoryAttributeRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), controller.update);

categoryAttributeRoute.delete("/:id", authGuard, roleGuard("admin"), controller.remove);

module.exports = categoryAttributeRoute;