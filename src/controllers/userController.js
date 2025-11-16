const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET /api/v1/users?page=1&limit=20
exports.getAll = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const users = await User.find().skip(Number(skip)).limit(Number(limit)).select("-password");
  res.status(200).json({ page: Number(page), limit: Number(limit), data: users });
};

// GET /api/v1/users/:id
exports.getById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.status(200).json(user);
};

// POST /api/v1/users (protected)
exports.create = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const exists = await User.findOne({ email: rest.email });
    if (exists) return res.status(400).json({ message: "E-mail já cadastrado" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ ...rest, password: hashed });
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Erro interno", error: err.message });
  }
};

// PUT /api/v1/users/:id (protected)
exports.update = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Falha na atualização", error: err.message });
  }
};

// DELETE /api/v1/users/:id (protected)
exports.delete = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.status(204).send();
};
