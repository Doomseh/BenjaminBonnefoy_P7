const bcrypt = require('bcrypt');
const fs = require('fs');
// Récupération des models et des utils de gestion du TOKEN
const db = require("../models");
const jwtUtils = require('../utils/jwt.utils');
const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;



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
            error: "Veuillez remplir l'ensemble des champs du formulaire"
        });
    }
    // Vérification si l'user existe dans DB en fonction de son email
    db.users.findOne({
            where: {
                email: email
            }
        })
        .then((userFound) => {
            // Si l'utilisateur n'existe pas :
            if (!userFound) {
                // Hash du mot de passe avec bcrypt
                bcrypt.hash(password, 10, (err, hash) => {
                    // Création du nouvel utilisateur
                    const user = new db.users({
                        firstname: firstname,
                        lastname: lastname,
                        imageUrl: "http://localhost:3000/images/user.png",
                        email: email,
                        password: hash
                    })
                    // Sauvegarde dans la base de données
                    user.save()
                        .then(() => res.status(201).json({
                            message: 'Utilisateur créé !',
                            userId: user.id,
                            isAdmin: user.isAdmin,
                            token: jwtUtils.generateTokenForUser(user)
                        }))
                        .catch(error => res.status(400).json({
                            error
                        }));
                })
                // Si l'utilisateur existe :
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

    // Recherche de l'utilisateur en fonction de son email
    db.users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            // Si l'utilisateur n'est pas erregistré :
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé !'
                });
            }
            // Si l'utilisateur est erregistré :
            bcrypt.compare(req.body.password, user.password) // Comparaison des mots de passe crypter
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect !'
                        });
                    }
                    res.status(200).json({
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        token: jwtUtils.generateTokenForUser(user) // Génération d'un TOKEN d'authentification
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

    db.comments.destroy({
            where: {
                userId: req.params.id
            }
        })
        .then(() =>
            db.posts.destroy({
                where: {
                    userId: req.params.id
                }
            })
            .then(() =>
                db.users.findOne({
                    where: {
                        id: req.params.id
                    }
                })
                .then(user => {
                    const filename = user.imageUrl.split('/images/')[1];
                    if (filename != "user.png") {
                        fs.unlink(`images/${filename}`, () => {
                            db.users.destroy({
                                    where: {
                                        id: req.params.id
                                    }
                                })
                                .then(() => res.status(200).json({
                                    message: 'Utilisateur supprimé !'
                                }))
                        });
                    } else {
                        db.users.destroy({
                            where: {
                                id: req.params.id
                            }
                        })
                        .then(() => res.status(200).json({
                            message: 'Utilisateur supprimé !'
                        }))
                    }
                })
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

    // Vérification que tous les champs soient remplis
    if (firstname === null || lastname === null)  {
        return res.status(400).json({
            error: "Tout les champs doivent être remplis !"
        });
    }
    
    const userObject = req.file ? {
        firstname: firstname,
        lastname: lastname,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        firstname: firstname,
        lastname: lastname,
    };
    // Modification avec la méthode update()
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