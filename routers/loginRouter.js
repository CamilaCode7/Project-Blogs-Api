const { Router } = require('express');
const controller = require('../controllers/userController');
const loginValidate = require('../validations/loginValidate');

const router = Router();

router.post('/', loginValidate, controller.login);

module.exports = router;