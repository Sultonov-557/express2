const express = require("express");
const favoriteRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const favoriteController = require("../controller/addressController");

favoriteRoute.get("/findall", favoriteController.findAll);

favoriteRoute.get("/:id", favoriteController.get);

favoriteRoute.post("/", authGuard, roleGuard("admin"), favoriteController.post);

favoriteRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), favoriteController.update);

favoriteRoute.delete("/:id", authGuard, roleGuard("admin"), favoriteController.remove);

module.exports = favoriteRoute;