const Painting = require('../models/painting')

exports.addPainting = async (req, res) => {
  try {
    const {title, artist, description, imageUrl} = req.body
    const painting = await Painting.create({
      title,
      artist,
      description,
      imageUrl,
    })
    res.status(201).json(painting)
  } catch (error) {
    res.status(500).json({message: 'Failed to add painting', error: error.message})
  }
}

exports.getPaintings = async (req, res) => {
  try {
    const paintings = await Painting.findAll()
    res.status(200).json(paintings)
  } catch (error) {
    res.status(500).json({message: 'Failed to retrieve paintings', error: error.message})
  }
}
