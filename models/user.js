const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/database')
const bcrypt = require('bcrypt')
const Painting = require('./painting')

class User extends Model {
  async validPassword(password) {
    return bcrypt.compare(password, this.password)
  }
}

User.init(
  {
    username: {type: DataTypes.STRING, unique: true, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    score: {type: DataTypes.INTEGER, defaultValue: 0},
    // admin typeUser 0, user typeUser 1
    typeUser: {type: DataTypes.INTEGER, defaultValue: 1},
  },
  {
    sequelize,
    modelName: 'user',
  },
)

User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
})

User.belongsToMany(Painting, {
  as: 'Favorites',
  through: 'UserFavorites',
  foreignKey: 'userId',
  otherKey: 'paintingId',
})

module.exports = User
