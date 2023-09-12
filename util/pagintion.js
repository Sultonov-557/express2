class Pagination {
    /**
     * @param {number} items
     * @param {number} limit
     * @param {number} page
     */
    constructor(items = 0, limit = 15, page = 1) {
        limit = parseInt(limit);
        page  = parseInt(page);

        this.limit       = limit;
        this.items       = items;
        this.pages       = Math.ceil(items / limit);
        this.offset      = (page - 1) * limit;
        this.currentPage = page;
    }
}

module.exports = Pagination;
