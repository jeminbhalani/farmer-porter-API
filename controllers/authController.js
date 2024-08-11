const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findUserByEmail(email);

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.createUser({ name, email, password });
        const token = generateToken(user.id);

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findUserByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user.id);

            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    register,
    login
};
