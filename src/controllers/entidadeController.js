const Entidade = require('../models/entidadeModel');


exports.create = async (req, res, next) => {
try {
const { title, type, durationMinutes, caloriesBurned, notes, date } = req.body;
const entity = new Entidade({ userId: req.user.id, title, type, durationMinutes, caloriesBurned, notes, date });
await entity.save();
res.status(201).json(entity);
} catch (err) {
next(err);
}
};


exports.list = async (req, res, next) => {
try {
const page = Math.max(1, parseInt(req.query.page) || 1);
const limit = Math.min(100, parseInt(req.query.limit) || 10);
const skip = (page - 1) * limit;
const filter = { userId: req.user.id };
const [total, data] = await Promise.all([
Entidade.countDocuments(filter),
Entidade.find(filter).sort({ date: -1 }).skip(skip).limit(limit)
]);
res.json({ total, page, limit, data });
} catch (err) {
next(err);
}
};


exports.getById = async (req, res, next) => {
try {
const entity = await Entidade.findById(req.params.id);
if (!entity) return res.status(404).json({ message: 'Registro não encontrado' });
if (entity.userId.toString() !== req.user.id && req.user.role !== 'admin') {
return res.status(403).json({ message: 'Não autorizado' });
}
res.json(entity);
} catch (err) {
next(err);
}
};


exports.update = async (req, res, next) => {
try {
const updates = req.body;
const entity = await Entidade.findById(req.params.id);
if (!entity) return res.status(404).json({ message: 'Registro não encontrado' });
if (entity.userId.toString() !== req.user.id && req.user.role !== 'admin') {
return res.status(403).json({ message: 'Não autorizado' });
}
Object.assign(entity, updates);
await entity.save();
res.json(entity);
} catch (err) {
next(err);
}
};


