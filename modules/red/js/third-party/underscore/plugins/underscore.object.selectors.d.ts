//For the rest of the API see: https://github.com/documentcloud/underscore-contrib/blob/master/docs/underscore.object.selectors.js.md
///<reference path="../underscore.d.ts" />

interface UnderscoreStatic {
  getPath(object: any, paths:string | string[]): any;
  hasPath(object: any, paths:string | string[]): boolean;
}