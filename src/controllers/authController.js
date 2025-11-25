const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });


exports.register = async (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


try {
const { name, email, password } = req.body;
let user = await User.findOne({ email });
if (user) return res.status(400).json({ message: 'Email já cadastrado' });


const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);


user = new User({ name, email, password: hashed });
await user.save();


const token = generateToken(user._id);
return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch (err) {
next(err);
}
};


exports.login = async (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });


const matched = await bcrypt.compare(password, user.password);
if (!matched) return res.status(400).json({ message: 'Credenciais inválidas' });


const token = generateToken(user._id);
res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch (err) {
next(err);
}
};