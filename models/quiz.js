const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/database')
const Painting = require('./painting')

class Quiz extends Model {}

Quiz.init(
  {
    paintingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Painting,
        key: 'id',
      },
    },
    title: {type: DataTypes.STRING, allowNull: false},
  },
  {sequelize, modelName: 'quiz'},
)

Painting.hasOne(Quiz, {foreignKey: 'paintingId', as: 'quiz'})
Quiz.belongsTo(Painting, {foreignKey: 'paintingId', as: 'painting'})

module.exports = Quiz
