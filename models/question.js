const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/database')
const Quiz = require('./quiz')

class Question extends Model {}

Question.init(
  {
    text: {type: DataTypes.STRING, allowNull: false},
    quizId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quizzes', // Table name, not model name
        key: 'id',
      },
    },
  },
  {sequelize, modelName: 'question'},
)

Quiz.hasMany(Question, {foreignKey: 'quizId', as: 'questions'})
Question.belongsTo(Quiz, {foreignKey: 'quizId', as: 'quiz'})

module.exports = Question
