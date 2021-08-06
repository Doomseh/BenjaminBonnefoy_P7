const bcrypt = require('bcrypt');
const fs = require('fs');
const Joi = require('joi');
// Récupération des models et des utils de gestion du TOKEN
const db = require("../models");
const jwtUtils = require('../utils/jwt.utils');
const regexNoScript = /^[-_' a-zA-ZÀ-ÿ]+$/;
const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;

// FONCTION SIGN UP
exports.signup = (req, res, next) => {
    // éléments de la requète
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    const userSchema = Joi.object({
        email: Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] }}).required(),
        firstname: Joi.string().pattern(regexNoScript).min(3).max(30).required().messages({'string.pattern.base': "Certains caractères spéciaux ne peuvent pas être utiliser"}),
        lastname: Joi.string().pattern(regexNoScript).min(3).max(30).required().messages({'string.pattern.base': "Certains caractères spéciaux ne peuvent pas être utiliser"}),
        password: Joi.string().pattern(regexPassword).required().messages({'string.pattern.base': 'Votre mot de passe doit comprendre entre 8 et 15 caractères et contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'})
    });

    // vérification que tous les champs sont remplis
    const result = userSchema.validate({ email: email, firstname: firstname, lastname: lastname, password: password})
    
    if (result.error) {
        const validateError = result.error.details[0].message
        res.status(400).json({ error : validateError })
    } else {
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
    }
};

// FONCTION LOGIN
exports.login = (req, res) => {

    const userSchema = Joi.object({
        email: Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] }}).required(),
        password: Joi.string().required()
    });

    const result = userSchema.validate({ email: req.body.email, password: req.body.password})
    
    if (result.error) {
        const validateError = result.error.details[0].message
        res.status(400).json({ error : validateError })
    } else {
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
    }
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
            db.posts.findAll({
                where: {
                    userId: req.params.id
                }
            })
            .then((posts) => {
                
                for (let i = 0; i < posts.length; i++) {
                    if (posts[i].postUrl != null) {
                        const filename = posts[i].postUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            db.posts.destroy({
                                    where: {
                                        id: posts[i].id
                                    }
                                })   
                        });
                    } else {
                        db.posts.destroy({
                            where: {
                                id: posts[i].id
                            }
                        })
                    }
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
                    // Condition pour ne pas supprimer l'image "user.png"
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

    const userSchema = Joi.object({
        
        firstname: Joi.string().pattern(regexNoScript).min(3).max(30).required().messages({'string.pattern.base': "Certains caractères spéciaux ne peuvent pas être utiliser"}),
        lastname: Joi.string().pattern(regexNoScript).min(3).max(30).required().messages({'string.pattern.base': "Certains caractères spéciaux ne peuvent pas être utiliser"}),
        
    });
    
    const userObject = req.file ? {
        firstname: firstname,
        lastname: lastname,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        firstname: firstname,
        lastname: lastname,
    };

    // Vérification que tous les champs soient remplis et valide
    const result = userSchema.validate({ firstname: firstname, lastname: lastname})
    
    if (result.error) {
        const validateError = result.error.details[0].message
        res.status(400).json({ error : validateError })
    } else {

        db.users.findOne({
            where: {
                id: req.params.id 
            }
        }).then(user => {

            const updateUser = () => {
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
            }
            
            const filename = user.imageUrl.split('/images/')[1]; // Récupération du fichier image

            // Condition pour ne pas supprimer l'image "user.png"
            if (req.file && filename != "user.png") {
                fs.unlink(`images/${filename}`, () => { // Suppréssion de l'image
                    updateUser();
                });
            } else {
                updateUser();
            }
        })
        .catch(error => res.status(500).json({
            error
        }));
    }
    
};