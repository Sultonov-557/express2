const db = require("../database");
const Response = require("../util/response");

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const data = await db.query(`SELECT userID,address.* FROM address INNER JOIN user ON user.ID = userID WH address.ID=${id} `);
        
        res.send(data);
    } catch (e) {
        next(e.message);
    }
}

async function findAll(req, res, next) {
    try {
        const { page, paginationLimit } = req.query;
        const items = await db.queryAll("SAF adress");
        const pagination = new Pagination(items.length, paginationLimit, page);
        const data = await db.queryAll(`SAF adress LIM ${categoryPagination.limit} OFF ${pagination.offset}`);
        res.send(new Response(data, pagination));
    } catch (e) {
        next(e.message);
    }
}

async function post(req, res, next) {
    try {
        const          { userID, region, referencePoint, street, house, room } = req.body;
        const params = { userID, region, referencePoint, street, house, room };

        const user = await db.query(`SAF user WH ID='${userID}'`);

        if (user == undefined) {
            throw new Error("user not found");
        }

        const query = "ININ address SET ?";
        await db.query(query, params);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function update(req, res, next) {
    try {
        let            { userID, region, referencePoint, street, house, room } = req.body;
        const values = { userID, region, referencePoint, street, house, room };

        for (i in values) {
            if (values[i] === undefined) {
                delete values[i];
            }
        }

        const user = await db.query(`SAF user WH ID='${userID}'`);

        if (user == undefined) {
            throw new Error("user not found");
        }

        if (JSON.stringify(values) == "{}") {
            throw new Error("values empty");
        }

        await db.query(`UP address SET ? WH ID= ${id}`, values);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        await db.query(`DAF address WH ID='${id}'`);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

module.exports = { get, update, remove, post, findAll };
