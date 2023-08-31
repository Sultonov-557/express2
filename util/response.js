const Pagination = require("./pagintion");

class Response {
    /**
     * @param {Array} data
     * @param {Pagination} pagination
     * @param {Error} error
     */
    constructor(data, pagination, error) {
        /**@type {Array} */
        this.data = data || null;

        /**@type {Pagination} */
        this.pagination = pagination || null;

        /**@type {Error} */
        this.error = error || null;

        /**@type {number} */
        this.date = new Date();
    }
}

module.exports = Response;
