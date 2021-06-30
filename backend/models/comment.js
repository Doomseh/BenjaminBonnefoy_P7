module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        commentId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            require: true
        },
        userComment: {
            type: Sequelize.STRING,
            require: true
        },
        message: {
            type: Sequelize.STRING,
            require: true
        },
        createdAt: {
            type: Sequelize.DATE,
        }
    }, {
        timestamps: false
    })

    return Comment;
};