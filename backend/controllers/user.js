const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const fs = require('fs');
const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
const Comment = require("../models/comment");


// FONCTION SIGN UP
exports.signup = (req, res, next) => {
    // éléments de la requète
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;


    // vérification que tous les champs sont remplis

    if (firstname === null || lastname === null ||
        email === null || password === null) {
        return res.status(400).json({
            'error': "Veuillez remplir l'ensemble des champs du formulaire"
        });
    }
    // vérification si l'user existe dans DB
    db.users.findOne({
            where: {
                email: email
            }
        })
        .then((userFound) => {
            // si l'utilisateur n'existe pas la DB
            if (!userFound) {
                // Hash du mot de passe avec bcrypt
                bcrypt.hash(password, 10, (err, hash) => {
                    // Création du nouvel utilisateur
                    const user = new db.users({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: hash
                    })
                    // Sauvegarde dans la base de données
                    user.save()
                        .then(() => res.status(201).json({
                            message: 'Utilisateur créé !'
                        }))
                        .catch(error => res.status(400).json({
                            error
                        }));
                })

            } else if (userFound) {
                return res.status(409).json({
                    error: "L'utilisateur existe déjà !"
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        });
};

// FONCTION LOGIN
exports.login = (req, res) => {
    db.users.findOne({
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

    db.users.findOne({
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

  /*  db.comments.destroy({
            where: {
                userId: req.params.id
            }
        })
        .then(() =>
            db.posts.findAll({
                where: {
                    userId: req.params.id
                }
            })
            .then(
                (post) => {
                    post.forEach(
                        (post) => {
                            db.comments.destroy({
                                where: {
                                    postId: post.id
                                }
                            })

                            db.posts.destroy({
                                where: {
                                    id: post.id
                                }
                            })
                        }
                    )
                }
            )
            .then(() => */
                db.users.findOne({
                    where: {
                        id: req.params.id
                    }
                })
                .then(user => {
                    const filename = user.imageUrl;
                    fs.unlink(`images/${filename}`, () => {
                        db.users.destroy({
                                where: {
                                    id: req.params.id
                                }
                            })
                            .then(() => res.status(200).json({
                                message: 'Utilisateur supprimé !'
                            }))
                    })
                })
           // )
       // )

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

    db.users.update({
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