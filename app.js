const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config/database')
const quizRoutes = require('./routes/quizRoutes')
const userRoutes = require('./routes/userRoutes')
const paintingRoutes = require('./routes/paintingRoutes')
const seedAdmin = require('./utils/seeds')
const userBoard = require('./routes/boardRoutes')

// This project was created under Node v18.20.2

const app = express()
app.use(bodyParser.json())
app.use('/api/quizzes', quizRoutes)
app.use('/api/users', userRoutes)
app.use('/api/paintings', paintingRoutes)
app.use('/api/board', userBoard)

sequelize
  .sync()
  .then(() => {
    console.log('Connected to MySQL and tables created')
    const port = 3010
    seedAdmin()
    app.listen(port, () => console.log(`Listening on port ${port}...`))
  })
  .catch((err) => console.error('Error connecting to MySQL', err))
