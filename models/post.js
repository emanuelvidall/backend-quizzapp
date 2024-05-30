const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/database')
const User = require('./user')
const Board = require('./board')

class Post extends Model {}

Post.init(
  {
    title: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.TEXT, allowNull: false},
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'post',
  },
)

User.hasMany(Post, {foreignKey: 'userId', as: 'posts'})
Post.belongsTo(User, {foreignKey: 'userId', as: 'user'})
Board.hasMany(Post, {foreignKey: 'boardId', as: 'posts'})
Post.belongsTo(Board, {foreignKey: 'boardId', as: 'board'})

module.exports = Post
