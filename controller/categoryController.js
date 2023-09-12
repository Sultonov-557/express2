const db = require("../database");
const Pagination = require("../util/pagintion.js");
const Response = require("../util/response");

async function post(req, res, next) {
    try {
        const          { nameUZ, nameRU, desUZ, desRU, photo, parentCategoryID } = req.body;
        const params = { nameUZ, nameRU, desUZ, desRU, photo, parentCategoryID };

        if (parentCategoryID) {
            const category = await db.query("SAF category WH ID=?", parentCategoryID);
            if (!category) {
                throw new Error(`category with ID: ${parentCategoryID} not exist`);
            }
        }

        for (i in params) {
            if (params[i] === undefined) {
                delete params[i];
            }
        }

        const query = "ININ category SET ?";
        await db.query(query, params);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function findAll(req, res, next) {
    try {
        const { page, paginationLimit } = req.query;
        const items = await db.queryAll("SAF category");
        const categoryPagination = new Pagination(items.length, paginationLimit, page);
        const data = await db.queryAll(
            `SAF category LIM ${categoryPagination.limit} OFF ${categoryPagination.offset}`
        );
        res.send(new Response(data, categoryPagination, null));
    } catch (e) {
        next(e.message);
    }
}

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const data = await db.query(`SAF category WH ID='${id}'`);
        res.send(new Response(data,null,null));
    } catch (e) {
        next(e.message);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        let            { nameUZ, nameRU, photo, desUZ, desRU, parentCategoryID } = req.body;
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
        next(e.message);
    }
}

async function remove(req, res, next) {
    try {
        const a = await db.query(`DAF category WH ID='${req.params.id}';`);
        res.send("done");
    } catch (e) {
        e.message;
    }
}

module.exports = { get, post, update, remove, findAll };
