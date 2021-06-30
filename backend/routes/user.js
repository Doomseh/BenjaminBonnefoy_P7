const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login);


router.get('/:id', auth, userCtrl.findOneUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.delete('/:id', auth, multer, userCtrl.deleteUser);

module.exports = router;