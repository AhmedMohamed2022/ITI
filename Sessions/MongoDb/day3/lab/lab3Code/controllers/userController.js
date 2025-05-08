const User = require("../Models/User");

async function Register(req, res) {
    const body = req.body;
    console.log(body);
    try {
        const created = await User.create(body);
        console.log(created);
        res.json({
            msg: 'user was registered successfully',
            UserName:body.username
        });
    }
    catch (e) {
        res.json({
            msg: "register Failed"
        })
    }

}
async function GetAllUsers(req, res) {
    try {
        const registeredUsers = await User.find();
        console.log(registeredUsers);
        let users=[];
   
        registeredUsers.forEach(element => {
            users.push(element.firstName);
        })
        res.send(users);
// }
        // )
    }
    catch (e) {
        res.json({
            msg: "register Failed"
        })
    }

}
async function Login(req, res) {
    const body = req.body;
    console.log(body);
    const { username } = body;
    const { password } = body;
    // let { email, role } = body
    try {
        const registeredUser = await User.findOne({ username: username, password: password });
        console.log(registeredUser);
        console.log(registeredUser.username);

        // const created = await User.create(body);
        // let token = jwt.sign({ email, role }, "testkey");
        // console.log(created);
        if (registeredUser.username=username&& registeredUser.password==password)
            res.json({
                msg:"logged in successfully" ,
                userName:username
                // ,todos 
                // token
            });        else
            res.status(401).json({
                error: "invalid credentials"
            })
    }
    catch (e) {
        res.json({
            msg: "register Failed"
        })
    }

}
async function DeleteUser(req, res) {
    const body = req.body;
    // const {id}= body;
    const {username}=body;
    try {
        const userToDelete = await User.deleteOne({ username: username});
        console.log(userToDelete);
            res.json({
                msg: "user deleted"
            })
    }
    catch (e) {
        res.json({
            msg: "deletion Failed"
        })
    }

}
async function EditUser(req, res) {
    const body = req.body;
    const {username}=body;
    try {
        const userToUpdate = await User.findOneAndUpdate({ username: username},body);
        console.log(userToUpdate);
        const userAfterUpdate = await User.find({ username: userToUpdate.username});

            res.json({
                msg: "user was edited successfully",
                user: userAfterUpdate
            })
    }
    catch (e) {
        res.json({
            msg: "edit Failed"
        })
    }

}

module.exports = { Register, Login,GetAllUsers,DeleteUser,EditUser};