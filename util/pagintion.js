module.exports = class Pagination {
    constructor(items, limit, page) {
        limit = parseInt(limit);
        page = parseInt(page);
        this.limit = limit;
        this.offset = (page - 1) * limit;
        this.currentPage = page;
        this.items = items;
        this.pages = Math.round(items / limit);
    }
};
