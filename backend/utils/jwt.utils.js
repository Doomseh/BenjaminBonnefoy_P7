// Gestion du TOKEN d'authentification
const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SIGN_SECRET = process.env.TOKEN;

module.exports = {
    // FONCTION génération d'un TOKEN
    generateTokenForUser: function (userData) {
        return jwt.sign({
                userId: userData.id,
                isAdmin: userData.isAdmin,
                userName: userData.firstname
            },
            JWT_SIGN_SECRET, {
                expiresIn: '24h'
            })
    },
    // FONCTION pour recupérer le TOKEN et retirer le "Bearer"
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    // FONCTION pour récupérer le user ID dans le TOKEN
    getUserId: function (authorization) {
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if (jwtToken != null) {
                userId = jwtToken.userId
            }
        }
        return userId;
    },
    // FONCTION pour récupérer le prénom dans le TOKEN
    getUserName: function (authorization) {
        let userName = -1;
        let token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if (jwtToken != null) {
                userName = jwtToken.userName
            }
        }
        return userName;
    }
}