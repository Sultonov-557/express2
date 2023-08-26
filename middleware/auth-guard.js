const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../database");
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];

        if (!token) {
            throw new Error("token is undefined");
        }
        const { ID, role } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.role = role;
        req.ID = ID;
        const user = await db.query(`SAF user WH ID=${ID}`);
        if (user.hashedRefreshToken == null) {
            throw new Error("loged out");
        }
        next();
    } catch (e) {
        res.send(e.message);
    }
};
