const User = require('../models/user');
const generateToken = require('../utils/token');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ error: 'User already exists' });

        const user = await User.create({ username, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ token });
};

module.exports = { register, login };