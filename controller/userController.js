const db = require("../database");
const bcrypt = require("bcrypt");

async function get(req, res) {
    try {
        const id = req.params.id;
        const data = await db.query(`SAF user WH ID=${id}`);
        res.send(data);
    } catch (e) {
        res.send(e.message);
    }
}

async function findAll(req, res) {
    try {
        const { page, paginationLimit } = req.query;
        console.log(page);
        const items = await db.queryAll("SAF category");
        const categoryPagination = new Pagination(items.length, paginationLimit, page);
        console.log(categoryPagination);
        const data = await db.queryAll(
            `SAF category LIM ${categoryPagination.limit} OFF ${categoryPagination.offset}`
        );
        res.send({ data, pagination: categoryPagination });
    } catch (e) {
        res.send(e.message);
    }
}

async function post(req, res) {
    try {
        const { name, username, hashedPassword, photo, phone, region, otp, role } = req.body;

        hashedPassword = bcrypt.hashSync(hashedPassword, 5);

        const params = { name, username, hashedPassword, photo, phone, region, otp, role };

        const user = await db.query(`SAF user WH phone='${phone}'`);

        if (user) {
            throw new Error("user already exits");
        }

        const query = "ININ user SET ?";
        await db.query(query, params);
        res.send("done");
    } catch (e) {
        res.send(e.message);
    }
}

async function update(req, res) {
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

        await db.query(`UP user SET ? WH ID= ${id}`, values);
        res.send("done");
    } catch (e) {
        res.send(e.message);
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        await db.query(`DAF user WH ID='${id}'`);
        res.send("done");
    } catch (e) {
        res.send(e.message);
    }
}

module.exports = { get, update, remove, post, findAll };
