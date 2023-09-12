const express = require("express");
const atterbuteValueRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const attrebuteController = require("../controller/attrebuteValueController");

atterbuteValueRoute.get("/findall", attrebuteController.findAll);

atterbuteValueRoute.get("/:id", attrebuteController.get);

atterbuteValueRoute.post("/", authGuard, roleGuard("admin"), attrebuteController.post);

atterbuteValueRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), attrebuteController.update);

atterbuteValueRoute.delete("/:id", authGuard, roleGuard("admin"), attrebuteController.remove);

module.exports = atterbuteValueRoute;
