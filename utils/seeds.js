const User = require('../models/user')

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

module.exports = seedAdmin
