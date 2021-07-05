const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupération du token et fonction split pour recupérer uniquement le token sans "Bearer"
        const decodedToken = jwt.verify(token, process.env.TOKEN); 
        const user_Id = decodedToken.userId; // Récupération de l'ID utilisateur du token
        if (parseInt(req.params.id) !== user_Id) { // Comparaison de l'ID utilisateur à celui récupérer du token
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: 'Invalid request!'
        });
    }
};