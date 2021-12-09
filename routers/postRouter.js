const { Router } = require('express');
const controller = require('../controllers/postControlles');
const {
  validatePost,
  validateExistCategories,
  validatePostUpdate } = require('../validations/postValidate');
const validateToken = require('../auth/token');

const router = Router();

router.post('/', validateToken, validatePost, validateExistCategories, controller.create);
router.get('/', validateToken, controller.getAllPost);
router.get('/:id', validateToken, controller.findByIdPost);
router.put('/:id', validateToken, validatePostUpdate, controller.update);
router.delete('/:id', validateToken, controller.deleta);

module.exports = router;