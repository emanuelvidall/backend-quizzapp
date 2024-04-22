const Quiz = require('../models/quiz')
const Question = require('../models/question')

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
      // Map through the returned instances to extract their IDs
      questions: newQuestions.map((question) => question.id),
    })

    res.status(201).json(quiz)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}
