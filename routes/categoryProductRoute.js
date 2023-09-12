const express                   = require("express");
const authGuard                 = require("../middleware/auth-guard");
const roleGuard                 = require("../middleware/role-guard");
const categoryProductRoute      = express.Router();
const categoryProductController = require("../controller/addressController");

categoryProductRoute.get   ("/findall", categoryProductController.findAll);
categoryProductRoute.get   ("/:id",     categoryProductController.get);
categoryProductRoute.post  ("/",        authGuard, roleGuard("admin"), categoryProductController.post);
categoryProductRoute.delete("/:id",     authGuard, roleGuard("admin"), categoryProductController.remove);
categoryProductRoute.put   ("/:id",     authGuard, roleGuard("admin", "moderator"), categoryProductController.update);

module.exports = categoryProductRoute;