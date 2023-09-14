const express = require("express");
const reviewRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");
const reviewController = require("../controller/addressController");

reviewRoute.get("/findall", reviewController.findAll);

reviewRoute.get("/:id", reviewController.get);

reviewRoute.post("/", authGuard, roleGuard("admin"), reviewController.post);

reviewRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), reviewController.update);

reviewRoute.delete("/:id", authGuard, roleGuard("admin"), reviewController.remove);

module.exports = reviewRoute;