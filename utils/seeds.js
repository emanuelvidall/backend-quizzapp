const User = require('../models/user')
const Board = require('../models/board')

const seedAdmin = async () => {
  try {
    const existingUser = await User.findOne({where: {username: 'admin'}})

    if (!existingUser) {
      await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: 'adminpassword',
        score: 0,
        typeUser: 0,
      })

      console.log('Admin user created successfully')
    } else {
      console.log('Admin user already exists')
    }
  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

const seedBoard = async () => {
  try {
    const existingBoard = await Board.findOne({where: {name: 'General'}})

    if (!existingBoard) {
      await Board.create({
        name: 'General',
      })

      console.log('General board created successfully')
    } else {
      console.log('General board already exists')
    }
  } catch (error) {
    console.error('Error creating general board:', error)
  }
}

;(module.exports = seedAdmin), seedBoard
