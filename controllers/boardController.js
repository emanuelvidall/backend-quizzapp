const Post = require('../models/post')
const User = require('../models/user')

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

exports.makePost = async (req, res) => {
  const {content, userId, boardId} = req.body
  try {
    const post = await Post.create({content, userId, boardId})
    res.status(201).json(post)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

exports.deletePost = async (req, res) => {
  const {postId} = req.body
  try {
    await Post.destroy({where: {id: postId}})
    res.status(200).json({message: 'Post deleted successfully'})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}
