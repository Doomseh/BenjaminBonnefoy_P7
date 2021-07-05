const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

// Routes
router.get('/', postCtrl.findAllPosts);
router.post('/', multer, postCtrl.createPost);
router.get('/:id', postCtrl.findOnePost);
router.put('/:id', multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;