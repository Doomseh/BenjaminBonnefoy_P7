const Sequelize = require("sequelize");
const dbConfig = require('../config/db.config');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});



const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./user.js')(sequelize, Sequelize);
db.articles = require('./post.js')(sequelize, Sequelize);
db.comments = require('./comment.js')(sequelize, Sequelize);

module.exports = db;