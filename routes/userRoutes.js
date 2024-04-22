const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const errorHandler = require('../middlewares/errorHandler');

router.post('/register', errorHandler, userController.register);
router.post('/login', userController.login);
// router.post('/reset-password', userController.resetPassword);
router.post('/add-favorite', userController.addFavorite);
router.post('/record-quiz', userController.recordQuizCompletion);

module.exports = router;
