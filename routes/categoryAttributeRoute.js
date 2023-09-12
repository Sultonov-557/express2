const express                = require("express");
const authGuard              = require("../middleware/auth-guard");
const roleGuard              = require("../middleware/role-guard");
const controller             = require("../controller/addressController");
const categoryAttributeRoute = express.Router();

categoryAttributeRoute.get   ("/findall", controller.findAll);
categoryAttributeRoute.get   ("/:id",     controller.get);
categoryAttributeRoute.post  ("/",        authGuard, roleGuard("admin"), controller.post);
categoryAttributeRoute.delete("/:id",     authGuard, roleGuard("admin"), controller.remove);
categoryAttributeRoute.put   ("/:id",     authGuard, roleGuard("admin", "moderator"), controller.update);

module.exports = categoryAttributeRoute;