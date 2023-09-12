const express = require("express");
const atterbuteRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const atterbuteController = require("../controller/attributeController");

atterbuteRoute.get("/findall", atterbuteController.findAll);

atterbuteRoute.get("/:id", atterbuteController.get);

atterbuteRoute.post("/", authGuard, roleGuard("admin"), atterbuteController.post);

atterbuteRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), atterbuteController.update);

atterbuteRoute.delete("/:id", authGuard, roleGuard("admin"), atterbuteController.remove);

module.exports = atterbuteRoute;
