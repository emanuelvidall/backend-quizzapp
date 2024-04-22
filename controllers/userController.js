const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Configuring Nodemailer for sending emails (example using Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).send(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // Generate a random password reset token
    const resetToken = jwt.sign({ id: user.id }, 'your-reset-secret', { expiresIn: '20m' });
    await transporter.sendMail({
        to: email,
        subject: 'Password Reset',
        html: `<p>Your password reset link: <a href="https://yourfrontend.com/reset-password/${resetToken}">Reset Password</a></p>`
    });
    res.send('Password reset link sent to your email address.');
};
