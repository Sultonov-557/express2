const db        = require("../database");
const jwt       = require("jsonwebtoken");
const bcrypt    = require("bcrypt");
const express   = require("express");
const authRoute = express.Router();
const authGuard = require("../middleware/auth-guard");

authRoute.post("/login", async (req, res) => {
	try {
		const { phone, password } = req.body;
		if (!password || !phone) {
			throw new Error("values incorrect");
		}

		const user = await db.query(`SELECT * FROM user WHERE phone='${phone}'`);

		if (user == undefined) {
			throw new Error("phone is incorrect");
		}

		if (await bcrypt.compareSync(user.hashedPassword, password)) {
			throw new Error("password is incorrect");
		}
		const accesToken = jwt.sign({ ID: user.ID, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES });
		const refreshToken = jwt.sign({ ID: user.ID, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES });

		const hashedRefreshToken = await bcrypt.hash(refreshToken, 5);
		db.query(`UPDATE user SET hashedRefreshToken='${hashedRefreshToken}' WHERE phone='${phone}'`);
		res.send({ accesToken, refreshToken });
	} catch (e) {
		res.send(e.message);
	}
});

authRoute.post("/register", async (req, res) => {
	try {
		const { username, password, name, phone } = req.body;
		if(!username || !password || !name || !phone) {
			throw new Error("values not right");
		}
		const username_ = await db.query(`SELECT username FROM user WHERE username='${username}'`);
		if (username_) {
			throw new Error("username already exists");
		}
		const phone_ = await db.query(`SELECT phone FROM user WHERE phone='${phone}'`);
		if (phone_) {
			throw new Error("phone already exists");
		}

		const hashedPassword = await bcrypt.hashSync(password, 5);

		await db.query(`INSERT user ( username , hashedPassword , name , phone) VALUES ( '${username}' , '${hashedPassword}' , '${name}' , '${phone}')`);
		res.send("done");
	} catch (e) {
		res.send(e.message);
	}
});

authRoute.post("/refresh", async (req, res) => {
	try {
		const refreshToken_ = req.body.refreshToken;

		if (!refreshToken_) {
			throw new Error("BAD REQUEST"); //BAD request
		}

		const { ID, role } = jwt.verify(refreshToken_, process.env.REFRESH_TOKEN_SECRET);

		const user = await db.query(`SELECT * FROM user WHERE ID=${ID}`);

		if (user.hashedRefreshToken == undefined) {
			throw new Error("access denied");
		}

		const refreshToken = jwt.sign(
			{
				ID,
				role,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
			}
		);

		const accessToken = jwt.sign(
			{
				ID,
				role,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
			}
		);
		const hashedRefreshToken = await bcrypt.hashSync(refreshToken, 5);
		await db.query(`UPDATE user SET hashedRefreshToken=${hashedRefreshToken} WHERE id=${ID}`);
		res.send({ accessToken, refreshToken });
	} catch (e) {
		res.send(e);
	}
});

authRoute.post("/logout", authGuard, async (req, res) => {
	try {
		await db.query(`UPDATE user SET hashedRefreshToken=NULL WHERE id=${req.id}`);
	} catch (e) {
		res.send(e.message);
	}
});

module.exports = authRoute;
