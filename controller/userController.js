const db = require("../database");

async function get(req, res) {
    try {
        const id = req.params.id;
        const data = await db.query(`SAF user WH ID=${id}`);
        res.send(data);
    } catch (e) {
        res.send(e.message);
    }
}

async function post(req, res) {
    try {
        const { name, username, photo, phone, region, otp, role } = req.body;
        const params = { name, username, photo, phone, region, otp, role };

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

module.exports = { get, update, remove, post };
