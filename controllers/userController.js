const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ValidationError = require('sequelize').ValidationError;

exports.register = async (req, res) => {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).send(user);
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isValid = await user.validPassword(password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// exports.resetPassword = async (req, res) => {
//     const { email } = req.body;
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//         return res.status(404).json({ message: "User not found" });
//     }
//     const resetToken = jwt.sign({ id: user.id }, 'your-reset-secret', { expiresIn: '20m' });
//     await transporter.sendMail({
//         to: email,
//         subject: 'Password Reset',
//         html: `<p>Your password reset link: <a href="https://frontend.com/reset-password/${resetToken}">Reset Password</a></p>`
//     });
//     res.send('Password reset link sent to your email address.');
// };


exports.addFavorite = async (req, res) => {
    const { userId, quizId } = req.body;
    try {
        const user = await User.findByPk(userId);
        const quiz = await Quiz.findByPk(quizId);
        await user.addFavorite(quiz);
        res.json({ message: 'Added to favorites!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.recordQuizCompletion = async (req, res) => {
    const { userId, quizId } = req.body;
    try {
        const user = await User.findByPk(userId);
        const quiz = await Quiz.findByPk(quizId);
        await user.addAnsweredQuiz(quiz);
        res.json({ message: 'Quiz recorded as completed!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
