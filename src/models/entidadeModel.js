const mongoose = require('mongoose');


const EntidadeSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
title: { type: String, required: true, trim: true },
type: { type: String, required: true, trim: true },
durationMinutes: { type: Number, required: true, min: 1 },
caloriesBurned: { type: Number, default: 0, min: 0 },
notes: { type: String },
date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Entidade', EntidadeSchema);