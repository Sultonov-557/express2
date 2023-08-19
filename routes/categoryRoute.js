const db = require("../database");
const express = require("express");
const categoryRoute = express.Router();
const authGuard = require("../middleware/auth-guard");
const roleGuard = require("../middleware/role-guard");

categoryRoute.post(
	"/",
	authGuard,
	roleGuard("admin", "modernator"),
	async (req, res) => {
		try {
			const {
				nameUZ,
				nameRU,
				description,
				atteribute,
				atteributeValues,
			} = req.body;
			await db.query(
				"INSERT category(nameUZ,nameRU,description) VALUES(?, ?, ?)",
				[nameUZ, nameRU, description]
			);
			res.send("done");
		} catch (e) {
			res.send(e.message);
		}
	}
);

categoryRoute.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const data = await db.query(`SELECT * FROM category WHERE ID=${id}`);
		res.send(data);
	} catch (e) {
		res.send(e.message);
	}
});

categoryRoute.put(
	"/",
	authGuard,
	roleGuard("admin", "moderator"),
	async (req, res) => {
		try {
			const { id, column, value } = req.body;
			await db.query(
				`UPDATE category SET ${column} = '${value}' WHERE ID= ${id}`
			);
			res.send("done");
		} catch (e) {
			res.send(e.message);
		}
	}
);

categoryRoute.delete("/", authGuard, roleGuard("admin"), async (req, res) => {
	try {
		const { id } = req.body;
		await db.query(`DELETE FROM category WHERE ID='${id}';`);
		res.send("done");
	} catch (e) {
		res.send(e.message);
	}
});

module.exports = categoryRoute;
