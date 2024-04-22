const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

class User extends Model {
    validPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

User.init({
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    score: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
    sequelize,
    modelName: 'user'
});

User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
