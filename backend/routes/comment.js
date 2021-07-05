const express = require('express');
const router = express.Router();
// Récupération du controller comment
const commentCtrl = require('../controllers/comment');

// Déclaration des routes avec le controller
router.get('/', commentCtrl.findAllComments);
router.get('/:id', commentCtrl.findOneComment);
router.post('/', commentCtrl.createComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;