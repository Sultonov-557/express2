const db = require("../database");
const Response = require("../util/response");

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const {attributeID} = await db.query(`SAF categoryAttribute WH ID=${id} `);
        const data=await db.queryAll(`SAF attribute WH ID='${attributeID}'`)
        
        res.send(data);
    } catch (e) {
        next(e.message);
    }
}

async function findAll(req, res, next) {
    try {
        const { page, paginationLimit } = req.query;
        const items = await db.queryAll("SAF categoryAttribute");
        const pagination = new Pagination(items.length, paginationLimit, page);
        const data = await db.queryAll(`SAF categoryAttribute LIM ${pagination.limit} OFF ${pagination.offset}`);
        res.send(new Response(data, pagination));
    } catch (e) {
        next(e.message);
    }
}

async function post(req, res, next) {
    try {
        const { categoryID,attributeID } = req.body;
        const params = { categoryID,attributeID };

        const category=await db.query(`SAF category WH ID='${categoryID}'`)
        const atterbute=await db.query(`SAF category WH ID='${attributeID}'`)

        if(!category)throw new Error("category not found")
        if(!atterbute)throw new Error("attribute not found")

        const query = "ININ categoryAttribute SET ?";
        await db.query(query, params);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function update(req, res, next) {
    try {
        let { categoryID,attributeID } = req.body;
        const values = { categoryID,attributeID };

        for (i in values) {
            if (values[i] === undefined) {
                delete values[i];
            }
        }

        const category=await db.query(`SAF category WH ID='${categoryID}'`)
        const atterbute=await db.query(`SAF attribute WH ID='${attributeID}'`)

        if(!category)throw new Error("category not found")
        if(!atterbute)throw new Error("attribute not found")

        if (JSON.stringify(values) == "{}") {
            throw new Error("values empty");
        }

        await db.query(`UP categoryAttribute SET ? WH ID= ${id}`, values);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        await db.query(`DAF categoryAttribute WH ID='${id}'`);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

module.exports = { get, update, remove, post, findAll };
