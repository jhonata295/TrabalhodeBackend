const HealthMeasure = require('../models/healthModel');

exports.createMeasure = async (req, res) => {
  try {
    const { weight, height, date } = req.body;

    if (!weight || !height || !date) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const measure = await HealthMeasure.create({
      user: req.user._id,
      weight,
      height,
      date
    });

    res.status(201).json(measure);

  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar medida', error: error.message });
  }
};

exports.getMeasures = async (req, res) => {
  try {
    const measures = await HealthMeasure.find({ user: req.user._id });
    res.status(200).json(measures);

  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar medidas', error: error.message });
  }
};

exports.getMeasureById = async (req, res) => {
  try {
    const measure = await HealthMeasure.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!measure) {
      return res.status(404).json({ message: 'Medida não encontrada' });
    }

    res.status(200).json(measure);

  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar medida', error: error.message });
  }
};

exports.updateMeasure = async (req, res) => {
  try {
    const measure = await HealthMeasure.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!measure) {
      return res.status(404).json({ message: 'Medida não encontrada' });
    }

    res.status(200).json(measure);

  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar medida', error: error.message });
  }
};

exports.deleteMeasure = async (req, res) => {
  try {
    const measure = await HealthMeasure.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!measure) {
      return res.status(404).json({ message: 'Medida não encontrada' });
    }

    await measure.deleteOne();

    res.status(200).json({ message: 'Medida deletada com sucesso' });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar medida', error: error.message });
  }
};
