const Post = require('../models/Posts');

var post = async (ctx, next) => {
    let article = await Post.findOne( { where: { id: ctx.params.id } });
    ctx.response.body = article || 'not find';
    await next();
}
var postAll = async (ctx, next) => {
    let articles = await Post.findAll( {
        attributes: ['id', 'title', 'excerpt', 'view', 'createTime'],
        order: [['createTime', 'DESC']]
    });
    ctx.response.body = articles || 'not find';
    await next();
}

module.exports = {
    'GET /posts': postAll,
    'GET /post/:id': post
}