// FONCTION POUR L'INSCRIPTION
exports.postUser = (setErrorMessage) => {

    // Récupération des données du formulaire
    const signupForm = document.getElementById("signupForm");
    const email = signupForm.email;
    const firstname = signupForm.firstname;
    const lastname = signupForm.lastname;
    const password = signupForm.password;

    // Création de l'objet user pour l'ajouter à la base de donnée
    const newUser = {
        "email": email.value,
        "firstname": firstname.value,
        "lastname": lastname.value,
        "password": password.value
    };

    // Requête fetch POST créer un nouvel utilisateur
    fetch("http://localhost:3000/api/users/signup", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(newUser)

        })
        .then(async (response) => {
            try {
                const res = await response.json();
                // Gestions des erreurs renvoyer par la response pour l'afficher sur l'application
                setErrorMessage(res.error); 
                console.log(res);
                if (response.ok){
                    // Sauvegarde du token et userId dans le localStorage et redirection sur la page Profil
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("userId", res.userId);
                    window.location.href = "http://localhost:4800/profile?id=" + res.userId
                }                   
            } catch (e) {
                    console.log(e)
            }
        });
}

// FONCTION POUR LA CONNEXION
exports.logUser = (setErrorMessage) => {
    
    // Récupération des données du formulaire
    const signupForm = document.getElementById("signupForm");
    const email = signupForm.email;
    const password = signupForm.password;

    // Création de l'objet user pour se connecter à la base de donnée
    const user = {
        "email": email.value,
        "password": password.value
    };

    const myHeaders = new Headers({
        "Accept": "application/json",
        "Content-type": "application/json"
    })

    // Requête fetch POST pour la connexion de l'utilisateur
    fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(user)

    }).then(async (response) => {
        try {
            const res = await response.json();
            // Gestions des erreurs renvoyer par la response pour l'afficher sur l'application
            setErrorMessage(res.error);
            console.log(res);
            if (response.ok) {
                // Sauvegarde du token/userId/isAdmin dans le localStorage et redirection vers la page Home
                localStorage.setItem("token", res.token);
                localStorage.setItem("userId", res.userId);
                localStorage.setItem("isAdmin", res.isAdmin);
                window.location.href = "http://localhost:4800/home"
            } 
        } catch (e) {
            console.log(e)
        }
    });
}

// FONCTION POUR LA MODIFICATION DU PROFIL
exports.modifyUser = (setErrorMessage) => {

    // Récupération des informations dans le localStorage
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    
    // Récupération des données du formulaire
    const profilForm = document.getElementById("profilForm");
    const firstname = profilForm.firstname;
    const lastname = profilForm.lastname;
    const img = document.getElementById("file");
    let file = img.files[0]

    if (firstname.value === firstname.defaultValue && lastname.value === lastname.defaultValue && file === undefined) {

        // Renvoi d'une erreur si aucune information n'a été modifié dans le formulaire
        setErrorMessage("Vous n'avez modifier aucune information !");

    } else {

        // Création de l'objet user pour modifier la base de donnée
        const user = {
            "firstname": firstname.value,
            "lastname": lastname.value,
        };

        const myHeaders = new Headers({
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        });        
        
        // Fonction pour gérer l'ajout de l'image si la requète contient un file
        const uploadImg = () => {
            if (file !== undefined) {
                const formData = new FormData();
                formData.append("image", file);
                formData.append("firstname", firstname.value);
                formData.append("lastname", lastname.value);
                fetch("http://localhost:3000/api/users/" + userId, {
                    method: "PUT",
                    headers: {"Authorization": "Bearer " + token},
                    body: formData
    
                }).then(async (response) => {
                    try {
                        const res = await response.json()
                        console.log(res)
                    } catch (e) {
                        console.log(e)
                    }
                });
            }
        }
       
        // Requête fetch PUT pour modifier les informations de l'utilisateur
        fetch("http://localhost:3000/api/users/" + userId, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(user)

        })
        .then( uploadImg() )
        .then(async (response) => {
            try {
                const res = await response.json();
                // Gestions des erreurs renvoyer par la response pour l'afficher sur l'application
                setErrorMessage(res.error);
                console.log(res);
                if (response.ok) {
                    // Redirection sur la page de Profil si tout s'est bien passé
                    setTimeout(function() {
                        window.location.href = "http://localhost:4800/profile?id=" + userId
                    }, 1000)  
                }
            } catch (e) {
                console.log(e)
            }
        });

    }
}

