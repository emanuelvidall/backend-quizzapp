const sequelize = require('../config/database')
const Painting = require('./painting')
const Quiz = require('./quiz')
const Question = require('./question')
const Option = require('./option')

// Define associations here
Painting.hasOne(Quiz, {foreignKey: 'paintingId', as: 'quiz'})
Quiz.belongsTo(Painting, {foreignKey: 'paintingId', as: 'painting'})
Quiz.hasMany(Question, {foreignKey: 'quizId', as: 'questions'})
Question.belongsTo(Quiz, {foreignKey: 'quizId', as: 'quiz'})
Question.hasMany(Option, {foreignKey: 'questionId', as: 'options'})
Option.belongsTo(Question, {foreignKey: 'questionId', as: 'question'})

module.exports = {
  sequelize,
  Painting,
  Quiz,
  Question,
  Option,
}
