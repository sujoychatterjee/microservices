interface JQueryToaster {
  warn(text: string, isHTML?:boolean, toasterClass?:string): void;
  info(text: string, isHTML?:boolean, toasterClass?:string): void;
  error(text: string, isHTML?:boolean, toasterClass?:string): void;
  notifiy(text: string, isHTML?:boolean, toasterClass?:string): void;
  toast(text: string, isHTML?:boolean, toasterClass?:string): void;
}

interface JQueryStatic {
  toaster(options?: any): JQueryToaster;
}