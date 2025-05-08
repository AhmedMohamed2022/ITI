const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');

route.post('/register', userController.Register)
route.post('/login', userController.Login)
route.get('/getAllUsers', userController.GetAllUsers)
route.delete('/deleteuser', userController.DeleteUser)
route.patch('/editUser', userController.EditUser)



module.exports = route;