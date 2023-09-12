const express = require("express");
const categoryProductRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const categoryProductController = require("../controller/addressController");

categoryProductRoute.get("/findall", adressController.findAll);

categoryProductRoute.get("/:id", adressController.get);

categoryProductRoute.post("/", authGuard, roleGuard("admin"), adressController.post);

categoryProductRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), adressController.update);

categoryProductRoute.delete("/:id", authGuard, roleGuard("admin"), adressController.remove);

module.exports = categoryProductRoute;