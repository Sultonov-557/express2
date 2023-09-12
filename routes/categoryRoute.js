const express            = require("express");
const authGuard          = require("../middleware/auth-guard");
const roleGuard          = require("../middleware/role-guard");
const categoryRoute      = express.Router();
const categoryController = require("../controller/categoryController");


categoryRoute.get   ("/findAll", categoryController.findAll);
categoryRoute.get   ("/:id",     categoryController.get);
categoryRoute.put   ("/:id",     categoryController.update);
categoryRoute.delete("/:id",     authGuard, roleGuard("admin"), categoryController.remove);
categoryRoute.post  ("/",        authGuard, roleGuard("admin", "modernator"), categoryController.post);

module.exports = categoryRoute;
