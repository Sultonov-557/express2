const db = require("../database");
const Response = require("../util/response");

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const data = await db.query(`SAF productAttributeValue WHID=${id} `);
        
        res.send(data);
    } catch (e) {
        next(e.message);
    }
}

async function findAll(req, res, next) {
    try {
        const { page, paginationLimit } = req.query;
        const items = await db.queryAll("SAF productAttributeValue");
        const pagination = new Pagination(items.length, paginationLimit, page);
        const data = await db.queryAll(`SAF productAttributeValue LIM ${categoryPagination.limit} OFF ${pagination.offset}`);
        res.send(new Response(data, pagination));
    } catch (e) {
        next(e.message);
    }
}

async function post(req, res, next) {
    try {
        const { productID,attributeValueID } = req.body;

        const params = { productID,attributeValueID };

        const product=await db.query(`SAF product WH ID='${productID}'`)
        const attributeValue=await db.query(`SAF attributevalue WH ID='${attributeValueID}'`)

        if(!product)throw new Error("product not found")
        if(!attributeValue)throw new Error("attribute value not found")

        const query = "ININ productAttributeValue SET ?";
        await db.query(query, params);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function update(req, res, next) {
    try {
        let { productID,attributeValueID } = req.body;
        const values = { productID,attributeValueID };

        for (i in values) {
            if (values[i] === undefined) {
                delete values[i];
            }
        }

        if (JSON.stringify(values) == "{}") {
            throw new Error("values empty");
        }

        await db.query(`UP productAttributeValue SET ? WH ID= ${id}`, values);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        await db.query(`DAF productAttributeValue WH ID='${id}'`);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

module.exports = { get, update, remove, post, findAll };
