
declare namespace IEncoder { /* tslint:disable-line */
  export interface IJQueryEncode {
    encodeForHTML(input: string): string;
    encodeForHTMLAttribute(input: string, omitAttributeName: boolean);
    encodeForCSS(input: string, omitPropertyName: boolean);
    encodeForURL(input: string);
    encodeForJavascript(inpur: string);
    canonicalize(input: string, strict: boolean);
  }
}
interface JQueryStatic {
  encoder: IEncoder.IJQueryEncode;
}
