const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Todos os campos são obrigatórios' });

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Usuário já existe' });

  const user = await User.create({ name, email, password });
  res.status(201).json({ id: user._id, name: user.name, email: user.email });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Credenciais inválidas' });

  res.status(200).json({ token: generateToken(user._id) });
};

exports.getMe = async (req, res) => {
  res.status(200).json({ id: req.user._id, name: req.user.name, email: req.user.email });
};

exports.updateMe = async (req, res) => {
  if (req.body.name) req.user.name = req.body.name;
  await req.user.save();
  res.status(200).json({ id: req.user._id, name: req.user.name, email: req.user.email });
};

exports.deleteMe = async (req, res) => {
  await req.user.remove();
  res.status(200).json({ message: 'Usuário deletado' });
};
