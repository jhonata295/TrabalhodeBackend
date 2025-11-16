const router = require("express").Router();
const { registerSchema, loginSchema } = require("../validations/authValidation");
const validate = require("../middleware/validate");
const authController = require("../controllers/authController");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
