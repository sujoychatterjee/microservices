/**
 * jquery.toaster v1.1
 * copyright 2011 Rob Stortelers (Merula Softworks) - www.merulasoft.nl
 * edit - Jay Kim (jay@sumologic.com), 11/1/2011, 4/24/2012
 */
(function($){
  "use strict";
  $.toaster = function(options) {

    var ToastType = {
        info: {
          containerClass: "info-toast",
          iconPath: "images/icons/16/check.png"
        },
        warn: {
          containerClass: "warn-toast",
          iconPath: "images/icons/16/warning.png"
        },
        error: {
          containerClass: "error-toast",
          iconPath: "images/icons/16/error.png"
        },
        notify: {
          containerClass: "notify-toast",
          iconPath: "images/icons/16/info.png"
        }
    };

    var defaults = {
      showTime: 5000, //Time visible in milliseconds
      showTimeForNotify: 10000 //little longer for notifications
    };

    options = $.extend(defaults, options);

    var isQue = false; //is there a que?

    var que = [];

    this.toast = function(text, isHTML, toasterClass)
    {
      LetsToast("info", text, isHTML, toasterClass);
    }

    this.info = function(text, isHTML, toasterClass)
    {
      LetsToast("info", text, isHTML, toasterClass);
    }

    this.warn = function(text, isHTML, toasterClass)
    {
      LetsToast("warn", text, isHTML, toasterClass);
    }

    this.error = function(text, isHTML, toasterClass)
    {
      LetsToast("error", text, isHTML, toasterClass);
    }

    this.notify = function(text, isHTML, toasterClass)
    {
      LetsToast("notify", text, isHTML, toasterClass);
    }

    this.hideAllToasts = function()
    {
      var queueSize = que.length;
      if (queueSize > 0) {
        for (var i = 0; i < queueSize; i++) {
          var item = que[i];
          var toastId = item.id;
          $("#" + toastId).remove();
          clearTimeout(item.timeoutId);
        }

        que = [];
        isQue = false;
      }
    }

    function LetsToast(type, text, isHTML, toasterClass)
    {
      var id = _.uniqueId("toast_");
      que.push({id: id, type: type, text: text, isHTML: isHTML, toasterClass: toasterClass});
      if (!isQue) {
        NextToast();
      }
    }

    function ShowToast(item) //show a toast
    {
      //create container
      var container = $('<div>').appendTo('body');
      container.attr("id", item.id);
      container.addClass('toast-container');

      container.hide();

      var typeName = item.type;
      var type = ToastType[typeName];
      var text = item.text;

      container.addClass(type.containerClass);
      if (item.toasterClass) {
        container.addClass(item.toasterClass);
      }

      // icon
      var iconContainer = $('<div>').appendTo(container);
      iconContainer.addClass('toast-icon-container');

      if(typeName != "notify") {
        var icon = $('<img>').appendTo(iconContainer);
        icon.attr("src", type.iconPath);
        icon.addClass('toast-icon');
      } else {
        var icon = $('<i>').appendTo(iconContainer);
        icon.addClass('fa fa-lg fa-info-circle');
      }
      // text
      var t = $('<div>').appendTo(container);
      if (item.isHTML) {
        t.html(text);
      } else {
        t.text(text);
      }

      t.addClass('toast-text');

      // create close button

      var closeButtonContainer = $('<div>').appendTo(container);
      closeButtonContainer.addClass('toast-close-button-container');

      if(typeName == "notify") {
        var closeButtonIcon = $('<i>').appendTo(closeButtonContainer);
        closeButtonIcon.addClass('fa fa-times');
      } else {
        var closeButtonIcon = $('<img>').appendTo(closeButtonContainer);
        closeButtonIcon.attr("src", "images/icons/16/circle_x_black.png");
        closeButtonIcon.addClass('toast-close-button-icon');
      }


      closeButtonIcon.click(function() {
        HideToast(item.id);
      });

      var showTime = item.type != "notify" ? options.showTime: options.showTimeForNotify;
      container.fadeIn('fast', function() {
        var tId = setTimeout(function() { HideToast(item.id); }, showTime);
        item.timeoutId = tId;
      });

    }

    function HideToast(toastId) //hide current toast
    {
      // remove the container
      $("#" + toastId).remove();

      // remove the toast from the array
      var len = que.length;
      if (len > 0) {
        var idx = -1;
        for (var i = 0; i < len; i++) {
          var item = que[i];
          if (item.id == toastId) {
            idx = i;
            clearTimeout(item.timeoutId);
            break;
          }
        }

        if (idx != -1) {
          var item = que.splice(idx, 1);
        }
      }

      NextToast();
    }

    function NextToast() //show next toast in que
    {
      isQue = que.length > 0;
      if(isQue) {
        ShowToast(que[0]);
      }
    }

    return this;
  };
})(jQuery);