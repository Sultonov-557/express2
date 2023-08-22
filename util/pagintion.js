module.exports = class Pagination {
    constructor(page = 1, paginationLimit = 15) {
        this.limit = paginationLimit;
        this.offset = (page - 1) * this.limit;
    }
};
