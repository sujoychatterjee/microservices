(function() {
  'use strict';

  var noMatch = /.^/;
  var templateSettings = {
    evaluate          : /<%([\s\S]+?)%>/g,
    interpolate       : /<%dangerousUnescapedHTML=([\s\S]+?)%>/g,
    escape            : /<%=([\s\S]+?)%>/g,
    escapeFixNull     : /<%%=([\s\S]+?)%>/g,
    attrEscapeFixNull : /<%%attr=([\s\S]+?)%>/g,
    attrEscape        : /<%attr=([\s\S]+?)%>/g,
    booleanAttr       : /<%(checked|disabled|selected|readonly)=([\s\S]+?)%>/g,
    jsEscape          : /<%js=([\s\S]+?)%>/g,
    jsEscapeFixNull   : /<%%js=([\s\S]+?)%>/g,
    cssEscape          : /<%css=([\s\S]+?)%>/g,
    cssEscapeFixNull   : /<%%css=([\s\S]+?)%>/g
  };

  _.templateSettings = templateSettings;

  _.mixin({
    escape: function(string) { // Escape a string for HTML interpolation.
      return $.encoder.encodeForHTML(''+string);
    },
    escapeFixNull: function(string) {
      return _.escape(string ? string : '');
    },

    escapeAttr: function(string) {
      return $.encoder.encodeForHTMLAttribute(''+string);
    },

    escapeAttrFixNull: function(string) {
      return _.escapeAttr(string ? string : "");
    },

    escapeJS: function(string) {
      return $.encoder.encodeForJavascript(''+string);
    },

    escapeJSFixNull: function(string) {
      return _.escapeJS(string ? string : "");
    },

    escapeCss: function(styleProperties) {
      if (!_.isObject(styleProperties)) {
        $.logErrorLocal('The <%css= %> expression expects an object with the style properties and values.');
        return '';
      }

      var result = '';
      for (var propName in styleProperties) {
        if (styleProperties.hasOwnProperty(propName)) {
          try {
            result += $.encoder.encodeForCSS(propName, styleProperties[propName]) + ';';
          } catch (error) {
            $.logError('underscore-overrides: escapeCss', error);
          }
        }
      }
      return result;
    },

    escapeCssFixNull: function(styleProperties) {
      return _.escapeCss(styleProperties || {});
    },

    unescape: function(code) {
      return code.replace(/\\\\/g, '\\').replace(/\\'/g, "'");
    },

    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    template : function(str, data) {
      var c  = templateSettings;
      var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
          'with(obj||{}){__p.push(\'' +
          str.replace(/\\/g, '\\\\')
              .replace(/'/g, "\\'")
              .replace(c.escape || noMatch, function(match, code) {
                return "',_.escape(" + _.unescape(code) + "),'";
              })
              .replace(c.escapeFixNull || noMatch, function(match, code) {
                return "',_.escapeFixNull(" + _.unescape(code) + "),'";
              })
              .replace(c.attrEscape || noMatch, function(match, code) {
                return "',_.escapeAttr(" + _.unescape(code) + "),'";
              })
              .replace(c.attrEscapeFixNull || noMatch, function(match, code) {
                return "',_.escapeAttrFixNull(" + _.unescape(code) + "),'";
              })
              .replace(c.booleanAttr || noMatch, function(match, booleanProp, condition) {
                return "'," + _.unescape(condition) + "? '" + booleanProp + "' : '','";
              })
              .replace(c.jsEscape || noMatch, function(match, code) {
                return "',_.escapeJS(" + _.unescape(code) + "),'";
              })
              .replace(c.jsEscapeFixNull || noMatch, function(match, code) {
                return "',_.escapeJSFixNull(" + _.unescape(code) + "),'";
              })
              .replace(c.cssEscape || noMatch, function(match, code) {
                return "',_.escapeCss(" + _.unescape(code) + "),'";
              })
              .replace(c.cssEscapeFixNull || noMatch, function(match, code) {
                return "',_.escapeCssFixNull(" + _.unescape(code) + "),'";
              })
              .replace(c.interpolate || noMatch, function(match, code) {
                return "'," + _.unescape(code) + ",'";
              })
              .replace(c.interpolate2 || noMatch, function(match, code) { // TODO: remove
                return "'," + _.unescape(code) + ",'";
              })
              .replace(c.evaluate || noMatch, function(match, code) {
                return "');" + _.unescape(code).replace(/[\r\n\t]/g, ' ') + ";__p.push('";
              })
              .replace(/\r/g, '\\r')
              .replace(/\n/g, '\\n')
              .replace(/\t/g, '\\t') +
              "');}return __p.join('');";

      var func = new Function('obj', '_', tmpl);
      if (data) {
        return func(data, _);
      } else {
        return function(data) {
          return func.call(this, data, _);
        };
      }
    },
    isBlank: function(str) {
      return _.isUndefined(str) || _.isNull(str) || (_.isString(str) && _.isEmpty($.trim(str)));
    },
    cloneDeep: function(obj) {
      return angular.copy(obj);
    }
  });

})();


