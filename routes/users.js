const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')
const { authentication , isAdmin} = require('../middleware/authentication');

router.post('/',UserController.create)
router.get('/',UserController.getAll)
router.delete('/id/:id',authentication , isAdmin, UserController.delete)
router.put('/:id',UserController.update)
router.post('/login',UserController.login)
router.delete('/logout',authentication, UserController.logout)

module.exports = router;