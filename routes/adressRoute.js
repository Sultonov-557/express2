const db = require("../database");
const express = require("express");
const adressRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const adressController = require("../controller/adressController");

adressRoute.get("/:id", adressController.get);

adressRoute.get("/findall", adressController.findAll);

adressRoute.post("/", authGuard, roleGuard("admin"), adressController.post);

adressRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), adressController.update);

adressRoute.delete("/:id", authGuard, roleGuard("admin"), adressController.remove);

module.exports = adressRoute;
