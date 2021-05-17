const Koa = require('koa');
const controller = require('./controller');
const bodyParser = require('koa-bodyparser')

const app = new Koa();

app.use(bodyParser());
app.use(controller);
app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  });

app.listen(3000);
console.log('listening on 3000');