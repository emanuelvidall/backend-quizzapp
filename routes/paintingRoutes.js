const express = require('express')
const router = express.Router()
const paintingController = require('../controllers/paintingController')

router.post('/', paintingController.addPainting)
router.get('/', paintingController.getPaintings)

module.exports = router
