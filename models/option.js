const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/database')
const Question = require('./question')

class Option extends Model {}

Option.init(
  {
    answer: {type: DataTypes.STRING, allowNull: false},
    is_correct: {type: DataTypes.BOOLEAN, allowNull: false},
    questionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'questions', // Table name, not model name
        key: 'id',
      },
    },
  },
  {sequelize, modelName: 'option'},
)

Question.hasMany(Option, {foreignKey: 'questionId', as: 'options'})
Option.belongsTo(Question, {foreignKey: 'questionId', as: 'question'})

module.exports = Option
