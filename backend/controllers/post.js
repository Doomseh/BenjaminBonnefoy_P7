const db = require("../models");
const fs = require('fs');
const Post = db.post;

// FONCTION CREATION D'UN POST
exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    // vérification que tous les champs sont remplis

    if (title === null || title === '' || content === null || content === '') {

        return res.status(400).json({
            error: "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article"
        });
    }

    const postObject = req.body;

    // Création d'un nouvel objet article
    const post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        createdAt: Date.now()
    });
    // Enregistrement de l'objet post dans la base de données
    post.save()
        .then(() => res.status(201).json({
            message: 'Publication créé !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
}

// FONCTION RECUPERER UN POST
exports.findOnePost = (req, res, next) => {
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(post => {
            console.log(post);
            res.status(200).json(post)
        })
        .catch(error => res.status(404).json({
            error
        }));
};

// FONCTION RECUPERER TOUT LES POSTS
exports.findAllPosts = (req, res, next) => {
    Post.findAll({
            order: [
                ['createdAt', 'DESC'],
            ]
        })
        .then(posts => {
            console.log(posts);
            res.status(200).json({
                data: articles
            });
        })
        .catch(error => res.status(400).json({
            error
        }));
};

// FONCTION MODIFIER UN ARTICLE

exports.modifyPost = (req, res, next) => {

    const title = req.body.title;
    const content = req.body.content;

    // vérification que tous les champs sont remplis

    if (title === null || title === '' || content === null || content === '') {
        return res.status(400).json({
            error: "Veuillez remplir les champs 'Titre' et 'Contenu' pour créer un article"
        });
    }

    const postObject = req.body;

    Post.update({
            ...postObject,
            id: req.params.id
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({
            message: 'Post modifié !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

// FONCTION SUPPRIMER UN ARTICLE

exports.deletePost = (req, res, next) => {
    Post.findOne({
            _id: req.params.id // Utilisation de la méthone findOne() pour trouver la sauce correspondant au paramètre de la requête
        })
        .then(post=> {
            const filename = post.imageUrl.split('/images/')[1]; // Récupération du fichier image de la sauce
            fs.unlink(`images/${filename}`, () => { // Suppréssion de l'image
                Post.deleteOne({
                        _id: req.params.id // Utilisation de la méthone deleteOne() pour supprimer la sauce correspondant au paramètre de la requête
                    })
                    .then(() => res.status(200).json({
                        message: 'Post supprimé !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }));
            });
        })
        .catch(error => res.status(500).json({
            error
        }));
};