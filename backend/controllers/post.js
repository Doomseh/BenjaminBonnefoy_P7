const fs = require('fs');
const Joi = require('joi');
// Récupération des models et des utils de gestion du TOKEN
const db = require("../models");
const jwtUtils = require('../utils/jwt.utils');
const regexNoScript = /^[-_!?()=+[\]",;.' a-zA-ZÀ-ÿ0-9]+$/

// FONCTION CREATION D'UN POST
exports.createPost = (req, res, next) => {

    // Récupération de l'userId présent dans le TOKEN
    const headerAuth = req.headers['authorization'];
    const user_Id = jwtUtils.getUserId(headerAuth);

    const title = req.body.title;
    const message = req.body.message;

    const postSchema = Joi.object({
        title: Joi.string().min(3).max(50).pattern(regexNoScript).required().messages({'string.pattern.base': "Certains caractères spéciaux ne peuvent pas être utiliser"}),
        message: Joi.string().min(3).max(250).pattern(regexNoScript).required().messages({'string.pattern.base': "Certains caractères spéciaux ne peuvent pas être utiliser"}),
    });

    const result = postSchema.validate({ title: title, message: message })
    // Vérification que tous les champs soient remplis
    if (result.error) {
        const validateError = result.error.details[0].message
        res.status(400).json({ error : validateError })
    } else {
    
        // Recherche de l'utilisateur par son ID
        db.users.findOne({
                where: {
                    id: user_Id
                }
            })
            // Si l'utilisateur est trouvé :
            .then((userFound) => {
                // Creation du nouveau post
                const post = new db.posts({
                    userId: userFound.id,
                    title: title,
                    message: message,
                });
                // Sauvarge du post dans la base de donnée
                post.save()
                    .then((post) => res.status(201).json({
                        postId: post.id,
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
            ],
        })
        .then(posts => {
            res.status(200).json({
                data: posts
            });
        })
        .catch(error => res.status(400).json({
            error: console.log(error)
        }));
};

// FONCTION MODIFIER UN ARTICLE

exports.modifyPost = (req, res, next) => {

    // Récupération de l'userId présent dans le TOKEN
    const headerAuth = req.headers['authorization'];
    const user_Id = jwtUtils.getUserId(headerAuth);
    const isAdmin = jwtUtils.getIsAdmin(headerAuth);

    const title = req.body.title;
    const message = req.body.message;

    const postSchema = Joi.object({
        title: Joi.string().min(3).max(50).pattern(regexNoScript).required().messages({'string.pattern.base': "Certains caractères spéciaux ne peuvent pas être utiliser"}),
        message: Joi.string().min(3).max(250).pattern(regexNoScript).required().messages({'string.pattern.base': "Certains caractères spéciaux ne peuvent pas être utiliser"}),
    });

    const result = postSchema.validate({ title: title, message: message })
    // Vérification que tous les champs soient remplis
    if (result.error) {
        const validateError = result.error.details[0].message
        res.status(400).json({ error : validateError })
    } else {

        const postObject = req.file ? {
            title: title,
            message: message,
            postUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            title: title,
            message: message,
        };

        // Utilisation de la méthone findOne() pour trouver le post correspondant au paramètre de la requête
        db.posts.findOne({
                where: {
                    id: req.params.id 
                }
            })
            .then(post => {

                const updatePost = () => {
                    // Utilisation de la méthone update() pour modifier le post correspondant au paramètre de la requête
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
                }

                // Condition pour vérifier si l'utisateur est celui qui a créé le post ou non
                if (post.userId == user_Id || isAdmin === true) {
                    
                    // Condition pour vérifier si une image est présente
                    if (req.file && post.postUrl) {
                        const filename = post.postUrl.split('/images/')[1]; // Récupération du fichier image
                        fs.unlink(`images/${filename}`, () => { // Suppréssion de l'image
                        updatePost();
                        });
                    } else {
                        updatePost();
                    }

                } else {
                    res.status(401).json({
                        error: 'Invalid user ID!'
                    });
                }
            })
            .catch(error => res.status(500).json({
                error
            }));
    }
};

// FONCTION SUPPRIMER UN POST

exports.deletePost = (req, res, next) => {

    // Récupération de l'userId présent dans le TOKEN
    const headerAuth = req.headers['authorization'];
    const user_Id = jwtUtils.getUserId(headerAuth);
    const isAdmin = jwtUtils.getIsAdmin(headerAuth);

    // Utilisation de la méthone findOne() pour trouver le post correspondant au paramètre de la requête
    db.posts.findOne({
            where: {
                id: req.params.id 
            }
        })
        .then(post => {
            
            const delPost = () => {
                // Utilisation de la méthone deleteOne() pour supprimer le post correspondant au paramètre de la requête
                db.posts.destroy({
                    where: {
                        id: req.params.id 
                    }
                })
                .then(() => 
                db.comments.destroy({
                    where: {
                        postId: req.params.id
                    }
                }))
                .then(() => res.status(200).json({
                    message: 'Publication supprimé !'
                }))
                .catch(error => res.status(400).json({
                    error: console.log(error)
                }));
            }
            // Condition pour vérifier si l'utisateur est celui qui a créé le post ou non
            if (post.userId == user_Id || isAdmin === true) {

                // Condition pour vérifier si une image est présente
                if (post.postUrl) {
                    const filename = post.postUrl.split('/images/')[1]; // Récupération du fichier image
                    fs.unlink(`images/${filename}`, () => { // Suppréssion de l'image
                    delPost();
                    });
                } else {
                    delPost();
                }

            } else {
                res.status(401).json({
                    error: 'Invalid user ID!'
                });
            }})
        
        .catch(error => res.status(500).json({
            error
        }));
};