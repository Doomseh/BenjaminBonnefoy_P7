module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            require: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        firstname: {
            type: Sequelize.STRING,
            require: true
        },
        lastname: {
            type: Sequelize.STRING,
            require: true
        },
        password: {
            type: Sequelize.STRING,
            require: true
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        createdAt: {
            type: Sequelize.DATE
        },
    }, {
        timestamps: false
    })

    return User;
};