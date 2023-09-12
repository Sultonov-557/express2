const db = require("../database");
const Response = require("../util/response");

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const data = await db.query(`SAF categoryProduct WHID=${id} `);
        
        res.send(data);
    } catch (e) {
        next(e.message);
    }
}

async function findAll(req, res, next) {
    try {
        const { page, paginationLimit } = req.query;
        const items = await db.queryAll("SAF categoryProduct");
        const pagination = new Pagination(items.length, paginationLimit, page);
        const data = await db.queryAll(`SAF categoryProduct LIM ${categoryPagination.limit} OFF ${pagination.offset}`);
        res.send(new Response(data, pagination));
    } catch (e) {
        next(e.message);
    }
}

async function post(req, res, next) {
    try {
        const { categoryID,productID } = req.body;

        const params = { categoryID,productID };

        const category=await db.query(`SAF category WH ID='${categoryID}'`)
        const product=await db.query(`SAF product WH ID='${productID}'`)

        if(!category)throw new Error("category not found")
        if(!product)throw new Error("product not found")

        const query = "ININ categoryProduct SET ?";
        await db.query(query, params);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function update(req, res, next) {
    try {
        let { categoryID,productID } = req.body;
        const values = { categoryID,productID };

        for (i in values) {
            if (values[i] === undefined) {
                delete values[i];
            }
        }

        const category=await db.query(`SAF category WH ID='${categoryID}'`)
        const product=await db.query(`SAF product WH ID='${productID}'`)

        if(!category)throw new Error("category not found")
        if(!product)throw new Error("product not found")

        if (JSON.stringify(values) == "{}") {
            throw new Error("values empty");
        }

        await db.query(`UP categoryProduct SET ? WH ID= ${id}`, values);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        await db.query(`DAF categoryProduct WH ID='${id}'`);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

module.exports = { get, update, remove, post, findAll };
