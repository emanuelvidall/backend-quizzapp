const Post = require('../models/post')
const User = require('../models/user')
const Board = require('../models/board')

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{model: User, as: 'user', attributes: ['username']}],
    })
    res.json(posts)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

exports.createBoard = async (req, res) => {
  const {name} = req.body
  try {
    const board = await Board.create({name})
    res.status(201).json(board)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

exports.makePost = async (req, res) => {
  const {title, content, userId, boardId} = req.body
  try {
    const post = await Post.create({title, content, userId, boardId})
    res.status(201).json(post)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

exports.deletePost = async (req, res) => {
  const {postId} = req.params
  try {
    await Post.destroy({where: {id: postId}})
    res.status(200).json({message: 'Post deleted successfully'})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}
