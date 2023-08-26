const mysql = require("mysql2/promise");
const dbutil = require("./util/dbparse");

let con;

module.exports["connect"] = async () => {
    con = await mysql.createConnection({
        host: process.env.DATABASE_URL,
        user: process.env.DATABASE_USER,
        port: process.env.DATABASE_PORT,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    });
};

module.exports["query"] = async (query, values) => {
    query = dbutil.parse(query);
    let data;
    if (values == undefined) {
        data = await con.query(query);
    } else {
        data = await con.query(query, values);
    }
    return data[0][0];
};

module.exports["queryAll"] = async (query, values) => {
    query = dbutil.parse(query);
    let data;
    if (values == undefined) {
        data = await con.query(query);
    } else {
        data = await con.query(query, values);
    }
    return data[0];
};
