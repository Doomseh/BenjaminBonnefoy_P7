// FONCTION POUR L'INSCRIPTION
exports.postUser = (e) => {
    e.preventDefault();
    const signupForm = document.getElementById("signupForm");
    const email = signupForm.email;
    const firstname = signupForm.firstname;
    const lastname = signupForm.lastname;
    const password = signupForm.password;


    if (email.value === "" && firstname.value === "" && lastname.value === "" && password.value === "") {

        alert("Tout les champs ne sont pas remplis");

    } else {
        const newUser = {
            "email": email.value,
            "firstname": firstname.value,
            "lastname": lastname.value,
            "password": password.value
        };

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
                    const res = await response.json()
                    console.log(res)
                    if (response.ok){
                        localStorage.setItem("token", res.token);
                        localStorage.setItem("userId", res.userId);
                        window.location.href = "http://localhost:4800/profile?id=" + res.userId
                    }
                    
                } catch (e) {
                    console.log(e)
                }
            });
    }
}

// FONCTION POUR LA CONNEXION
exports.logUser = (e) => {
    e.preventDefault();
    const signupForm = document.getElementById("signupForm");
    const email = signupForm.email;
    const password = signupForm.password;

    if (email.value === "" && password.value === "") {

        alert("Tout les champs ne sont pas remplis");

    } else {

        const user = {
            "email": email.value,
            "password": password.value
        };

        const myHeaders = new Headers({
            "Accept": "application/json",
            "Content-type": "application/json"
        })

        fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(user)

        }).then(async (response) => {
            try {
                const res = await response.json()
                if (res.error) {
                    alert(res.error)
                } else {
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
}

// FONCTION POUR LA MODIFICATION DU PROFIL
exports.modifyUser = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const profilForm = document.getElementById("profilForm");
    const firstname = profilForm.firstname;
    const lastname = profilForm.lastname;
    const img = document.getElementById("file");
    let file = img.files[0]
    console.log(file)

    if (firstname.value === firstname.defaultValue && lastname.value === lastname.defaultValue && file === undefined) {

        alert("Vous n'avez modifier aucune information");

    } else {

        const user = {
            "firstname": firstname.value,
            "lastname": lastname.value,
        };

        const myHeaders = new Headers({
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        });        
        
        const uploadImg = () => {
            if (file !== undefined) {
                const formData = new FormData();
                formData.append("image", file)
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
       

        fetch("http://localhost:3000/api/users/" + userId, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(user)

        })
        .then( uploadImg() )
        .then(async (response) => {
            try {
                const res = await response.json()
                console.log(res)
                window.location.href = "http://localhost:4800/profile?id=" + userId
            } catch (e) {
                console.log(e)
            }
        });

    }
}

// FONCTION POUR LA SUPPRESSION DU COMPTE
exports.deleteAccount = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = new URL(window.location);
    const userId = url.searchParams.get("id");

    const myHeaders = new Headers({
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
    });

    fetch("http://localhost:3000/api/users/" + userId, {
        method: "DELETE",
        headers: myHeaders,

    }).then(async (response) => {
        try {
            const res = await response.json()
            console.log(res)
            this.logOut(e);
        } catch (e) {
            console.log(e)
        }
    });
}

// FONCTION POUR LA DECONNEXION
exports.logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "http://localhost:4800"
}

// FONCTION POUR LA CREATION D'UNE PUBLICATION
exports.newPost = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newpostForm = document.getElementById("newpostForm");
    const title = newpostForm.title;
    const message = newpostForm.message;
    const img = document.getElementById("fileUrl");
    let file = img.files[0]
    console.log(file)

    if (title.value === "" || message.value === "") {

        alert("Tout les champs ne sont pas remplis");

    } else {

        const newpost = {
            "title": title.value,
            "message": message.value
        };

        const myHeaders = new Headers({
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        });

        const uploadImg = (id) => {
            if (file !== undefined) {
                const formData = new FormData();
                formData.append("image", file)
                fetch("http://localhost:3000/api/posts/" + id, {
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

        fetch("http://localhost:3000/api/posts/", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(newpost)

        }).then(async (response) => {
            try {
                const res = await response.json()
                console.log(res)
                uploadImg(res.postId)
                try {
                    window.location.href = "http://localhost:4800/home"
                } catch (e) {
                    console.log(e)
                }
            } catch (e) {
                console.log(e)
            }
        });

    }
}

// FONCTION POUR AJOUTER UN COMMENTAIRE
exports.newComment = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = new URL(window.location);
    const postId = url.searchParams.get("id");
    const message = document.getElementById("comment").value;
    console.log(postId)


    if (message === "") {

        alert("Vous n'avez pas écrit de commentaire");

    } else {

        const newComment = {
            "message": message,
            "postId": postId
        };

        const myHeaders = new Headers({
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        });

        fetch("http://localhost:3000/api/comments/", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(newComment)

        }).then(async (response) => {
            try {
                const res = await response.json()
                console.log(res)
                window.location.href = "http://localhost:4800/post?id=" + postId
            } catch (e) {
                console.log(e)
            }
        });
    }
}
// FONCTION POUR MODIFIER UN COMMENTAIRE
exports.updateComment = (id) => {
    const token = localStorage.getItem("token");
    const url = new URL(window.location);
    const postId = url.searchParams.get("id");
    const message = document.getElementById("updateComment");

    if (message.value === message.defaultValue) {

        alert("Vous n'avez pas modifier votre commentaire");

    } else {

        const updateComment = {
            "message": message.value
        };

        const myHeaders = new Headers({
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        });

        fetch("http://localhost:3000/api/comments/" + id, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(updateComment)

        }).then(async (response) => {
            try {
                const res = await response.json()
                console.log(res)
                window.location.href = "http://localhost:4800/post?id=" + postId
            } catch (e) {
                console.log(e)
            }
        });
    }
}

