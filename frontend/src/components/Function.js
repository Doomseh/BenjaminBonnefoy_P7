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

            }).then(res => res.json())
            .then(res => console.log(res))       
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
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("userId", res.userId);
                    window.location.href = "http://localhost:4800/home"
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

    if (firstname.value === firstname.defaultValue && lastname.value === lastname.defaultValue) {

        alert("Vous n'avez modifier aucune information");

    } else {

        const user = {
            "firstname": firstname.value,
            "lastname": lastname.value
        };

        const myHeaders = new Headers({
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        });

        fetch("http://localhost:3000/api/users/" + userId, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(user)

            }).then(async (response) => {
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

        fetch("http://localhost:3000/api/posts/", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(newpost)

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
}