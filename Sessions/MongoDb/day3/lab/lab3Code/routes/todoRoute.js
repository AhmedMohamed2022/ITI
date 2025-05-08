const express = require('express');
const route = express.Router();
const quizController = require('../controllers/todoController');
// const isAmdin = require('../middlewares/adminAuth');

route.post('/createTode', quizController.CreateTode)
route.get('/getTodos/:id', quizController.GetTodos)
route.patch('/editTodo/:todoId', quizController.EditTode)
route.delete('/deleteTodo/:todoid', quizController.DeleteTodo)


module.exports = route;