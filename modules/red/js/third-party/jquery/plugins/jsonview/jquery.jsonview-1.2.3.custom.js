
/*!
 jQuery JSONView.
 Licensed under the MIT License.
 https://github.com/yesmeck/jquery-jsonview

 this is a hacked version but no comments were added to mark the changes,
 and the changes are numerous ;)
 */
(function(jQuery) {
  var $, Collapser, JSONFormatter, JSONView;
  JSONFormatter = (function() {
    function JSONFormatter(options) {
      if (options == null) {
        options = {};
      }
      this.options = options;
    }

    JSONFormatter.prototype.htmlEncode = function(html) {
      if (html !== null) {
        return html.toString().replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      } else {
        return '';
      }
    };

    JSONFormatter.prototype.jsString = function(s) {
      s = JSON.stringify(s).slice(1, -1);
      return this.htmlEncode(s);
    };

    JSONFormatter.prototype.decorateWithSpan = function(value, className) {
      return "<span class=\"" + className + "\">" + (this.htmlEncode(value)) + "</span>";
    };

    JSONFormatter.prototype.valueToHTML = function(value, level, replacementMap) {
      var valueType;
      if (level == null) {
        level = 0;
      }
      valueType = Object.prototype.toString.call(value).match(/\s(.+)]/)[1].toLowerCase();
      return this["" + valueType + "ToHTML"].call(this, value, level, replacementMap);
    };

    JSONFormatter.prototype.nullToHTML = function(value) {
      return this.decorateWithSpan('null', 'null');
    };

    JSONFormatter.prototype.numberToHTML = function(value) {
      return this.decorateWithSpan(value, 'num');
    };

    JSONFormatter.prototype.stringToHTML = function(value, level, replacementMap) {
      var multilineClass, newLinePattern;
      multilineClass = '';
      value = this.jsString(value);
      if (this.options.nl2br) {
        newLinePattern = /([^>\\r\\n]?)(\\r\\n|\\n\\r|\\r|\\n)/g;
        if (newLinePattern.test(value)) {
          multilineClass = ' multiline';
          value = (value + '').replace(newLinePattern, '$1' + '<br />');
        }
      }
      for(var replace in replacementMap){
        var replaceRegex = new RegExp(replace, 'g');
        value = value.replace(replaceRegex, replacementMap[replace]);
      }
      return "<span class=\"string" + multilineClass + "\">\"" + value + "\"</span>";
    };

    JSONFormatter.prototype.booleanToHTML = function(value) {
      return this.decorateWithSpan(value, 'bool');
    };

    JSONFormatter.prototype.arrayToHTML = function(array, level, replacementMap) {
      var collapsible, hasContents, index, numProps, output, value, _i, _len;
      if (level == null) {
        level = 0;
      }
      hasContents = false;
      output = '';
      numProps = array.length;
      for (index = _i = 0, _len = array.length; _i < _len; index = ++_i) {
        value = array[index];
        hasContents = true;
        output += '<li class="object-in-array" data-index=' + index + '>' + this.valueToHTML(value, level + 1, replacementMap);
        if (numProps > 1) {
          output += '<span class="comma-sep">,</span>';
        }
        output += '</li>';
        numProps--;
      }
      if (hasContents) {
        collapsible = level === 0 ? '' : ' collapsible';
        return "[<ul class=\"array level" + level + collapsible + "\">" + output + "</ul>]";
      } else {
        return '[ ]';
      }
    };

    JSONFormatter.prototype.objectToHTML = function(object, level, replacementMap) {
      var collapsible, hasContents, numProps, output, prop, value;
      if (level == null) {
        level = 0;
      }
      hasContents = false;
      output = '';
      numProps = 0;
      for (prop in object) {
        numProps++;
      }
      for (prop in object) {
        value = object[prop];
        hasContents = true;
        output += "<li class=\"obj-container\"><span class=\"prop\"><span class=\"q\">\"</span>" + "<span class=\"key\">" + (this.jsString(prop)) + "</span>" + "<span class=\"q\">\"</span></span>:<span class=\"qval\">" + (this.valueToHTML(value, level + 1, replacementMap) + "</span>");
        if (numProps > 1) {
          output += '<span class="comma-sep">,</span>';
        }
        output += '</li>';
        numProps--;
      }
      if (hasContents) {
        collapsible = level === 0 ? '' : ' collapsible';
        return "{<ul class=\"obj level" + level + collapsible + "\">" + output + "</ul>}";
      } else {
        return '{ }';
      }
    };

    JSONFormatter.prototype.jsonToHTML = function(json, replacementMap) {
      return "<div class=\"jsonview\">" + (this.valueToHTML(json, 0, replacementMap)) + "</div>";
    };

    return JSONFormatter;

  })();
  (typeof module !== "undefined" && module !== null) && (module.exports = JSONFormatter);
  Collapser = (function() {
    function Collapser() {}

    Collapser.bindEvent = function(item, options) {
      var collapser;
      collapser = document.createElement('div');
      collapser.className = 'collapser';
      collapser.innerHTML = options.collapsed ? options.expand_html : options.collapse_html;
      collapser.addEventListener('click', (function(_this) {
        return function(event) {
          return _this.toggle(event.target, options);
        };
      })(this));
      item.insertBefore(collapser, item.firstChild);
      if (options.collapsed) {
        return this.collapse(collapser, options);
      }
    };

    Collapser.expand = function(collapser, options) {
      var ellipsis, target;
      target = this.collapseTarget(collapser);
      if (target.style.display === '') {
        return;
      }
      ellipsis = target.parentNode.getElementsByClassName('ellipsis')[0];
      target.parentNode.removeChild(ellipsis);
      target.style.display = '';
      $(collapser).data("expanded", true);
      return collapser.innerHTML = options.collapse_html;
    };

    Collapser.collapse = function(collapser, options) {
      var ellipsis, target;
      target = this.collapseTarget(collapser);
      if (target.style.display === 'none') {
        return;
      }
      target.style.display = 'none';
      ellipsis = document.createElement('span');
      ellipsis.className = 'ellipsis';
      ellipsis.innerHTML = ' &hellip; ';
      target.parentNode.insertBefore(ellipsis, target);
      $(collapser).data("expanded", false);
      return collapser.innerHTML = options.expand_html;
    };

    Collapser.toggle = function(collapser, options) {
      var action, collapsers, target, _i, _len, _results;
      if (options == null) {
        options = $(collapser).parents(".jsonview").data("options");
      }
      target = this.collapseTarget(collapser);
      action = target.style.display === 'none' ? 'expand' : 'collapse';
      if (options.recursive_collapser) {
        collapsers = collapser.parentNode.getElementsByClassName('collapser');
        _results = [];
        for (_i = 0, _len = collapsers.length; _i < _len; _i++) {
          collapser = collapsers[_i];
          _results.push(this[action](collapser, options));
        }
        return _results;
      } else {
        return this[action](collapser, options);
      }
    };

    Collapser.collapseTarget = function(collapser) {
      var target, targets;
      targets = collapser.parentNode.getElementsByClassName('collapsible');
      if (!targets.length) {
        return;
      }
      return target = targets[0];
    };

    return Collapser;

  })();
  $ = jQuery;
  JSONView = {
    collapse: function(el) {
      var options = $(el).parents(".jsonview").data("options");
      if ($(el).data("expanded") !== false) {
        return Collapser.collapse(el, options);
      }
    },
    expand: function(el) {
      var options = $(el).parents(".jsonview").data("options");
      if ($(el).data("expanded") !== true) {
        return Collapser.expand(el, options);
      }
    },
    toggle: function(el) {
      return Collapser.toggle(el);
    },
    highlight: function(el, words, hiClassName) {
      try {
        // Escape the term if it contains any special character as they can interfear with the jsonview -
        // - Regex creation.
        // Eg [abc] will be used as /[abc]/g where ']' and '[' are special characters used in regex.
        var escapedWords = words.map(function(word) {
          return word.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        });
        var rgxp = new RegExp(escapedWords.join('|'), 'g');
      } catch(e) {
        return;
      }
      //var outer = $(el).parents(".jsonview");
      var findElements = '';
      words.forEach(function(word) {
        findElements += (findElements ? ',' : '');
        findElements += "span.prop:contains('" + word + "'), span.string:contains('" + word + "'), span.bool:contains('"
          + word + "'), span.null:contains('" + word + "'), span.num:contains('" + word + "')";
      });
      $(el).find(findElements).each(function() {
        $(this).html($(this).html().replace(rgxp, function(match) {
          return '<span class="'+ hiClassName + '">' + match + '</span>';
        }));
      });
    }
  };
  return $.fn.JSONView = function() {
    var args, defaultOptions, formatter, json, method, options, outputDoc;
    args = arguments;
    if (JSONView[args[0]] != null) {
      method = args[0];
      return this.each(function() {
        var $this, level;
        $this = $(this);
        if(method === "highlight") {
          return JSONView[method](this, args[1], args[2]);
        }
        else if (args[1] != null) {
          level = args[1];
          return $this.find(".jsonview .collapsible.level" + level).siblings('.collapser').each(function() {
            return JSONView[method](this);
          });
        } else {
          return $this.find('.jsonview > ul > li .collapsible').siblings('.collapser').each(function() {
            return JSONView[method](this);
          });
        }
      });
    } else {
      json = args[0];
      options = args[1] || {};
      defaultOptions = {
        collapsed: false,
        nl2br: false,
        recursive_collapser: false,
        expand_html: '+',
        collapse_html: '-',
        replacementMap: {}
      };
      options = $.extend(defaultOptions, options);
      formatter = new JSONFormatter({
        nl2br: options.nl2br
      });
      if (Object.prototype.toString.call(json) === '[object String]') {
        json = JSON.parse(json);
      }
      outputDoc = formatter.jsonToHTML(json, options.replacementMap);
      return this.each(function() {
        var $this, item, items, _i, _len, _results;
        $this = $(this);
        $this.html(outputDoc);
        $this.find(".jsonview").data("options", options);
        items = $this[0].getElementsByClassName('collapsible');
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (item.parentNode.nodeName === 'LI' || item.parentNode.className === 'qval') {
            _results.push(Collapser.bindEvent(item.parentNode, options));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    }
  };
})(jQuery);
