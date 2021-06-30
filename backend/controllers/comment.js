const db = require("../models");
const Comment = db.comment;

// FONCTION CREER UN COMMENTAIRE
exports.createComment = (req, res, next) => {

    // Création d'un nouvel objet commentaire
    const commentObject = req.body;
    // Création d'un nouvel objet commentaire
    const comment = new Comment({
        ...commentObject,
        createdAt: new Date()
    });
    // Enregistrement de l'objet commentaire dans la base de données
    comment.save()
        .then(() => {
            Comment.findAll({
                    where: {
                        postId: req.body.postId
                    }
                })
                .then((comments) => {
                    res.status(200).json(comments);
                })
        })
        .catch(error => res.status(400).json({
            error
        }));
}

// FONCTION SUPRIMMER UN COMMENTAIRE
exports.deleteComment = (req, res, next) => {
    Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({
            message: 'Commentaire supprimé !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

// FONCTION RECUPERER UN COMMENTAIRE
exports.findOneComment = (req, res, next) => {
    Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(comment => {
            console.log(comment);
            res.status(200).json(comment)
        })
        .catch(error => res.status(404).json({
            error
        }));
};

// FONCTION RECUPERER TOUT LES COMMENTAIRES
exports.findAllComments = (req, res, next) => {
    Comment.findAll({
            where: {
                postId: req.params.id
            }
        })
        .then(comments => {
            console.log(comments);
            res.status(200).json({
                data: comments
            });
        })
        .catch(error => res.status(400).json({
            error
        }));
};