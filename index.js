const pug = require('pug');
const path = require('path');

function koaPug(app, viewDirOrOption = 'views', argNeedCache = false, argMethodname = 'render') {
  let viewDir = 'views';
  let needCache = false;
  let methodName = 'render';

  needCache = argNeedCache;
  methodName = argMethodname;

  if (Object.prototype.toString.call(viewDirOrOption) === '[Object Object]') {
    const {
      viewDir: optionViewDir,
      needCache: optionNeedCache,
      methodName: optionMethodName,
    } = viewDirOrOption;
    if (optionViewDir !== undefined) {
      viewDir = optionViewDir;
    }
    if (optionNeedCache !== undefined) {
      needCache = optionNeedCache;
    }
    if (optionMethodName !== undefined) {
      methodName = optionMethodName;
    }
  } else if (typeof viewDirOrOption === 'string') {
    viewDir = viewDirOrOption;
  }

  if (!app) {
    throw new Error('app is required');
  }

  if (app.context[methodName]) {
    console.log(`there is already methodName: ${methodName} on app.context, function just return`);
    return;
  }

  if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    needCache = true;
  }
  if (!needCache) {
    app.context[methodName] = function (template, obj) {
      this.body = pug.renderFile(
        path.join(__dirname, '..', '..', viewDir, template),
        Object.assign({}, this.state, obj)
      );
    };
    return;
  }

  koaPug._cache_ = {};

  app.context[methodName] = function (template, obj) {
    if (!koaPug._cache_[template]) {
      koaPug._cache_[template] = pug.compileFile(
        path.join(__dirname, '..', '..', viewDir, template)
      );
    }
    this.body = koaPug._cache_[template](Object.assign({}, this.state, obj));
  };
}

module.exports = koaPug;
