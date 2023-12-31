/**
 * @param {string} txt string to parse
 * @returns {string} parsed string
 */
module.exports["parse"] = (txt) => {
    let out = txt;
    out = out.replace(/FR /g,   "FROM ");
    out = out.replace(/WH /g,   "WHERE ");
    out = out.replace(/UP /g,   "UPDATE ");
    out = out.replace(/LIM /g,  "LIMIT ");
    out = out.replace(/OFF /g,  "OFFSET ");
    out = out.replace(/DEL /g,  "DELETE ");
    out = out.replace(/SEL /g,  "SELECT ");
    out = out.replace(/SAF /g,  "SELECT * FROM ");
    out = out.replace(/DAF /g,  "DELETE * FROM ");
    out = out.replace(/ININ /g, "INSERT INTO ");
    return out;
};

/**
 * @param {string} tableName name of table
 * @param {number} ID id of table
 * @returns {string} query string
 */
module.exports["findByID"] = (tableName, ID) => {
    return this.parse(`SAF ${tableName} WH ID=${ID}`);
};

/**
 * @param {string} tableName name of table
 * @returns {string} query string
 */
module.exports["findAll"] = (tableName) => {
    return this.parse(`SAF ${tableName}`);
};

/**
 * @param {string} tableName name of table
 * @param {string} condition condition for search
 * @returns {string} query string
 */
module.exports["find"] = (tableName, condition) => {
    return this.parse(`SAF ${tableName} WH ${condition}`);
};

/**
 * @param {string} tableName name of table
 * @param {number} ID id of table
 * @returns {string} query string
 */
module.exports["deleteByID"] = (tableName, ID) => {
    return this.parse(`DAF ${tableName} WH ID='${ID}'`);
};

/**
 * @param {string} tableName name of table
 * @returns {string} query string
 */
module.exports["deleteAll"] = (tableName) => {
    return this.parse(`DAF ${tableName}`);
};

/**
 * @param {string} tableName name of table
 * @param {string} condition condition for search
 * @returns {string} query string
 */
module.exports["delete"] = (tableName, condition) => {
    return this.parse(`DAF ${tableName} WH ${condition}`);
};

/**
 * @param {string} tableName name of table
 * @param {number} ID id of table
 * @returns {string} query string
 */
module.exports["updateByID"] = (tableName, ID, values) => {
    return this.parse(`UP ${tableName} SET ? WH ID='${ID}'`);
};

/**
 * @param {string} tableName name of table
 * @returns {string} query string
 */
module.exports["updateAll"] = (tableName, value) => {
    return this.parse(`UP ${tableName} SET ?`);
};

/**
 * @param {string} tableName name of table
 * @param {string} condition condition for search
 * @returns {string} query string
 */
module.exports["update"] = (tableName, value, condition) => {
    return this.parse(`UP ${tableName} SET ? WH ${condition}`);
};
