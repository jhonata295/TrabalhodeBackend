const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { createUserSchema, updateUserSchema } = require("../validations/userValidation");

// leitura pública paginada e leitura por id (requer auth for details? we'll require auth for all writes)
router.get("/", auth, userController.getAll);
router.get("/:id", auth, userController.getById);

// rotas de escrita protegidas
router.post("/", auth, validate(createUserSchema), userController.create);
router.put("/:id", auth, validate(updateUserSchema), userController.update);
router.patch("/:id", auth, validate(updateUserSchema), userController.update);
router.delete("/:id", auth, userController.delete);

module.exports = router;
