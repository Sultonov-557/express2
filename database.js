const mysql = require("mysql2/promise");

let con;

module.exports["connect"] = async () => {
    con = await mysql.createConnection({
        host: "localhost",
        user: "root",
        port: 3306,
        password: "root",
        database: "database",
    });
};

module.exports["query"] = async (query) => {
    const data = await con.query(query);
    return data[0];
};
