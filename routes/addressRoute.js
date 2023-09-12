const express          = require("express");
const authGuard        = require("../middleware/auth-guard");
const roleGuard        = require("../middleware/role-guard");
const adressRoute      = express.Router();
const adressController = require("../controller/addressController");

adressRoute.get   ("/findall", adressController.findAll);
adressRoute.get   ("/:id",     adressController.get);
adressRoute.post  ("/",        authGuard, roleGuard("admin"),              adressController.post);
adressRoute.delete("/:id",     authGuard, roleGuard("admin"),              adressController.remove);
adressRoute.put   ("/:id",     authGuard, roleGuard("admin", "moderator"), adressController.update);

module.exports = adressRoute;
