const express = require('express');
const router = express.Router();
const { createMeasure, getMeasures, getMeasureById, updateMeasure, deleteMeasure } = require('../controllers/healthController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createMeasure);
router.get('/', authMiddleware, getMeasures);
router.get('/:id', authMiddleware, getMeasureById);
router.put('/:id', authMiddleware, updateMeasure);
router.delete('/:id', authMiddleware, deleteMeasure);

module.exports = router;
