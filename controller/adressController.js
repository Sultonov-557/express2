const db = require("../database");

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const data = await db.query(`SAF adress WH ID=${id}`);
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
        const data = await db.queryAll(
            `SAF adress LIM ${categoryPagination.limit} OFF ${pagination.offset}`
        );
        res.send({ data, pagination });
    } catch (e) {
        next(e.message);
    }
}

async function post(req, res, next) {
    try {
        const { name, username, hashedPassword, photo, phone, region, otp, role } = req.body;

        const params = { name, username, hashedPassword, photo, phone, region, otp, role };

        const user = await db.query(`SAF adress WH phone='${phone}'`);

        if (user) {
            throw new Error("user already exits");
        }

        const query = "ININ adress SET ?";
        await db.query(query, params);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function update(req, res, next) {
    try {
        let { name, username, photo, region, phone, otp, role } = req.body;
        const values = { name, username, phone, photo, region, otp, role };

        for (i in values) {
            if (values[i] === undefined) {
                delete values[i];
            }
        }

        if (JSON.stringify(values) == "{}") {
            throw new Error("values empty");
        }

        await db.query(`UP adress SET ? WH ID= ${id}`, values);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        await db.query(`DAF adress WH ID='${id}'`);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

module.exports = { get, update, remove, post, findAll };
