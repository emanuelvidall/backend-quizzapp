const express = require('express')
const router = express.Router()
const boardController = require('../controllers/boardController')

router.post('/board', boardController.createBoard)
router.get('/', boardController.getPosts)
router.post('/', boardController.makePost)
router.delete('/:postId', boardController.deletePost)

module.exports = router
