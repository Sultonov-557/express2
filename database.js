const mysql = require("mysql2/promise");

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

module.exports["query"] = async (query) => {
    const data = await con.query(query);
    return data[0];
};
