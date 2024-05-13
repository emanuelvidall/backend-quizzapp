const User = require('../models/user')

const seedAdmin = async () => {
  try {
    // await User.sync({force: true})

    await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpassword',
      score: 0,
      typeUser: 0,
    })

    console.log('Admin user created successfully')
  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

module.exports = seedAdmin
