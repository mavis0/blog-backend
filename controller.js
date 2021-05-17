const fs = require('fs');
const router = require('koa-router')();

var files = fs.readdirSync(__dirname + '/controllers');

for (let f of files.filter(f => f.endsWith('.js'))) {
    let routers = require(__dirname + '/controllers/' + f);
    for (let r in routers) {
        if (r.startsWith('GET')) {
            router.get('/backend' + r.slice(4), routers[r]);
        } else if (r.startsWith('POST')) {
            router.post('/backend' + r.slice(5), routers[r]);
        }
    }
}

module.exports = router.routes();