// Récupération des models et des utils de gestion du TOKEN
const db = require("../models");
const jwtUtils = require("../utils/jwt.utils")

// FONCTION CREER UN COMMENTAIRE
exports.createComment = (req, res, next) => {

    // Récupération de l'userId présent dans le TOKEN
    const headerAuth = req.headers['authorization'];
    const user_Id = jwtUtils.getUserId(headerAuth);
    const user_Name = jwtUtils.getUserName(headerAuth)

    // Création d'un nouveau commentaire
    const comment = new db.comments({
        message: req.body.message,
        userName: user_Name,
        userId: user_Id,
        postId: req.body.postId
    });
    // Sauvegarde du commentaire dans la base de données
    comment.save()
        .then(() => res.status(201).json({
            message: 'Commentaire créé !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
}

// FONCTION SUPRIMMER UN COMMENTAIRE
exports.deleteComment = (req, res, next) => {

    // Récupération de l'userId présent dans le TOKEN
    const headerAuth = req.headers['authorization'];
    const user_Id = jwtUtils.getUserId(headerAuth);

    // Utilisation de la méthone findOne() pour trouver le commentaire correspondant au paramètre de la requête
    db.comments.findOne({
            where: {
                id: req.params.id 
            }
        })
        .then(comment => {
            // Condition pour vérifier si l'utisateur est celui qui a créé le commentaire ou non
            if (comment.userId == user_Id) {
                db.comments.destroy({
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
            } else {
                res.status(401).json({
                    error: 'Invalid user ID!'
                });
            }
        })
        .catch(error => res.status(500).json({
            error
        }));
};

// FONCTION SUPRIMMER UN COMMENTAIRE
exports.modifyComment = (req, res, next) => {

    // Récupération de l'userId présent dans le TOKEN
    const headerAuth = req.headers['authorization'];
    const user_Id = jwtUtils.getUserId(headerAuth);

    // Utilisation de la méthone findOne() pour trouver le commentaire correspondant au paramètre de la requête
    db.comments.findOne({
            where: {
                id: req.params.id 
            }
        })
        .then(comment => {
            // Condition pour vérifier si l'utisateur est celui qui a créé le commentaire ou non
            if (comment.userId == user_Id) {
                db.comments.update({
                        message: req.body.message,
                        id: req.params.id
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(() => res.status(200).json({
                        message: 'Commentaire modifié !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }));
            } else {
                res.status(401).json({
                    error: 'Invalid user ID!'
                });
            }
        })
        .catch(error => res.status(500).json({
            error
        }));
};

// FONCTION RECUPERER UN COMMENTAIRE
exports.findOneComment = (req, res, next) => {
    db.comments.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch(error => res.status(404).json({
            error
        }));
};

// FONCTION RECUPERER TOUT LES COMMENTAIRES
exports.findAllComments = (req, res, next) => {
    db.comments.findAll({
            order: [
                ['createdAt', 'DESC'],
            ],
        })
        .then(comments => {
            res.status(200).json({
                data: comments
            });
        })
        .catch(error => res.status(400).json({
            error
        }));
};

// FONCTION RECUPERER TOUT LES COMMENTAIRES D'UN POST
exports.findPostComments = (req, res, next) => {
    db.comments.findAll({
            order: [
                ['createdAt', 'DESC'],
            ],
            where: {
                postId: req.params.id
            }
        })
        .then(comments => {
            res.status(200).json({
                data: comments
            });
        })
        .catch(error => res.status(400).json({
            error
        }));
};

