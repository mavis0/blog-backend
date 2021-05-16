const Post = require('../models/Posts');

var index = async (ctx, next) => {
    let newest = await Post.findAll( {
        attributes: ['id', 'title', 'excerpt', 'createTime'],
        limit: 8,
        order: [['createTime', 'DESC']]
    });
    ctx.response.body = newest;
    await next();
}

module.exports = {
    'GET /': index
}