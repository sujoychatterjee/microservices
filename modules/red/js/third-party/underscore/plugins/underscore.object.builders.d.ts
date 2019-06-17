//For the rest of the API see: https://github.com/documentcloud/underscore-contrib/blob/master/docs/underscore.object.selectors.js.md
///<reference path="../underscore.d.ts" />

interface UnderscoreStatic {
  setPath(object: any, value:any, paths:string | string[], defaultValue:any): any;
}