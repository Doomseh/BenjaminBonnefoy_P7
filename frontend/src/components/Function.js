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
                    console.log(res.token)
                    window.location.href = "http://localhost:4800/home"
                } catch (e) {
                    console.log(e)
                }
            });
    }
}

exports.logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "http://localhost:4800"
}