const pug = require('pug');
const path = require('path');

function koaPug(app, viewdir = 'views', cache = false, methodname = 'render') {
  if (app.context[methodname]) {
    return;
  }
  if (!app) {
    throw new Error('app is required');
  }
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    cache = true;
  }

  if (!cache) {
    app.context[methodname] = function (template, obj) {
      this.body = pug.renderFile(path.join(__dirname, '..', '..', viewdir, template), Object.assign({}, this.state, obj));
    }
    return;
  }

  koaPug.cache = {};

  app.context[methodname] = function (template, obj) {
    if (!koaPug.cache[template]) {
      koaPug.cache[template] = pug.compileFile(path.join(__dirname, '..', '..', viewdir, template));
    }
    this.body = koaPug.cache[template](Object.assign({}, this.state, obj));
  }

}

module.exports = koaPug;
