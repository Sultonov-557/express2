const express = require("express");
const jwt = require("jsonwebtoken");
const authRoute = express.Router();

authRoute.post("/sign-in", (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error("username or password undefined");
        }

        if (username != "Sultonov") {
            throw new Error("username is incorrect");
        }

        if (password != "12345678") {
            throw new Error("password is incorrect");
        }
        const accesToken = jwt.sign(
            { username, role: "user" },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
        );
        const refreshToken = jwt.sign(
            { username, role: "user" },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
        );
        res.send({ accesToken, refreshToken });
    } catch (e) {
        res.send(e.message);
    }
});

authRoute.post("/refresh", (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            throw new Error("token not found");
        }

        const { username, role } = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const accessToken = jwt.sign(
            {
                username,
                role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
            }
        );
        res.send({ accessToken });
    } catch (e) {
        const { message } = e;
        res.send({ message });
    }
});

module.exports = authRoute;
