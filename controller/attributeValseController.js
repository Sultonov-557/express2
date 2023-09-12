const db = require("../database");
const Response = require("../util/response");

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const data = await db.query(`SAF attributevalue WH ID=${id} `);
        
        res.send(data);
    } catch (e) {
        next(e.message);
    }
}

async function findAll(req, res, next) {
    try {
        const { page, paginationLimit } = req.query;
        const items = await db.queryAll("SAF attributevalue");
        const pagination = new Pagination(items.length, paginationLimit, page);
        const data = await db.queryAll(`SAF attributevalue LIM ${categoryPagination.limit} OFF ${pagination.offset}`);
        res.send(new Response(data, pagination));
    } catch (e) {
        next(e.message);
    }
}

async function post(req, res, next) {
    try {
        const { name ,attributeID} = req.body;

        const params = { name ,	attributeID};

        const attribute=await db.query(`SAF attribute WH ID='${attributeID}'`)

        if(!attribute)throw new Error("attribute not found")

        const query = "ININ attributevalue SET ?";
        await db.query(query, params);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function update(req, res, next) {
    try {
        const id=req.params.id
        let { name ,attributeID} = req.body;
        const values = { name,attributeID};

        for (i in values) {
            if (values[i] === undefined) {
                delete values[i];
            }
        }

        const attribute=await db.query(`SAF attribute WH ID='${attributeID}'`)

        if(!attribute)throw new Error("attribute not found")

        if (JSON.stringify(values) == "{}") {
            throw new Error("values empty");
        }

        await db.query(`UP attributevalue SET ? WH ID= ${id}`, values);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        await db.query(`DAF attributevalue WH ID='${id}'`);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

module.exports = { get, update, remove, post, findAll };
