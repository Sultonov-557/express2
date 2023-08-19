const db = require("../database");
const express = require("express");
const categoryRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");

categoryRoute.post("/", authGuard, roleGuard("admin", "modernator"), async (req, res) => {
    try {
        const { nameUZ, nameRU, description, attributeID } = req.body;
        if (attributeID == undefined) {
            await db.query("INSERT category(nameUZ,nameRU,description) VALUES(?, ?, ?)", [
                nameUZ,
                nameRU,
                description,
            ]);
        } else {
            await db.query(
                "INSERT category(nameUZ,nameRU,description,attributeID) VALUES(?, ?, ?, ?)",
                [nameUZ, nameRU, description, attributeID]
            );
        }
        res.send("done");
    } catch (e) {
        res.send(e.message);
    }
});

categoryRoute.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await db.query(`SELECT * FROM category WHERE ID=${id}`);
        res.send(data);
    } catch (e) {
        res.send(e.message);
    }
});

categoryRoute.put("/:id", authGuard, roleGuard("admin", "moderator"), async (req, res) => {
    try {
        const { values } = req.body;
        const { id } = req.params;

        const query = `UPDATE category SET ${JSON.stringify2(values)} WHERE ID=${id}`;

        await db.query(query);
        res.send("done");
    } catch (e) {
        res.send(e.message);
    }
});

categoryRoute.delete("/:id", authGuard, roleGuard("admin"), async (req, res) => {
    try {
        const a = await db.query(`DELETE FROM category WHERE ID='${req.params.id}';`);
        res.send("done");
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = categoryRoute;

JSON.stringify2 = (obj_from_json) => {
    if (typeof obj_from_json !== "object" || Array.isArray(obj_from_json)) {
        // not an object, stringify using native function
        return JSON.stringify(obj_from_json);
    }
    // Implements recursive object serialization according to JSON spec
    // but without quotes around the keys.
    let props = Object.keys(obj_from_json)
        .map((key) => `${key}=${JSON.stringfy(obj_from_json[key])}`)
        .join(",");
    return `${props}`;
};
