const express = require("express");
const orderRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const orderController = require("../controller/addressController");

orderRoute.get("/findall", orderController.findAll);

orderRoute.get("/:id", orderController.get);

orderRoute.post("/", authGuard, roleGuard("admin"), orderController.post);

orderRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), orderController.update);

orderRoute.delete("/:id", authGuard, roleGuard("admin"), orderController.remove);

module.exports = orderRoute;