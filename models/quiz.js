const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Quiz extends Model {}

Quiz.init({
    paintingId: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: 'quiz' });

module.exports = Quiz;
