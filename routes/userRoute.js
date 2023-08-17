const db = require("../database");
const express = require("express");
const userRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");

userRoute.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await db.query(`SELECT * FROM user WHERE ID=${id}`);
        res.send(data);
    } catch (e) {
        res.send(e.message);
    }
});

userRoute.put(
    "/",
    authGuard,
    roleGuard("admin", "moderator"),
    async (req, res) => {
        try {
            const { id, column, value } = req.body;
            await db.query(
                `UPDATE user SET ${column} = '${value}' WHERE ID= ${id}`
            );
            res.send("done");
        } catch (e) {
            res.send(e.message);
        }
    }
);

userRoute.delete("/", authGuard, roleGuard("admin"), async (req, res) => {
    try {
        const { id } = req.body;
        await db.query(`DELETE FROM user WHERE ID='${id}';`);
        res.send("done");
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = userRoute;
