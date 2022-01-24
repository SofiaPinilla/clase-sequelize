const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { authentication } = require('../middleware/authentication');

router.post('/',authentication, PostController.create)
router.get('/',PostController.getAll)
router.get('/:id',PostController.getById)
router.get('/title/:title',PostController.getOneByName)
router.delete('/:id',authentication,PostController.delete)

module.exports = router;