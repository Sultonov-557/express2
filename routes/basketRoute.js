const express = require("express");
const basketRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const basketController = require("../controller/addressController");

basketRoute.get("/findall", basketController.findAll);

basketRoute.get("/:id", basketController.get);

basketRoute.post("/", authGuard, roleGuard("admin"), basketController.post);

basketRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), basketController.update);

basketRoute.delete("/:id", authGuard, roleGuard("admin"), basketController.remove);

module.exports = basketRoute;