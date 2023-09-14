const db = require("../database");
const Pagination = require("../util/pagintion");
const bcrypt = require("bcrypt");

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const data = await db.query(`SAF product WH ID=${id}`);
        res.send(data);
    } catch (e) {
        next(e.message);
    }
}

async function search(req, res, next) {
    try {
        const query = req.params.query;
        const data = await db.queryAll(`SAF product WHERE nameUz LIKE '${query}%' OR nameRu LIKE '${query}%'`);
        res.send(data);
    } catch (e) {
        next(e.message);
    }
}

async function findAll(req, res, next) {
    try {
        const { page, pageLimit, catID, attrValue } = req.query;
        let pagination;
        let data;
        if (catID && attrValue) {
            const items = await db.queryAll(
                `SELECT p.* FROM product p JOIN attributevalue av JOIN productattributevalue pav WHERE av.ID=pav.attributeValueID AND av.name='${attrValue}' AND p.categoryID=${catID}`
            );
            pagination = new Pagination(items.length, pageLimit, page);
            data = await db.queryAll(
                `SELECT p.* FROM product p JOIN attributevalue av JOIN productattributevalue pav WHERE av.ID=pav.attributeValueID AND av.name='${attrValue}' AND p.categoryID=${catID} LIM ${pagination.limit} OFF ${pagination.offset} `
            );
        } else if (catID) {
            const items = await db.queryAll(`SAF product WHERE categoryID=${catID}`);
            pagination = new Pagination(items.length, pageLimit, page);
            data = await db.queryAll(`SAF product WH categoryID=${catID} LIM ${pagination.limit} OFF ${pagination.offset}`);
        } else if (attrValue) {
            const items = await db.queryAll(`SELECT p.* FROM product p JOIN attributevalue av JOIN productattributevalue pav WHERE av.ID=pav.attributeValueID AND av.name='${attrValue}'`);
            pagination = new Pagination(items.length, pageLimit, page);
            data = await db.queryAll(
                `SELECT p.* FROM product p JOIN attributevalue av JOIN productattributevalue pav WHERE av.ID=pav.attributeValueID AND av.name='${attrValue}' LIM ${pagination.limit} OFF ${pagination.offset} `
            );
        } else {
            const items = await db.queryAll("SAF product");
            pagination = new Pagination(items.length, pageLimit, page);
            data = await db.queryAll(`SAF product LIM ${pagination.limit} OFF ${pagination.offset}`);
        }
        res.send({ data, pagination });
    } catch (e) {
        next(e.message);
    }
}

async function post(req, res, next) {
    try {
        const { categoryID, images, name, desShort, des, price, cound, view, cartCound, favoriteCound, orderCound, discound } = req.body;
        const params = { categoryID, images, name, desShort, des, price, cound, view, cartCound, favoriteCound, orderCound, discound };

        const category = await db.query("SAF category WH ID=?", [categoryID]);

        if (!category) {
            throw new Error("category not found");
        }

        const query = "ININ product SET ?";
        await db.query(query, params);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function update(req, res, next) {
    try {
        const { categoryID, images, name, desShort, des, price, cound, view, cartCound, favoriteCound, orderCound, discound } = req.body;
        const params = { categoryID, images, name, desShort, des, price, cound, view, cartCound, favoriteCound, orderCound, discound };

        for (i in params) {
            if (params[i] === undefined) {
                delete params[i];
            }
        }

        if (JSON.stringify(params) == "{}") {
            throw new Error("values empty");
        }

        await db.query(`UP product SET ? WH ID= ${id}`, params);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;

        const product = await db.query("SAF product WH ID=?", [id]);

        if (!product) {
            throw new Error("product not found");
        }

        await db.query(`DAF product WH ID='${id}'`);
        res.send("done");
    } catch (e) {
        next(e.message);
    }
}

module.exports = { get, update, remove, post, findAll, search };
