const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/database')

class Painting extends Model {}

Painting.init(
  {
    title: {type: DataTypes.STRING, allowNull: false},
    artist: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT},
    imageUrl: {type: DataTypes.STRING},
  },
  {
    sequelize,
    modelName: 'painting',
  },
)

module.exports = Painting
