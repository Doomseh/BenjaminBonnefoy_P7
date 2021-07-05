const Sequelize = require("sequelize");
const dbConfig = require('../config/db.config');

// Connexion avec la base de donnée
const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});


const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Déclaration des chemins vers les models 
db.users = require('./user.js')(sequelize, Sequelize);
db.posts = require('./post.js')(sequelize, Sequelize);
db.comments = require('./comment.js')(sequelize, Sequelize);

module.exports = db;