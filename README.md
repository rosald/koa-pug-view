# koa-pug-view

a pug middleware for koa , with it's own built-in cache ability

now supports

- es6 modeule
- object option
- typescript

## Support version

- koa: 2.13.1
- pug: 3.0.2

## Usage

### Installation

npm install koa-pug-view --save

### Example

```javascript
const Koa = require('koa');
const koaPug = require('koa-pug-view');

const app = new Koa();

// The flowing are considered TOTALLY same:
koaPug(app); // default
koaPug(app, 'views', false, 'render'); // using listed arguments
koaPug(app, {
  viewDir: 'views',
  needCache: false,
  methodName: 'render',
}); // using option object

app.use((ctx, next) => {
  ctx.state.firstname = 'John';
  ctx.render('user.pug', { lastname: 'Smith' });
});

app.listen(3003);

// -----options-----

// Using listed arguments:
// koa-pug-view returns a function , and receives 4 arguments
// one required, the left 3 not required

// app -- koa application instance
// required

// viewDir -- where pug files locate in
// it should be directly inside 'Project root directory'
// default to 'views'
// not required

// needCache -- whether enable the cache ability(compiled functions be cached）
// default to false
// not required
// if 'process.env.NODE_ENV' is set to 'production'
// it will ALWAYS be true

// methodName -- the method name add to app.context(the prototype from which ctx is created)
// default to 'render'
// not required

// 2 Using option object
// it can also receive an option object as the 2nd argument
// signature as following, usage is same as above

// {
//   viewDir?: string,
//   needCache?: boolean,
//   methodName?: string,
// }

// the 2nd option objectm will overwrite the other listed arfguments
```

### Directory structure

```
node_modules
views
  user.pug
app.js
```

### File user.pug

```
h1= firstname
p= lastname
```

## Other Projects

here is some other projects may helpful.

note: they are not mime.

[koa-views](https://github.com/queckezz/koa-views): Template rendering middleware for koa@2.

[consolidate.js](https://github.com/tj/consolidate.js): Template engine consolidation library.

## LICENSE

[MIT](https://github.com/rosald/koa-pug-view/blob/master/LICENSE)
