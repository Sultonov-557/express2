module.exports = (...role) => {
    return (req, res, next) => {
        if (role.includes(req.role)) {
            next();
        } else {
            res.send("permission denied");
        }
    };
};
