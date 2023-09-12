const express             = require("express");
const authGuard           = require("../middleware/auth-guard");
const roleGuard           = require("../middleware/role-guard");
const attrebuteController = require("../controller/attributeValueController");
const atterbuteValueRoute = express.Router();

atterbuteValueRoute.get   ("/findall", attrebuteController.findAll);
atterbuteValueRoute.get   ("/:id",     attrebuteController.get);
atterbuteValueRoute.post  ("/",        authGuard, roleGuard("admin"),              attrebuteController.post);
atterbuteValueRoute.delete("/:id",     authGuard, roleGuard("admin"),              attrebuteController.remove);
atterbuteValueRoute.put   ("/:id",     authGuard, roleGuard("admin", "moderator"), attrebuteController.update);

module.exports = atterbuteValueRoute;
