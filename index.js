const express = require("express");
const app = express();
const Response = require("./util/response");

app.use(express.json());
require("dotenv").config();

const db = require("./database.js");
db.connect();

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server running on port " + port);
});

const authRoute = require("./routes/authRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");
const userRoute = require("./routes/userRoute.js");
const addressRoute = require("./routes/addressRoute.js");
const productRoute = require("./routes/productRoute.js");

const authMiddleware = require("./middleware/auth-guard.js");
const roleMiddleware = require("./middleware/role-guard.js");

app.use("/auth", authRoute);
app.use("/category", categoryRoute);
app.use("/user", userRoute);
app.use("/address", addressRoute);
app.use("/product", productRoute);

app.get("/", authMiddleware, roleMiddleware("user"), (req, res) => {
    res.send("hello");
});

app.use((err, req, res, next) => {
    res.send(new Response(null, null, err));
});

require("./test");
