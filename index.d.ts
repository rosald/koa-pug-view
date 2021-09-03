/**
 * The first argument is Koa app instance  
 * Then, You can either  
 * List the other arguments: viewDir needCache methodName  
 * Or just provide an option object contains them  
 * The flowing are considered TOTALLY same:  
 * ```js
 * koaPug(app);
 * koaPug(app, 'views', false, 'render');
 * koaPug(app, { viewDir: 'views', needCache: false, methodName: 'render' });
 * ```
 * @returns void
 */
declare function KoaPug(
  app: any,
  viewDirOrOption?: string | { viewDir?: string; needCache?: boolean; methodName?: string },
  argNeedCache?: boolean,
  argMethodname?: string
): void;

export = KoaPug;
