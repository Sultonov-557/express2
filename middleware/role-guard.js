module.exports = (...role) => {
    return (req, res, next) => {
        console.log(role);
        console.log(req.role);
        if (role.includes(req.role)) {
            next();
        } else {
            res.send("permission denied");
        }
    };
};
