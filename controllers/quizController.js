const Quiz = require('../models/quiz')
const Question = require('../models/question')
const User = require('../models/user')
const Option = require('../models/option')

exports.getQuizByPainting = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      where: {paintingId: req.params.paintingId},
      include: [
        {
          model: Question,
          as: 'questions',
          include: [
            {
              model: Option,
              as: 'options',
            },
          ],
        },
      ],
    })

    const response = quizzes.map((quiz) => ({
      paintingId: quiz.paintingId,
      title: quiz.title,
      questions: quiz.questions.map((question) => ({
        text: question.text,
        options: question.options.map((option) => ({
          id: option.id,
          answer: option.answer,
          is_correct: option.is_correct,
        })),
      })),
    }))

    res.json(response)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

exports.createQuiz = async (req, res) => {
  const {paintingId} = req.params
  const {title, questions} = req.body
  try {
    const quiz = await Quiz.create({paintingId, title})

    const createdQuestions = []

    for (const question of questions) {
      const createdQuestion = await Question.create({
        text: question.text,
        quizId: quiz.id,
      })

      const options = question.options.map((option) => ({
        ...option,
        questionId: createdQuestion.id,
      }))

      const createdOptions = await Option.bulkCreate(options, {
        returning: true,
      })

      createdQuestions.push({
        ...createdQuestion.toJSON(),
        options: createdOptions,
      })
    }

    res.status(201).json({
      paintingId: quiz.paintingId,
      title: quiz.title,
      questions: createdQuestions,
    })
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
          attributes: ['id', 'is_correct'],
        },
      ],
    })

    if (!quiz) {
      throw new Error('Quiz not found')
    }

    let score = 0

    for (const answer of answers) {
      const question = quiz.questions.find((q) => q.id === answer.questionId)
      if (question && question.is_correct === answer.selectedOption) {
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

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.quizId, {include: 'questions'})
    res.json(quiz)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
