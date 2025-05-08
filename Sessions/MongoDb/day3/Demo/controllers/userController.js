const User = require("../Models/User");

const jwt = require("jsonwebtoken");
async function createUser(req, res) {
    const body = req.body;
    console.log(body);
    let { email, role } = body

    const created = await User.create(body);
    let token = jwt.sign({ email, role }, "testkey");


    res.json({
        msg: 'created',
        token
    });
}

module.exports = { createUser };