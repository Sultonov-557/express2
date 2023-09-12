const express = require("express");
const app = express();
const Response = require("./util/response");
const multer = require("multer");

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

app.get("/database.sql", (req, res) => {
    res.sendFile(__dirname + "/database.sql");
});

app.use("/image", express.static("./image"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./image");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + Math.floor(Math.random() * 10000) + "";
        const name = file.originalname.split(".");
        cb(null, uniqueSuffix + "." + name[name.length - 1]);
    },
});

app.post("/upload", multer({ storage: storage }).array("image", 10), (req, res) => {
    const urls = [];
    for (i in req.files) {
        urls.push(req.files[i].path);
    }
    res.send(urls);
});

app.get("/", authMiddleware, roleMiddleware("user"), (req, res) => {
    res.send("hello");
});

app.use((err, req, res, next) => {
    console.log(err);
    res.send(new Response(null, null, err));
});
