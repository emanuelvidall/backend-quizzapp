const express = require('express')
const router = express.Router()
const boardController = require('../controllers/boardController')

router.get('/', boardController.getPosts)
router.post('/', boardController.makePost)
router.delete('/', boardController.deletePost)

module.exports = router
