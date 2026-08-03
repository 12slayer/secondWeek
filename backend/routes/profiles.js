const express = require('express');
const router = express.Router();
const controller = require('../controllers/profilesController');
const upload = require('../middleware/upload');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', upload.single('avatar'), controller.create);
router.put('/:id', upload.single('avatar'), controller.update);
router.patch('/:id/favorite', controller.toggleFavorite);
router.delete('/:id', controller.remove);

module.exports = router;