// FONCTION POUR LA SUPPRESSION DU COMPTE
exports.deleteAccount = (e) => {
    e.preventDefault();

    // Récupération du token et de l'userId présent dans les paramètre de l'url
    const token = localStorage.getItem("token");
    const url = new URL(window.location);
    const userId = url.searchParams.get("id");

    const myHeaders = new Headers({
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
    });

    // Requête fetch DELETE pour supprimer l'utilisateur de la base de donnée
    fetch("http://localhost:3000/api/users/" + userId, {
        method: "DELETE",
        headers: myHeaders,

    }).then(async (response) => {
        try {
            const res = await response.json();
            console.log(res);
            // Appel de la fonction logOut pour se déconnecter
            this.logOut(e);
        } catch (e) {
            console.log(e)
        }
    });
}

// FONCTION POUR LA DECONNEXION
exports.logOut = (e) => {
    e.preventDefault();
    // Suppression des informations du localStorage pour se déconnecter et redirection à la page d'accueil
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "http://localhost:4800"
}

// FONCTION POUR LA CREATION D'UNE PUBLICATION
exports.newPost = (setErrorMessage) => {
    
    // Récupération du token 
    const token = localStorage.getItem("token");
    // Récupération des données du formulaire
    const newpostForm = document.getElementById("newpostForm");
    const title = newpostForm.title;
    const message = newpostForm.message;
    const img = document.getElementById("fileUrl");
    let file = img.files[0]

    // Création de l'objet newpost
    const newpost = {
        "title": title.value,
        "message": message.value
    };

    const myHeaders = new Headers({
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
    });

    // Fonction pour gérer l'ajout de l'image si la requête contient un file
    const uploadImg = (id) => {
        if (file !== undefined) {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("title", title.value);
            formData.append("message", title.message);
            fetch("http://localhost:3000/api/posts/" + id, {
                method: "PUT",
                headers: {"Authorization": "Bearer " + token},
                body: formData
    
            }).then(async (response) => {
                try {
                    const res = await response.json();
                    console.log(res);
                } catch (e) {
                    console.log(e)
                }
            });
        }
    }

    // Requête fetch POST pour la création d'une nouvelle publication dans la base de donnée
    fetch("http://localhost:3000/api/posts/", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(newpost)

    }).then(async (response) => {
        try {
            const res = await response.json();
            // Gestions des erreurs renvoyer par la response pour l'afficher sur l'application
            setErrorMessage(res.error);
            console.log(res.error);
            if (response.ok) {
                // Si il n'y a pas eu d'erreur appel de la fonction pour ajouter l'image si elle est présente
                uploadImg(res.postId);
                try {
                    // Redirection sur la page Home
                    setTimeout(function() {
                        window.location.href = "http://localhost:4800/home"
                    }, 1000) 
                } catch(e) {
                    console.log(e)
                }
            }
                
        } catch (e) {
            console.log(e)
        }
    });
}

// FONCTION POUR LA SUPPRESSION DE LA PUBLICATION
exports.deletePost = (e) => {
    e.preventDefault();
    // Récupération du token et du postId
    const token = localStorage.getItem("token");
    const url = new URL(window.location);
    const postId = url.searchParams.get("id");

    const myHeaders = new Headers({
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
    });

    // Requête fetch DELETE pour supprimer la publication de la base de donnée
    fetch("http://localhost:3000/api/posts/" + postId, {
        method: "DELETE",
        headers: myHeaders,

    }).then(async (response) => {
        try {
            const res = await response.json();
            console.log(res);
            // Redirection sur la page Home
            window.location.href = "http://localhost:4800/home"
        } catch (e) {
            console.log(e)
        }
    });
}

