const { Sequelize, Model, DataTypes } = require('sequelize');
const path = require('path');
const sequelize = new Sequelize('mysql:root:123456@localhost:3306/blog');

class Post extends Model {}
Post.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    view: { type: DataTypes.INTEGER, defaultValue: 0 },
    title: DataTypes.STRING,
    excerpt: DataTypes.STRING,
    body: DataTypes.TEXT,
    createTime: DataTypes.DATE
}, { 
    sequelize, 
    modelName: 'posts',
    timestamps: false,
});

module.exports = Post;