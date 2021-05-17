const Post = require('../models/Posts');

var read = async (ctx, next) => {
    var id = ctx.request.body.id;
    const post = await Post.findByPk(id);
    if ( post ) post.increment( 'view' );
    ctx.response.body = '';
    await next()
}

module.exports = {
    'POST /view': read
}