// FONCTION POUR LA SUPPRESSION DU COMMENTAIRE
exports.deleteComment = (id) => {

    const token = localStorage.getItem("token");
    const url = new URL(window.location);
    const postId = url.searchParams.get("id");

    const myHeaders = new Headers({
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
    });

    fetch("http://localhost:3000/api/comments/" + id, {
        method: "DELETE",
        headers: myHeaders,

    }).then(async (response) => {
        try {
            const res = await response.json()
            console.log(res)
            window.location.href = "http://localhost:4800/post?id=" + postId
        } catch (e) {
            console.log(e)
        }
    });
}

// FONCTION POUR LA SUPPRESSION DE LA PUBLICATION
exports.deletePost = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = new URL(window.location);
    const postId = url.searchParams.get("id");

    const myHeaders = new Headers({
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
    });

    fetch("http://localhost:3000/api/posts/" + postId, {
        method: "DELETE",
        headers: myHeaders,

    }).then(async (response) => {
        try {
            const res = await response.json()
            console.log(res)
            window.location.href = "http://localhost:4800/home"
        } catch (e) {
            console.log(e)
        }
    });
}

// FONCTION POUR LA MODIFICATION D'UNE PUBLICATION
exports.updatePost = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = new URL(window.location);
    const urlId = url.searchParams.get("id");
    const updatePostForm = document.getElementById("updatePostForm");
    
    const title = updatePostForm.title;
    const message = updatePostForm.message;
    const img = document.getElementById("fileUrl");
    let file = img.files[0]

    if (title.value === title.defaultValue && message.value === message.defaultValue && file === undefined) {

        alert("Vous n'avez modifier aucune information");

    } else {
        
        const updatepost = {
            "title": title.value,
            "message": message.value
        };

        const myHeaders = new Headers({
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        });

        const uploadImg = () => {
            if (file !== undefined) {
                const formData = new FormData();
                formData.append("image", file)
                fetch("http://localhost:3000/api/posts/" + urlId, {
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

        fetch("http://localhost:3000/api/posts/" + urlId, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(updatepost)

        }).then( uploadImg() )
        .then(async (response) => {
            try {
                const res = await response.json()
                console.log(res)
                window.location.href = "http://localhost:4800/post?id=" + urlId
            } catch (e) {
                console.log(e)
            }
        });
    }
}