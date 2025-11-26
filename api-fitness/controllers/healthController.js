const HealthMeasure = require('../models/healthModel');

exports.createMeasure = async (req, res) => {
  const { weight, height, date } = req.body;
  if (!weight || !height || !date) return res.status(400).json({ message: 'Todos os campos são obrigatórios' });

  const measure = await HealthMeasure.create({ user: req.user._id, weight, height, date });
  res.status(201).json(measure);
};

exports.getMeasures = async (req, res) => {
  const measures = await HealthMeasure.find({ user: req.user._id });
  res.status(200).json(measures);
};

exports.getMeasureById = async (req, res) => {
  const measure = await HealthMeasure.findById(req.params.id);
  if (!measure) return res.status(404).json({ message: 'Medida não encontrada' });
  res.status(200).json(measure);
};

exports.updateMeasure = async (req, res) => {
  const measure = await HealthMeasure.findById(req.params.id);
  if (!measure) return res.status(404).json({ message: 'Medida não encontrada' });

  measure.weight = req.body.weight ?? measure.weight;
  measure.height = req.body.height ?? measure.height;
  measure.date = req.body.date ?? measure.date;
  await measure.save();

  res.status(200).json(measure);
};

exports.deleteMeasure = async (req, res) => {
  const measure = await HealthMeasure.findById(req.params.id);
  if (!measure) return res.status(404).json({ message: 'Medida não encontrada' });

  await measure.remove();
  res.status(200).json({ message: 'Medida deletada' });
};
