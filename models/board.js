const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/database')

class Board extends Model {}

Board.init(
  {
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: true},
  },
  {
    sequelize,
    modelName: 'board',
  },
)

module.exports = Board
