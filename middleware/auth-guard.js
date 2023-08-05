const express = require("express");
const jwt = require("jsonwebtoken");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = (req, res, next) => {
	try {
		const token = req.headers?.authorization?.split(" ")[1];

		if (!token) {
			throw new Error("token is undefined");
		}
		const { role } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.role = role;
		next();
	} catch (e) {
		res.send(e.message);
	}
};
