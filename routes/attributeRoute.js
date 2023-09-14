const express = require("express");
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const atterbuteRoute = express.Router();
const attributeController = require("../controller/attributeController");

atterbuteRoute.get("/findallbyid", attributeController.findAllbyID);
atterbuteRoute.get("/findall", attributeController.findAll);
atterbuteRoute.get("/:id", attributeController.get);
atterbuteRoute.post("/", authGuard, roleGuard("admin"), attributeController.post);
atterbuteRoute.delete("/:id", authGuard, roleGuard("admin"), attributeController.remove);
atterbuteRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), attributeController.update);

module.exports = atterbuteRoute;
