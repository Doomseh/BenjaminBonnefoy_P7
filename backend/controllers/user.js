const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const fs = require('fs');
const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
const User = db.user;
const Comment = db.comments;
const Post = db.post;

// FONCTION SIGN UP
exports.signup = (req, res, next) => {

    // Verification des champs vide
    if (!req.body.email && !req.body.firstname && !req.body.lastname && !req.body.password && !req.body.pseudo) {
        res.status(400).send({
            message: "Veuillez remplir l'ensemble des champs du formulaire"
        });
    }

    User.findOne({
            where: {
                email: req.body.email // recherche de l'utilisateur en fonction de son email
            }
        })
        .then((user) => {
            // si l'utilisateur n'existe pas
            if (!user) {
                if (regexPassword.test(req.body.password)) {
                    bcrypt.hash(password, 10)
                        .then(hash => {

                            // Création du nouvel utilisateur
                            const user = {
                                email: req.body.email,
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                password: hash,
                                imageUrl: "http://localhost:3000/images/user.png",
                                isAdmin: 0,
                                createdAt: new Date()
                            };

                            // Sauvegarde dans la base de données
                            user.save()
                                .then(() => res.status(201).json({
                                    message: 'Utilisateur créé !'
                                }))
                                .catch(error => res.status(400).json({
                                    error
                                }));
                        })
                }
            } else if (user) {
                return res.status(409).json({
                    error: "L'utilisateur existe déjà !"
                })
            }
        })
        .catch(error => res.status(500).json({
            error
        }));
};

// FONCTION LOGIN
exports.login = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email // recherche de l'utilisateur en fonction de son email
            }
        })
        .then(user => {
            if (!user) { // Utilisateur pas erregistré
                return res.status(401).json({
                    error: 'Utilisateur non trouvé !'
                });
            }
            bcrypt.compare(req.body.password, user.password) // comparaison avec le mot de passe crypter en BDD
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect !'
                        });
                    }
                    res.status(200).json({
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign({
                                userId: user.id
                            },
                            'RANDOM_TOKEN_SECRET', {
                                expiresIn: '24h'
                            }
                        )
                    });
                })
                .catch(error => res.status(500).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};

// FONCTION RECUPERER UN UTILISATEUR PAR SON ID
exports.findOneUser = (req, res, next) => {

    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => res.status(404).json({
            error: 'Utilisateur non trouvé !'
        }));
};

// FONCTION SUPPRIMER UN UTILISATEUR
exports.deleteUser = (req, res, next) => {
    Like.destroy({
            where: {
                userId: req.params.id
            }
        })
        .then(() =>
            Comment.destroy({
                where: {
                    userId: req.params.id
                }
            })
            .then(() =>
                Article.findAll({
                    where: {
                        userId: req.params.id
                    }
                })
                .then(
                    (articles) => {
                        articles.forEach(
                            (article) => {
                                Comment.destroy({
                                    where: {
                                        articleId: article.id
                                    }
                                })
                                Like.destroy({
                                    where: {
                                        articleId: article.id
                                    }
                                })
                                Article.destroy({
                                    where: {
                                        id: article.id
                                    }
                                })
                            }
                        )
                    }
                )
                .then(() =>
                    User.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(user => {
                        const filename = user.imageUrl;
                        fs.unlink(`images/${filename}`, () => {
                            User.destroy({
                                    where: {
                                        id: req.params.id
                                    }
                                })
                                .then(() => res.status(200).json({
                                    message: 'Utilisateur supprimé !'
                                }))
                        })
                    })
                )
            )
        )
        .catch(error => res.status(400).json({
            error
        }));
};

// FONCTION POUR MODIFIER UN UTILISATEUR
exports.modifyUser = (req, res, next) => {
    
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    // vérification que tous les champs sont remplis
    if (firstname === null || firstname === '' || lastname === null || lastname === '') {
        return res.status(400).json({
            error: "Tout les champs doivent être remplis !"
        });
    }
    
    const userObject = req.file ? {
        ...req.body.user,
        imageUrl: req.file.filename
    } : {
        ...req.body
    };

    User.update({
            ...userObject,
            id: req.params.id
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({
            message: 'Utilisateur modifié !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};