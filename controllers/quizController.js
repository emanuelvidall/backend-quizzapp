const Quiz = require('../models/quiz')
const Question = require('../models/question')
const User = require('../models/user')

exports.getQuizByPainting = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({paintingId: req.params.paintingId}).populate(
      'questions',
    )
    res.json(quiz)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

exports.createQuiz = async (req, res) => {
  const {paintingId, title, questions} = req.body
  try {
    const newQuestions = await Question.bulkCreate(questions, {
      returning: true,
    })

    const quiz = await Quiz.create({
      paintingId,
      title,
      questions: newQuestions.map((question) => question.id),
    })

    res.status(201).json(quiz)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

exports.calculateQuizScore = async (userId, quizId, answers) => {
  try {
    const quiz = await Quiz.findOne({
      where: {id: quizId},
      include: [
        {
          model: Question,
          as: 'questions',
          attributes: ['id', 'isCorrect'],
        },
      ],
    })

    if (!quiz) {
      throw new Error('Quiz not found')
    }

    let score = 0

    for (const answer of answers) {
      const question = quiz.questions.find((q) => q.id === answer.questionId)
      if (question && question.isCorrect === answer.selectedOption) {
        score += 1
      }
    }

    const user = await User.findByPk(userId)
    if (user) {
      user.score += score
      await user.save()
    }

    return score
  } catch (error) {
    console.error('Error calculating quiz score:', error)
    throw error
  }
}
