const express = require("express");
const categoryRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const categoryController = require("../controller/categoryController");

categoryRoute.post("/", authGuard, roleGuard("admin", "modernator"), categoryController.post);

categoryRoute.get("/:id", categoryController.get);

categoryRoute.get("/findAll", categoryController.findAll);

categoryRoute.put("/:id", categoryController.update);

categoryRoute.delete("/:id", authGuard, roleGuard("admin"), categoryController.remove);

module.exports = categoryRoute;
