/*
 * Log-U!
 *
 * This is a browser side logging library that interfaces with ajax.js to send logs to service.log.
 * It's based on the jQuery client side logging plugin. It's notice is below.
 *
 * Updated to include $.logWarn() as well as other fixes and enhancements.
 *
 * Author: Brad (brad@sumologic.com)
 *
 * The send_log_level order is error, warn, info, and log.  By default we include error, warn and info messages (3).
 * Info is for stats, ux tracking, etc.
 */

/*
 *  Original file header ->>
 *
 *  Title: jQuery Client Side Logging Plugin
 *	Author: Rémy Bach
 *	Version: 1.1.2
 *	License: http://remybach.mit-license.org
 *	Url: http://github.com/remybach/jQuery.clientSideLogging
 *	Description:
 *	This plugin allows you to store front end log/info/error messages on the server (note: you will need to have something set up on your server to handle the actual logging).
 *		The idea was born after reading the following article: http://openmymind.net/2012/4/4/You-Really-Should-Log-Client-Side-Error/
 */

(function ($) {

  // This is a sorry hack since we don't want to reference ourselves if the script is ever reloaded.
  if(window.__logu && window.__logu.log) {
    return;
  }

  window.__logu = this;

  /*===== Run polyfill for console first. =====*/
  // Make sure browsers that don't have console don't completely die.
  if (!window.console) {
    console = {};
  }
  // Make console.* behave like proper Functions in IE.
  if (window.console && typeof console.log == "object") {
    $.each(["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"], function (i, method) {
      console[method] = $.proxy(console[method], console);
    });
  }
  /*===== End polyfill for console. =====*/

  var defaults = {
      error_type: 'ERROR',	// The type string for error
      warn_type: 'WARN',  	// The type string for warn
      info_type: 'INFO',	  // The type string for info
      userAction_type: 'USER', // The type string for info
      telemetryError_type: 'ERROR_CRITICAL_TELEMETRY', // TAGGED log lines of ERROR type
      telemetryWarn_type: 'WARN_CRITICAL_TELEMETRY', // TAGGED log lines of WARN type
      telemetryInfo_type: 'INFO_CRITICAL_TELEMETRY', // TAGGED log lines of INFO type
      telemetryUser_type: 'USER_CRITICAL_TELEMETRY', // TAGGED log lines of USER type
      log_type: 'LOG',		  // The type string for log (debug statements, not sent by default)
      send_log_level: 3,	  // The level at which to log. This allows you to keep the calls to the logging in your code and just change this variable to log varying degrees.
      console_log_level: 3,	// The level at which to log to the browser console.
                            // 1 = only error, 2 = error & warn, 3 = error, warn & info, 4 = error, warn, info & log
      send_fn: null,        // Fn called to actually send the log message
      send_enabled: true,   // Boolean to enable/disable sending, can be turned on and off via $.logSendEnable(t/f)
      session_start_time: 0,// session start time to include in log messages, should be reset with $.logSetSessionStartTime(date)
      native_error: true,		// Whether or not to send native js errors as well (using window.onerror).
      hijack_console: true, // Hijacks the default console functionality (ie: all your console.error/info/log are belong to us).
      client_info: {				// Configuration for what info about the client's browser is logged.
        location: true,			//	The url to the page on which the error occurred.
        screen_size: false,	//	The size of the user's screen (different to the window size because the window might not be maximized)
        user_agent: false,	//	The user agent string.
        window_size: true		//	The window size.
      }
    },
    original_error = console.error,
    original_warn = console.warn,
    original_info = console.info,
    original_log = console.log;

  /**
   * Initializing with custom options. Not strictly necessary, but recommended.
   * @param  options The custom options.
   */
  $.logu = function (options) {
    defaults = $.extend(defaults, options || {});

    // We need to unset these again if they were set the first time.
    if (!defaults.hijack_console) {
      try {
        console.error = original_error;
        console.warn = original_warn;
        console.info = original_info;
        console.log = original_log;
      }
      catch (e) { // FF
        console.error("log-u: " + e);
      }
    } else {
      try {
        console.error = $.logError;
        console.warn = $.logWarn;
        console.info = $.logInfo;
        console.log = $.log;
      }
      catch (e) { // FF
        console.error("log-u: " + e);
      }
    }
  };

  $.logGetConsoleLevel = function() {
    return defaults.console_log_level;
  };

  $.logSetConsoleLevel = function(level) {
    defaults.console_log_level = level;
  };

  $.logGetSendLevel = function() {
    return defaults.send_log_level;
  };

  $.logSetSendLevel = function(level) {
    defaults.send_log_level = level;
  };

  $.isDebugEnabled = function() {
    return (defaults.console_log_level > 3 || defaults.send_log_level > 3);
  };

  $.logSendEnable = function(bEnabled) {
    defaults.send_enabled = bEnabled;
  };

  $.setLoggingSendFn = function (sendFn) {
    defaults.send_fn = sendFn;
  };

  $.logSetSessionStartTime = function(date) {
    defaults.session_start_time = date;
  };

  $.logGetSessionStartTime = function() {
    return defaults.session_start_time;
  };

  /**
   * The function that will send error logs to the server. Also logs to the console using console.error() (if available and requested by the user)
   * @param what What you want to be logged (String, or JSON object)
   */
  $.logError = function (what) {

    if (defaults.send_log_level >= 1) {
      _send(defaults.error_type, arguments);
    }

    $.logErrorLocal.apply(this, arguments);
  };

  /**
   * The function that will send telemetry error logs to the server. Also logs to the console using console.error() (if available and requested by the user)
   * @param what What you want to be logged (String, or JSON object)
   * See https://jira.kumoroku.com/jira/browse/SUMO-50790 for specific lines
   * which should use this function
   */
  $.logTelemetryError = function (what) {
    if (defaults.send_log_level >= 1) {
      _send(defaults.telemetryError_type, arguments);
    }

    $.logErrorLocal.apply(this, arguments);
  };

  /**
   * The local version of the console.error() fn without sending it
   * @param what What you want to be logged (String, or JSON object)
   */
  $.logErrorLocal = function (what) {
    if (defaults.console_log_level >= 1 && defaults.hijack_console && original_error && original_error.apply) {
      arguments[0] = _logAddLocalPrefix(arguments[0], defaults.error_type);
      original_error.apply(console, arguments);
    }
  };

  try {
    console.error = $.logError;
  }
  catch (e) { // FF
    console.error("log-u: " + e);
  }

  /**
   * The function that will send warn logs to the server. Also logs to the console using console.warn() (if available and requested by the user)
   * @param what What you want to be logged (String, or JSON object)
   */
  $.logWarn = function (what) {
    if (defaults.send_log_level >= 2) {
      _send(defaults.warn_type, arguments);
    }

    $.logWarnLocal.apply(this, arguments);
  };

  /**
   * The function that will send telemetry warn logs to the server. Also logs to the console using console.warn() (if available and requested by the user)
   * @param what What you want to be logged (String, or JSON object)
   * See https://jira.kumoroku.com/jira/browse/SUMO-50790 for specific lines
   * which should use this function
   */
  $.logTelemetryWarn = function (what) {
    if (defaults.send_log_level >= 2) {
      _send(defaults.telemetryWarn_type, arguments);
    }

    $.logWarnLocal.apply(this, arguments);
  };

  /**
   * The local version of the console.warn() fn without sending it
   * @param what What you want to be logged (String, or JSON object)
   */
  $.logWarnLocal = function (what) {
    if (defaults.console_log_level >= 2 && defaults.hijack_console && original_warn && original_warn.apply) {

      /*
      var stackTrace = printStackTrace();

      // skip some of the log-u stack
      if(stackTrace && stackTrace.length > 3) {
        stackTrace = stackTrace.slice(3);
      }

      arguments[0] = _logAddLocalPrefix(arguments[0], defaults.warn_type)
        + "\nStack trace:\n" + stackTrace.join('\n');
      */

      original_warn.apply(console, arguments);
    }
  };

  try {
    console.warn = $.logWarn;
  }
  catch (e) { // FF
    console.error("log-u: " + e);
  }

  /**
   * The function that will send info logs to the server. Also logs to the console using console.info() (if available and requested by the user)
   * @param what What you want to be logged (String, or JSON object)
   */
  $.logInfo = function (what) {
    if (defaults.send_log_level >= 3) {
      _send(defaults.info_type, arguments);
    }

    $.logInfoLocal.apply(this, arguments);
  };

  /**
   * The function that will send telemetry info logs to the server. Also logs to the console using console.info() (if available and requested by the user)
   * @param what What you want to be logged (String, or JSON object)
   * See https://jira.kumoroku.com/jira/browse/SUMO-50790 for specific lines
   * which should use this function
   */
  $.logTelemetryInfo = function (what) {
    if (defaults.send_log_level >= 3) {
      _send(defaults.telemetryInfo_type, arguments);
    }

    $.logInfoLocal.apply(this, arguments);
  };

  /**
   * The local version of the console.info() fn without sending it
   * @param what What you want to be logged (String, or JSON object)
   */
  $.logInfoLocal = function (what) {
    if (defaults.console_log_level >= 3 && defaults.hijack_console && original_info && original_info.apply) {
      arguments[0] = _logAddLocalPrefix(arguments[0], defaults.info_type);
      original_info.apply(console, arguments);
    }
  };

  try {
    console.info = $.logInfo;
  }
  catch (e) { // FF
    console.error("log-u: " + e);
  }

  /**
   * The function that will send standard logs to the server. Also logs to the console using console.log() (if available and requested by the user)
   * @param what What you want to be logged (String, or JSON object)
   */
  $.log = function (what) {
    if (defaults.send_log_level >= 4) {
      _send(defaults.log_type, arguments);
    }

    $.logLocal.apply(this, arguments);
  };

  /**
   * The function that will only log to the console using console.log() (if available and requested by the user)
   * @param what What you want to be logged (String, or JSON object)
   */
  $.logLocal = function (what) {
    if (defaults.console_log_level >= 4 && defaults.hijack_console && original_log && original_log.apply) {
      arguments[0] = _logAddLocalPrefix(arguments[0], defaults.log_type);
      original_log.apply(console, arguments);
    }
  };

  try {
    console.log = $.log;
  }
  catch (e) { // FF
    console.error("log-u: " + e);
  }

  /**
   * The function that will send user action logs to the server. Also logs to the console using console.info() (if available and requested by the user)
   * @param what What you want to be logged (String, or JSON object)
   */
  $.logUserAction = function (what) {
    if (defaults.send_log_level >= 2) {
      _send(defaults.info_type, arguments);
    }

    $.logUserActionLocal.apply(this, arguments);
  };

  /**
   * The function that will send user action logs to the server. Also logs to the console using console.info() (if available and requested by the user)
   * @param what What you want to be logged (String, or JSON object)
   */
  $.logUserTelemetryAction = function (what) {
    if (defaults.send_log_level >= 2) {
      _send(defaults.telemetryUser_type, arguments);
    }

    $.logUserActionLocal.apply(this, arguments);
  };

  /**
   * For user actions we'll use the local version of the console.info() fn without sending it over the wire
   * @param what What you want to be logged (String, or JSON object)
   */
  $.logUserActionLocal = function (what) {
    if (defaults.console_log_level >= 3 && defaults.hijack_console && original_info && original_info.apply) {
      arguments[0] = _logAddLocalPrefix(arguments[0], defaults.userAction_type);
      original_info.apply(console, arguments);
    }
  };

  // Log errors whenever there's a generic js error on the page.
  var oldOnError = window.onerror;

  window.onerror = function (message, file, line) {
    if (defaults.native_error) {

      try {
        var errorMsg;
        var errorType = defaults.error_type;

        // is this from a jquery event handler?  then message=event obj, file={errorMessage: msgText}
        if(typeof message == "object" && typeof file == "object") {
          var ev = message;
          var msg = file.errorMessage || "Unable to process onerror parameters :-(";
          var selector = ev.currentTarget ? _getSelectorFromElement(ev.currentTarget) : "";

          errorMsg = "Window error event: " + msg + ", currentTarget: " + selector;
          errorType = ev.currentTarget == window
            ? defaults.error_type // report as an error
            : defaults.info_type; // not a true error here, just event spillover
        }
        else { // standard onError()
          errorMsg = "Browser error: " + message + ", file: " + file + ", line: " + line;
        }

        if(errorType == defaults.error_type && $ && $.logErrorLocal) {
          $.logErrorLocal(errorMsg);
        }
        else if(errorType == defaults.info_type && $ && $.logInfoLocal) {
          $.logInfoLocal(errorMsg);
        }

        if(!_.isEmpty(file) && file != "runtime") {
          _send(errorType, [{ message: errorMsg, error: message, file: file, line: line }]);
        }
      }
      catch(e) {}
    }

    if(oldOnError) {
      var oldRet;
      oldRet = oldOnError(message, file, line);
      return oldRet;
    }
  };

  /*===== Private Functions =====*/

  function _getSelectorFromElement(elem) {
    try {
      var selector = $(elem).parents()
        .map(function() { return this.tagName + (this.id ? "#" + this.id : ""); })
        .get().reverse().join(" ");

      if (selector && $(elem)[0].nodeName) {
        selector += " " + $(elem)[0].nodeName;
      }

      var id = $(elem).attr("id");
      if (id) {
        selector += "#"+ id;
      }

      var classNames = $(elem).attr("class");
      if (classNames) {
        selector += "." + $.trim(classNames).replace(/\s/gi, ".");
      }
    }
    catch(e) {}

    return selector || null;
  }

  function _logAddLocalPrefix(formatString, logLevel) {
    if (formatString) {
      var dateString = _formatDate(new Date());
      var levelString = "[" + logLevel + "]     ";
      levelString = levelString.slice(0, 7);
      formatString = dateString +
        (logLevel && logLevel != defaults.log_type ? " - " + levelString + " " : " - ") +
        formatString;
    }

    return formatString || "";
  }

  function _formatDate(date) {
    var hms = [date.getHours(), date.getMinutes(), date.getSeconds()];
    for(var i = 0; i < 3; i++) {
      hms[i] = _padNumber(hms[i], 2);
    }

    return hms.join(':') + '.' + _padNumber(date.getMilliseconds(), 3);
  }

  function _padNumber(n, length) {
    var result = n.toString();
    while (result.length < length) {
      result = '0' + result;
    }
    return result;
  }

  // NOTE: Using this "simple" sprintf in order to be able to move sprintf to npm.
  function _simpleSprintf(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    var i = 0;
    return format.replace(/(%s|%d)/g, function() {
      return args[i++];
    });
  }

  /**
   * Send the log information to the server.
   * @param logLevel The logLevel string, should be LOG, INFO, WARN, or ERROR.
   * @param logArgs The information to be logged (original arguments to support sprintf style formatting).
   */
  function _send(logLevel, logArgs) {

    if(!defaults.send_enabled) return;

    // avoid an error loop with window.onError() above
    try {
      // wot we got?
      var what = (typeof logArgs === 'string' ? logArgs
        : (logArgs.length ? logArgs[0] : logArgs));

      if(defaults.send_fn && what) {
        // format the message if it's a string
        if(typeof what === 'object') {
          var arg0 = logArgs[0];
          // error?
          if(typeof arg0 === "object" && arg0.message && arg0.name) {
            what = {
              message: _logFormatError(arg0)
            };
          }
          else { // normal object
            what = {
              message: _logFormatObject(arg0)
            };
          }
        }
        else if(typeof what === 'string') {
          what = {
            message: "[message=" + ((typeof logArgs !== "string") ? _simpleSprintf.apply(this, logArgs) : what) + "]"
          };
        }

        // logLevel should be LOG, INFO, WARN, or ERROR
        what.logLevel = logLevel;

        // include the absolute time of the log
        var now = new Date();
        what.info = {
          logTs: (now).getTime(),
          logTime: _logFormatDate(now)
        };

        // include time about the session length wrt the log time
        if(defaults.session_start_time && defaults.session_start_time.getMonth) {
          var msPast = what.info.logTs - defaults.session_start_time.getTime();
          what.info.sessionTime = (SumoUtil ? (msPast + "|" + SumoUtil.formatMillis(msPast, true)) : msPast);
        }
        else { // not logged in yet
          what.info.sessionTime = "-1";
        }

        // the API takes a string for 'info'
        what.info = _logFormatObject($.extend(what.info || {}, _buildClientInfo()));

        defaults.send_fn(what);
      }
      else {
        if($ && $.logLocal) {
          $.logLocal("Unable to send log message due to no sendFn defined: %s", what && what.message ? what.message : what);
        }
      }
    }
    catch(e) {
      if($ && $.logLocal) {
        $.logLocal("log-u _send error: " + e);
      }
    }
  }

  // format an object {a:1, b:"grr"} to "[a=1] [b=grr]" for use in log messages
  $.logFormatObject = function (obj) {
    return _logFormatObject(obj);
  };

  function _logFormatObject(obj) {
    var objMap = _.map(obj, function(value, key, list) {
      if(key === "error" && typeof value === "object" && value.message && value.name) {
        return $.logFormatError(value);
      } else {
        return "[" + key + "=" + value + "]";
      }
    }, this);
    return objMap.join(" ");
  }

  // formats information about an error into a string
  $.logFormatError = function(e) {
    return _logFormatError(e);
  };

  function _logFormatError(e) {
    var trace = printStackTrace({e: e}).join('\n');

    var result = "[errorName=" + e.name + "] [errorMessage=" + e.message + "]";

//    for (var prop in e) {
//      if(prop != "name" && prop != "message" && prop != "stack") {
//        result += " [" + prop + "]";
//      }
//    }

    result += " [stack=" + trace + "]";

    return result;
  }

  // format the passed date or use 'now'.  Format example: 2013-04-04 11:26:41.449 -700
  $.logFormatDate = function(date) {
    return _logFormatDate(date);
  };

  function _logFormatDate(date) {
    date = date || new Date();

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var msecond = date.getMilliseconds();
    var offset = date.getTimezoneOffset();
    var offsetHours = offset / 60 * -1;
    var offsetMinutes = offset % 60;

    return date.getFullYear() + '-' +
      (month < 10 ? '0' : '') + month + '-' +
      (day < 10 ? '0' : '') + day + ' ' +
      (hour < 10 ? '0' :'') + hour + ':' +
      (minute < 10 ? '0' :'') + minute + ':' +
      (second < 10 ? '0' :'') + second + '.' +
      (msecond < 100 ? '0' : msecond < 10 ? '00' :'') + msecond + ' ' +
      (offsetHours + (offsetMinutes < 10 ? "0" + offsetMinutes : offsetMinutes));
  }

  /**
   * Build up an object containing the requested information about the client (as specified in defaults).
   * @return _info The object containing the requested information.
   */
  _buildClientInfo = function () {
    var _info = {};

    if (defaults.client_info.user_agent) {
      _info.userAgent = navigator.userAgent;
    }
    // if (defaults.client_info.window_size) {
    //   _info.windowSize = $(window).width() + 'x' + $(window).height();
    // }
    // if (defaults.client_info.screen_size) {
    //   _info.screenSize = window.screen.availWidth + 'x' + window.screen.availHeight;
    // }
    if (defaults.client_info.location) {
      // Don't include query string parameters due to credential leaking, see SUMO-49464
      _info.location = location.protocol + "//" + location.host + location.pathname + location.hash;
    }

    return _info;
  };

  /*===== Compatibility Functions =====*/
  /**
   * Fallback for older browsers that don't implement JSON.stringify
   * @param obj The JSON object to turn into a string.
   * @return A string representation of the JSON object.
   */
  var JSON;
  if (!JSON) {
    JSON = {};
  }
  JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
      // simple data type
      if (t == "string") obj = '"' + obj + '"';
      return String(obj);
    } else {
      // recurse array or object
      var n, v, json = [], arr = (obj && obj.constructor == Array);
      for (n in obj) {
        v = obj[n];
        t = typeof(v);
        if (t == "string") v = '"' + v + '"';
        else if (t == "object" && v !== null) v = JSON.stringify(v);
        json.push((arr ? "" : '"' + n + '":') + String(v));
      }
      return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
  };
})(jQuery);
