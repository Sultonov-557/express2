const db = require("../database");
const Response = require("../util/response");

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const data = await db.query(`SAF favorite WHID=${id} `);
        
        res.send(data);
    } catch (e) {
        next(e.message);
    }
}

async function findAll(req, res, next) {
    try {
        const { page, paginationLimit } = req.query;
        const items = await db.queryAll("SAF favorite");
        const pagination = new Pagination(items.length, paginationLimit, page);
        const data = await db.queryAll(`SAF favorite LIM ${pagination.limit} OFF ${pagination.offset}`);
        res.send(new Response(data, pagination));
    } catch (e) {
        next(e.message);
    }
}

async function post(req, res, next) {
    try {
        const { productID,userID } = req.body;

        const params = { productID,userID };

        const product=await db.query(`SAF product WH ID='${productID}'`)
        const user=await db.query(`SAF product WH ID='${userID}'`)

        if(!product)throw new Error("product not found")
        if(!user)throw new Error("user not found")

        const query = "ININ favorite SET ?";
        await db.query(query, params);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function update(req, res, next) {
    try {
        let { productID,userID } = req.body;
        const values = { productID,userID };

        for (i in values) {
            if (values[i] === undefined) {
                delete values[i];
            }
        }

        const product=await db.query(`SAF product WH ID='${productID}'`)
        const user=await db.query(`SAF product WH ID='${userID}'`)

        if(!product)throw new Error("product not found")
        if(!user)throw new Error("user not found")

        if (JSON.stringify(values) == "{}") {
            throw new Error("values empty");
        }

        await db.query(`UP favorite SET ? WH ID= ${id}`, values);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        await db.query(`DAF favorite WH ID='${id}'`);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

module.exports = { get, update, remove, post, findAll };
