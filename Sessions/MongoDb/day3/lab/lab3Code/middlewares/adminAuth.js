const jwt = require('jsonwebtoken');
function isAmdin(req, res, next) {
    const token = req.headers.authorization;
    console.log(token);
    try {
        const data = jwt.verify(token, "testkey")

        if (data.role == "Admin") {
            next();
        }
        else {
            res.send("not auth");
        }
    }
    catch (e) {
        res.send("not auth")
    }

}

module.exports = isAmdin;