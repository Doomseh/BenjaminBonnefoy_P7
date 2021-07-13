module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userName: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      message: {
        allowNull: false,
        type: DataTypes.TEXT
      }
    });
    return Comment;
  };