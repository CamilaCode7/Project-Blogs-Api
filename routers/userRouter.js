const { Router } = require('express');
const controller = require('../controllers/userController');
const { validaUser, validateUserRegistered } = require('../validations/userValidate');
const validatetoken = require('../auth/token'); 

const router = Router();

router.post('/', validaUser, validateUserRegistered, controller.create);
router.get('/', validatetoken, controller.getAllUser);
router.get('/:id', validatetoken, controller.findById);
router.delete('/me', validatetoken, controller.deleta);

module.exports = router;