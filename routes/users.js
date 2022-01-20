const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')

router.post('/',UserController.create)
router.get('/',UserController.getAll)
router.delete('/:id',UserController.delete)
router.put('/:id',UserController.update)

module.exports = router;