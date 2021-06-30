const express = require('express');

const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

// Routes
router.get('/', auth, commentCtrl.findAllComments);
router.get('/:id', auth, commentCtrl.findOneComment);
router.post('/', auth, commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;