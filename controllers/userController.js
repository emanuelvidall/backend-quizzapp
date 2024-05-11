const User = require('../models/user')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

exports.register = async (req, res) => {
  const {username, email, password} = req.body
  const user = await User.create({username, email, password})
  res.status(201).send(user)
}

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
      return res.status(401).json({message: 'User not found'})
    }
    const isValid = await user.validPassword(password)
    if (!isValid) {
      return res.status(401).json({message: 'Invalid credentials'})
    }
    const token = jwt.sign({id: user.id}, process.env.SECRET, {
      expiresIn: '1h',
    })
    res.json({token: token, id: user.id})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

exports.addFavorite = async (req, res) => {
  const {userId, paintingId} = req.body
  try {
    const user = await User.findByPk(userId)
    const painting = await Painting.findByPk(paintingId)
    await user.addFavorite(painting)
    res.status(200).json({message: 'Painting added to favorites!'})
  } catch (error) {
    res.status(500).json({message: 'Failed to add favorite', error: error.message})
  }
}

exports.removeFavorite = async (req, res) => {
  const {userId, paintingId} = req.body
  try {
    const user = await User.findByPk(userId)
    const painting = await Painting.findByPk(paintingId)
    await user.removeFavorite(painting)
    res.status(200).json({message: 'Painting removed from favorites!'})
  } catch (error) {
    res.status(500).json({message: 'Failed to remove favorite', error: error.message})
  }
}

exports.recordQuizCompletion = async (req, res) => {
  const {userId, quizId} = req.body
  try {
    const user = await User.findByPk(userId)
    const quiz = await Quiz.findByPk(quizId)
    await user.addAnsweredQuiz(quiz)
    res.json({message: 'Quiz recorded as completed!'})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
