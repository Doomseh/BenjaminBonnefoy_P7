module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        postId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            require: true
        },
        userPostId: {
            type: Sequelize.STRING,
            require: true
        },
        userNamePost: {
            type: Sequelize.STRING,
            require: true
        },
        title: {
            type: Sequelize.STRING,
            require: true
        },
        imagePostUrl: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING,
            require: true
        },
        like: {
            type: Sequelize.STRING,
            require: true
        },
        createdAt: {
            type: Sequelize.DATE,
        }
    }, {
        timestamps: false
    })

    return Post;
};