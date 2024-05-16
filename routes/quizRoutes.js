const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quizController')

router.get('/:paintingId', quizController.getQuizByPainting)
router.post('/:paintingId', quizController.createQuiz)
router.get('/get-quiz/:quizId', quizController.getQuizById)
router.post('/calculate-score', quizController.calculateQuizScore)

module.exports = router
