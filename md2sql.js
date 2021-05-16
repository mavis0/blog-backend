const { Sequelize, Model, DataTypes } = require('sequelize');
const fs = require('fs');
const marked = require('marked');
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

let root = './网站md';

(async () => {
    await sequelize.sync();
    fs.readdirSync(root).forEach(async (item) => {
        if (item.endsWith('.md')) {
            const data = fs.readFileSync(path.join(root, item), 'utf-8');
            let stats = fs.statSync(path.join(root, item));
            await Post.create({
                title: item,
                excerpt: marked(data).replace(/<[^>]+>/g, "").slice(0, 100),
                body: data,
                createTime: stats.mtime
            });
            console.log(item, ' done!')
        }
    })
})();