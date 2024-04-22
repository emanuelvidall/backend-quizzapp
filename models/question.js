const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/database')

class Question extends Model {}
Question.init(
  {
    text: {type: DataTypes.STRING, allowNull: false},
    options: {type: DataTypes.JSON, allowNull: false}, // JSON type to store options
  },
  {sequelize, modelName: 'question'},
)

module.exports = Question
