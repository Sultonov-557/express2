const db = require("../database");
const Response = require("../util/response");
const Pagination = require("../util/pagintion");

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const data = await db.query(`SAF attribute WHID=${id} `);

        res.send(data);
    } catch (e) {
        next(e.message);
    }
}

async function search(req, res, next) {
    try {
        const query = req.params.query;
        const data = await db.queryAll(`SAF attribute WHERE name LIKE '${query}%'`);
        res.send(data);
    } catch (e) {
        next(e.message);
    }
}

async function findAllbyID(req, res, next) {
    try {
        const { page, pageLimit, attrID } = req.query;
        const items = await db.queryAll("SAF attributevalue");
        const pagination = new Pagination(items.length, pageLimit, page);
        const data = await db.queryAll(`SAF attributevalue WHERE attributeID=${attrID} LIM ${pagination.limit} OFF ${pagination.offset}`);
        res.send(new Response(data, pagination));
    } catch (e) {
        next(e.message);
    }
}

async function findAll(req, res, next) {
    try {
        const { page, pageLimit, catID } = req.query;
        let data;
        let pagination;
        if (catID) {
            const items = await db.queryAll(`SAF categoryattribute ca LEFT JOIN attribute a ON ca.attributeID = a.ID WHERE ca.categoryID = ${catID}`);
            pagination = new Pagination(items.length, pageLimit, page);
            data = await db.queryAll(`SAF categoryattribute ca LEFT JOIN attribute a ON ca.attributeID = a.ID WHERE ca.categoryID=${catID} LIM ${pagination.limit} OFF ${pagination.offset} `);
        } else {
            const items = await db.queryAll("SAF attribute");
            pagination = new Pagination(items.length, pageLimit, page);
            data = await db.queryAll(`SAF attribute LIM ${pagination.limit} OFF ${pagination.offset}`);
        }
        res.send(new Response(data, pagination));
    } catch (e) {
        next(e.message);
    }
}

async function post(req, res, next) {
    try {
        const { name, category, product } = req.body;
        const params = { name, category, product };

        const query = "ININ attribute SET ?";
        await db.query(query, params);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function update(req, res, next) {
    try {
        let { name, category, product } = req.body;
        const values = { name, category, product };

        for (i in values) {
            if (values[i] === undefined) {
                delete values[i];
            }
        }

        if (JSON.stringify(values) == "{}") {
            throw new Error("values empty");
        }

        await db.query(`UP attribute SET ? WH ID= ${id}`, values);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        await db.query(`DAF attribute WH ID='${id}'`);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

module.exports = {
    get,
    update,
    remove,
    post,
    findAll,
    findAllbyID,
};
