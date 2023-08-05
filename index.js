const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server running on port " + port);
});

const authRoute = require("./routes/auth_route.js");

app.use("/auth", authRoute);
  