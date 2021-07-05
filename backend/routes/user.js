const express = require('express');
const router = express.Router();

// Récupération du controller user
const userCtrl = require('../controllers/user');

// Récupération des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Déclaration des routes avec le controller
router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login);

router.get('/:id', userCtrl.findOneUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.delete('/:id', auth, multer, userCtrl.deleteUser);

module.exports = router;