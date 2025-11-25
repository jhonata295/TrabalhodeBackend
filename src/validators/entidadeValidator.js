const { body, param } = require('express-validator');


exports.createRules = [
body('title').isString().trim().notEmpty().withMessage('title é obrigatório'),
body('type').isString().trim().notEmpty().withMessage('type é obrigatório'),
body('durationMinutes').isInt({ min: 1 }).withMessage('durationMinutes deve ser inteiro >= 1'),
body('caloriesBurned').optional().isFloat({ min: 0 }).withMessage('caloriesBurned deve ser >= 0'),
body('date').optional().isISO8601().toDate().withMessage('date inválida')
];


exports.idParam = [ param('id').isMongoId().withMessage('id inválido') ];