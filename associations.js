const User = require('./models/user')
const Quiz = require('./models/quiz')

User.belongsToMany(Quiz, {
  as: 'Favorites',
  through: 'UserFavorites',
  foreignKey: 'userId',
  otherKey: 'quizId',
})
Quiz.belongsToMany(User, {
  as: 'FavoritedBy',
  through: 'UserFavorites',
  foreignKey: 'quizId',
  otherKey: 'userId',
})

User.belongsToMany(Quiz, {
  as: 'AnsweredQuizzes',
  through: 'QuizHistory',
  foreignKey: 'userId',
  otherKey: 'quizId',
})
Quiz.belongsToMany(User, {
  as: 'QuizTakers',
  through: 'QuizHistory',
  foreignKey: 'quizId',
  otherKey: 'userId',
})
