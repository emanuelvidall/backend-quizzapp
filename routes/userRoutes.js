const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/add-favorite', userController.addFavorite)
router.post('/remove-favorite', userController.removeFavorite)
router.post('/record-quiz', userController.recordQuizCompletion)

module.exports = router
