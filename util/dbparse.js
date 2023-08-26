/**
 * @param {string} txt string to parse
 * @returns {string} parsed string
 */
module.exports["parse"] = (txt) => {
	let out = txt
	out = out.replace(/SEL /g, "SELECT ")
	out = out.replace(/SAF /g, "SELECT * FROM ")
	out = out.replace(/DAF /g, "DELETE * FROM ")
	out = out.replace(/FR /g, "FROM ")
	out = out.replace(/UP /g, "UPDATE ")
	out = out.replace(/IN /g, "INSERT ")
	out = out.replace(/ININ /g, "INSERT INTO")
	out = out.replace(/DEL /g, "DELETE ")
	out = out.replace(/WH /g, "WHERE ")
	out = out.replace(/LIM /g, "LIMIT ")
	out = out.replace(/OFF /g, "OFFSET ")
	return out;
}

/**
 * @param {string} tableName name of table
 * @param {number} ID id of table 
 * @returns {string} query string
 */
module.exports["findByID"]=(tableName,ID)=>{
	return this.parse(`SAF ${tableName} WH ID=${ID}`)
}

/**
 * @param {string} tableName name of table
 * @returns {string} query string
 */
module.exports["findAll"]=(tableName)=>{
	return this.parse(`SAF ${tableName}`)
}

/**
 * @param {string} tableName name of table
 * @param {string} condition condition for search
 * @returns {string} query string
 */
module.exports["find"]=(tableName,condition)=>{
	return this.parse(`SAF ${tableName} WH ${condition}`)
}