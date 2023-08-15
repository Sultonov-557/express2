const express = require("express");
const app = express();

app.use(express.json());
require("dotenv").config();

const db = require("./database.js");
db.connect();

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server running on port " + port);
});

const authRoute = require("./routes/auth_route.js");

const authMiddleware = require("./middleware/auth-guard.js");
const roleMiddleware = require("./middleware/role-guard.js");

app.use("/auth", authRoute);

app.get("/", authMiddleware, roleMiddleware("user"), (req, res) => {
    res.send("hello");
});
