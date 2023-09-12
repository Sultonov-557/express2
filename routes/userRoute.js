
const express = require("express");
const userRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const userController = require("../controller/userController");

userRoute.get("/:id", userController.get);

userRoute.get("/findall", userController.findAll);

userRoute.post("/", authGuard, roleGuard("admin"), userController.post);

userRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), userController.update);

userRoute.delete("/:id", authGuard, roleGuard("admin"), userController.remove);

module.exports = userRoute;
