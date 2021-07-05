const express = require('express');
const path = require('path');
const auth = require('./middleware/auth');
// Routes 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const db = require("./models");

const app = express();

// headers pour intéragir avec l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Accéder à notre API depuis n'importe quelle origine 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Envoyer des requêtes avec les méthodes mentionnées 
    next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images'))); // Gestion de l'ajout de photo
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
//DB 

db.sequelize.sync();

module.exports = app;