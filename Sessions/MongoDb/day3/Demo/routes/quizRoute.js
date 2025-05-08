const express = require('express');
const route = express.Router();
const quizController = require('../controllers/quizController');
const isAmdin = require('../middlewares/adminAuth');

route.post('/add-quiz', quizController.createQuiz)
route.delete('/delete-quiz/:id', quizController.deleteQuiz)
route.patch('/update-quiz', quizController.updateQuiz)


module.exports = route;