const Koa = require('koa');
const koaPug = require('koa-pug-view');

const app = new Koa();
koaPug(app);

app.use((ctx, next) => {
  ctx.state.firstname = 'John';
  ctx.render('user.pug', { lastname: 'Smith' });
});

app.listen(3003);

//-----options-----
//koa-pug-view returns a function , and receives 4 arguments
//one required , the left 3 not required

//app -- koa application
//  required

//viewdir -- where to put pug file
//  it should be directly inside 'Project root directory'
//  default to 'views'
//  not required

//cache -- whether compiled functions be cached
//  default to false
//  not required
//  if 'process.env.NODE_ENV' is set to 'production'
//  it will always be true

//methodname -- the method name add to app.context(the prototype from which ctx is created)
//  default to 'render'
//  not required