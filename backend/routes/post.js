const express = require('express');
const router = express.Router();

// Récupération du controller post et du middleware
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

// Déclaration des routes avec le controller
router.get('/', postCtrl.findAllPosts);
router.post('/', multer, postCtrl.createPost);
router.get('/:id', postCtrl.findOnePost);
router.put('/:id', multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;