// FONCTION POUR LA MODIFICATION D'UNE PUBLICATION
exports.updatePost = (setErrorMessage) => {
    // Récupération du token et du postId
    const token = localStorage.getItem("token");
    const url = new URL(window.location);
    const postId = url.searchParams.get("id");
    // Récupération des données du formulaire
    const updatePostForm = document.getElementById("updatePostForm");
    const title = updatePostForm.title;
    const message = updatePostForm.message;
    const img = document.getElementById("fileUrl");
    let file = img.files[0]

    if (title.value === title.defaultValue && message.value === message.defaultValue && file === undefined) {

        // Renvoi d'une erreur si aucune information n'a été modifié dans le formulaire
        setErrorMessage("Vous n'avez modifier aucune information");

    } else {
        
        // Création de l'objet updatepost
        const updatepost = {
            "title": title.value,
            "message": message.value
        };

        const myHeaders = new Headers({
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        });

        // Fonction pour gérer l'ajout de l'image si la requête contient un file
        const uploadImg = () => {
            if (file !== undefined) {
                const formData = new FormData();
                formData.append("image", file);
                formData.append("title", title.value);
                formData.append("message", title.message);
                fetch("http://localhost:3000/api/posts/" + postId, {
                    method: "PUT",
                    headers: {"Authorization": "Bearer " + token},
                    body: formData

                }).then(async (response) => {
                    try {
                        const res = await response.json();
                        console.log(res)
                    } catch (e) {
                        console.log(e)
                    }
                });
            }
        }

        // Requête fetch PUT pour modifier la publication
        fetch("http://localhost:3000/api/posts/" + postId, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(updatepost)

        })
        .then(async (response) => {
            try {
                const res = await response.json();
                console.log(res);
                // Gestions des erreurs renvoyer par la response pour l'afficher sur l'application
                setErrorMessage(res.error);
                
                if (response.ok) {
                    // Si il n'y a pas eu d'erreur appel de la fonction pour ajouter l'image si elle à été modifier
                    uploadImg();
                    try {
                        // Redirection sur la page de la publication créé
                        setTimeout(function() {
                            window.location.href = "http://localhost:4800/post?id=" + postId
                        }, 1000) 
                    } catch (e) {
                        console.log(e)
                    }
                }
            } catch (e) {
                console.log(e)
            }
        });
    }
}

// FONCTION POUR AJOUTER UN COMMENTAIRE
exports.newComment = (setErrorMessage) => {
    // Récupération du token et du postId
    const token = localStorage.getItem("token");
    const url = new URL(window.location);
    const postId = url.searchParams.get("id");
    // Récupération des données du formulaire
    const message = document.getElementById("comment").value;

    if (message === "") {

        // Renvoi d'une erreur si aucune information n'a été modifié dans le formulaire
        setErrorMessage("Vous n'avez pas écrit de commentaire");

    } else {

        // Création de l'objet newComment
        const newComment = {
            "message": message,
            "postId": postId
        };

        const myHeaders = new Headers({
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        });

        // Requête fetch POST pour créer un commentaire dans la base de donnée
        fetch("http://localhost:3000/api/comments/", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(newComment)

        }).then(async (response) => {
            try {
                const res = await response.json();
                console.log(res.error);
                // Gestions des erreurs renvoyer par la response pour l'afficher sur l'application
                setErrorMessage(res.error);
                if (response.ok) {
                    // Redirection sur la page de la publication commenté
                    window.location.href = "http://localhost:4800/post?id=" + postId
                }
            } catch (e) {
                console.log(e)
            }
        });
    }
}

// FONCTION POUR MODIFIER UN COMMENTAIRE
exports.updateComment = (id, setErrorUpdateMessage) => {
    // Récupération du token et du postId
    const token = localStorage.getItem("token");
    const url = new URL(window.location);
    const postId = url.searchParams.get("id");
    // Récupération des données du formulaire
    const message = document.getElementById("updateComment");

    if (message.value === message.defaultValue) {

        // Renvoi d'une erreur si aucune information n'a été modifié dans le formulaire
        setErrorUpdateMessage("Vous n'avez pas modifier votre commentaire");

    } else {

        // Création de l'objet updateComment
        const updateComment = {
            "message": message.value
        };

        const myHeaders = new Headers({
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        });

        // Requête fetch PUT pour modifier le commentaire dans la base de donnée
        fetch("http://localhost:3000/api/comments/" + id, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(updateComment)

        }).then(async (response) => {
            try {
                const res = await response.json();
                console.log(res);
                // Gestions des erreurs renvoyer par la response pour l'afficher sur l'application
                setErrorUpdateMessage(res.error);
                if (response.ok) {
                    // Redirection sur la page de la publication commenté
                    window.location.href = "http://localhost:4800/post?id=" + postId
                }
            } catch (e) {
                console.log(e)
            }
        });
    }
}

// FONCTION POUR LA SUPPRESSION DU COMMENTAIRE
exports.deleteComment = (id) => {

    // Récupération du token et du postId
    const token = localStorage.getItem("token");
    const url = new URL(window.location);
    const postId = url.searchParams.get("id");

    const myHeaders = new Headers({
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
    });

    // Requête fetch DELETE pour supprimer le commentaire de la base de donnée 
    fetch("http://localhost:3000/api/comments/" + id, {
        method: "DELETE",
        headers: myHeaders,

    }).then(async (response) => {
        try {
            const res = await response.json();
            console.log(res);
            // Redirection sur la page de la publication
            window.location.href = "http://localhost:4800/post?id=" + postId
        } catch (e) {
            console.log(e)
        }
    });
}

