const db = require("../database");
const Pagination = require("../util/pagintion.js");
const dbutil = require("../util/dbparse");

async function post(req, res) {
    try {
        const { nameUZ, nameRU, desUZ, desRU, photo, parentCategoryID } = req.body;
        const params = { nameUZ, nameRU, desUZ, desRU, photo, parentCategoryID };

        if (parentCategoryID) {
            const category = await db.query("SAF category WH ID=?", parentCategoryID);
            if (!category) {
                throw new Error(`category with ID: ${parentCategoryID} not exist`);
            }
        }

        const query = "ININ category SET ?";
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
        const out = await db.queryAll(
            `SAF category LIM ${categoryPagination.limit} OFF ${categoryPagination.offset}`
        );
        res.send(out);
    } catch (e) {
        res.send(e.message);
    }
}

async function get(req, res) {
    try {
        const id = req.params.id;
        const data = await db.query(`SAF category WH ID='${id}'`);
        res.send(data);
    } catch (e) {
        res.send(e.message);
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const oldCtg = await db.query(`SAF category WH ID=${id}`);
        let { nameUZ, nameRU, photo, desUZ, desRU, parentCategoryID } = req.body;
        const values = { nameUZ, nameRU, photo, desUZ, desRU, parentCategoryID };

        for (i in values) {
            if (values[i] === undefined) {
                delete values[i];
            }
        }

        if (JSON.stringify(values) == "{}") {
            throw new Error("values empty");
        }

        const query = `UP category SET ? WH ID=${id}`;

        await db.query(query, values);
        res.send("done");
    } catch (e) {
        res.send(e.message);
    }
}

async function remove(req, res) {
    try {
        const a = await db.query(`DAF category WH ID='${req.params.id}';`);
        res.send("done");
    } catch (e) {
        res.send(e.message);
    }
}

module.exports = { get, post, update, remove, findAll };
