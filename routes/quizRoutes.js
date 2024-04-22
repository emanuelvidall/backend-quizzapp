const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quizController')

router.get('/:paintingId', quizController.getQuizByPainting)
router.post('/', quizController.createQuiz)

module.exports = router
