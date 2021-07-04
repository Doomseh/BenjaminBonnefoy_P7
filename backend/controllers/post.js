const db = require("../models");
const fs = require('fs');
const jwtUtils = require('../utils/jwt.utils');
const Post = db.post;

// FONCTION CREATION D'UN POST
exports.createPost = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    const title = req.body.title;
    const message = req.body.message;

    // vérification que tous les champs sont remplis

    if (title === null || message === null) {

        return res.status(400).json({
            error: "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article"
        });
    }

    db.users.findOne({
            where: {
                id: userId
            }
        })
        .then((userFound) => {

            const post = new db.posts({
                userId: userFound.id,
                title: title,
                message: message,
                //postUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                likes: 0,
            });

            post.save()
                .then(() => res.status(201).json({
                    message: 'Publication créé !'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(404).json({
            error
        }));

}

// FONCTION RECUPERER UN POST
exports.findOnePost = (req, res, next) => {
    db.posts.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => res.status(404).json({
            error
        }));
};

// FONCTION RECUPERER TOUT LES POSTS
exports.findAllPosts = (req, res, next) => {
    db.posts.findAll({
            order: [
                ['createdAt', 'DESC'],
            ]
        })
        .then(posts => {
            res.status(200).json({
                data: posts
            });
        })
        .catch(error => res.status(400).json({
            error
        }));
};

// FONCTION MODIFIER UN ARTICLE

exports.modifyPost = (req, res, next) => {

    const title = req.body.title;
    const message = req.body.message;

    // vérification que tous les champs sont remplis

    if (title === null || message === null) {
        return res.status(400).json({
            error: "Veuillez remplir les champs 'Titre' et 'Contenu' pour créer un article"
        });
    }

    const postObject = req.body;

    db.posts.update({
            ...postObject,
            id: req.params.id
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({
            message: 'Publication modifié !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

// FONCTION SUPPRIMER UN POST

exports.deletePost = (req, res, next) => {
    db.posts.findOne({
            where: {
                id: req.params.id // Utilisation de la méthone findOne() pour trouver le post correspondant au paramètre de la requête
            }
        })
        .then(post => {
           // const filename = post.imageUrl.split('/images/')[1]; // Récupération du fichier image de la sauce
           // fs.unlink(`images/${filename}`, () => { // Suppréssion de l'image
                db.posts.destroy({
                        where: {
                            id: req.params.id // Utilisation de la méthone deleteOne() pour supprimer le post correspondant au paramètre de la requête
                         } 
                    })
                    .then(() => res.status(200).json({
                        message: 'Publication supprimé !'
                    }))
                    .catch(error => res.status(400).json({
                        error: console.log(error)
                    }));
           // });
        })
        .catch(error => res.status(500).json({
            error
        }));
};

// FONCTION LIKE POST
exports.postLike = (req, res, next) => {
    const userId = req.body.userId;
    const likes = req.body.like;
    db.posts.findOne({
            _id: req.params.id
        })
        .then(post => {
            switch (likes) { // Utilisation d'un switch pour les différents cas possible
                case 1: // Ajout du like
                    db.posts.updateOne({
                            _id: req.params.id
                        }, {
                            $push: {
                                userLiked: userId // Ajout du userID au tableau des userLiked
                            },
                            $inc: {
                                likes: +1 // Incrémentation de 1 aux nombres de likes
                            }
                        })

                        .then(() => {
                            post.save();
                            res.status(200).json({
                                message: 'Le post à été apprécié'
                            })
                        })
                        .catch(error => res.status(400).json({
                            error
                        }));
                    break;

                case 0: // Suppression du like
                    if (post.usersLiked.includes(userId)) { // Vérification si l'utilisateur a déjà like le post
                        db.posts.updateOne({
                                _id: req.params.id
                            }, {
                                $pull: {
                                    usersLiked: userId // Suppression de l'userID du tableau des usersLiked
                                },
                                $inc: {
                                    likes: -1 // Décrémentation de 1 du nombres de likes
                                }
                            })
                            .then(() => {
                                post.save();
                                res.status(200).json({
                                    message: 'Like supprimé'
                                })
                            })
                            .catch(error => res.status(400).json({
                                error
                            }));
                    }
                    break;
            }
        })
        .catch(error => res.status(400).json({
            error
        }));
};