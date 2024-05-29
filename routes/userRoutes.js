const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/add-favorite', userController.addFavorite)
router.get('/get-favorites/:userId', userController.getFavorites)
router.get('/get-user/:userId', userController.getUser)

//transferir para admin depois

router.get('/get-all-users', adminController.getAllUsers)

router.delete('/remove-favorite', userController.removeFavorite)
router.post('/record-quiz', userController.recordQuizCompletion)

//transferir para admin depois
router.post('/add-score/:userId', userController.AddScore)
router.get('/get-scores/:userId', userController.getScores)
router.patch('/update-score', userController.updateScore)

module.exports = router
