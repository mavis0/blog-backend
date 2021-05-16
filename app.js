const Koa = require('koa');
const controller = require('./controller');

const app = new Koa();

app.use(controller);

app.listen(3000);
console.log('listening on 3000');