const db = require("../database");
const Pagination = require("../util/pagintion.js");

async function post(req, res) {
	try {
		const { nameUZ, nameRU, desUZ, desRU, photo, parentCategoryID } = req.body;
		const params = { nameUZ, nameRU, desUZ, desRU, photo, parentCategoryID };

		if (parentCategoryID) {
			const category = await db.query("SELECT * FROM category WHERE ID=?", parentCategoryID);
			if (!category) {
				throw new Error(`category with ID: ${parentCategoryID} not exist`);
			}
		}

		const query = "INSERT INTO category SET ?";
		await db.query(query, params);
		res.send("done");
	} catch (e) {
		res.send(e.message);
	}
}

async function findAll(req, res) {
	try {
		const { page, paginationLimit } = req.params;
		const categoryPagination = new Pagination(page, paginationLimit);
		const out = await db.queryAll(`SELECT * FROM category LIMIT ${categoryPagination.limit} OFFSET ${categoryPagination.offset}`);
		res.send(out);
	} catch (e) {
		res.send(e.message);
	}
}

async function get(req, res) {
	try {
		const id = req.params.id;
		const data = await db.query(`SELECT * FROM category WHERE ID=${id}`);
		res.send(data);
	} catch (e) {
		res.send(e.message);
	}
}

async function update(req, res) {
	try {
		const values = req.body;
		const { id } = req.params;

		const query = `UPDATE category SET ? WHERE ID=${id}`;

		await db.query(query, values);
		res.send("done");
	} catch (e) {
		res.send(e.message);
	}
}

async function remove(req, res) {
	try {
		const a = await db.query(`DELETE FROM category WHERE ID='${req.params.id}';`);
		res.send("done");
	} catch (e) {
		res.send(e.message);
	}
}

module.exports = { get, post, update, remove, findAll };
