const express = require('express');
const router = express.Router();
const entidadeCtrl = require('../../controllers/entidadeController');
const { protect } = require('../../middleware/authMiddleware');
const validator = require('../validators/entidadeValidator');
const { validationResult } = require('express-validator');


const runValidation = (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
next();
};


router.get('/', protect, entidadeCtrl.list);
router.get('/:id', protect, validator.idParam, runValidation, entidadeCtrl.getById);
router.post('/', protect, validator.createRules, runValidation, entidadeCtrl.create);
router.patch('/:id', protect, validator.idParam, runValidation, entidadeCtrl.update);
router.delete('/:id', protect, validator.idParam, runValidation, entidadeCtrl.remove);


module.exports = router;