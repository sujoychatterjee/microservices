/**************************************************************************************************

  ,;;:;,                                                                                     ,;:;;,
    ;;;;;                                                                                   ;;;;;
   ,:;;:;    ,'=.     _____ _____ _____ _____    __    _____ _____ _____ _____     .=',     ;:;;:,
   ;:;:;' .=" ,'_\   |   __|  |  |     |     |  |  |  |     |   __|     |     |   /_', "=.  ';:;:;
   ':;:;,/  ,__:=@   |__   |  |  | | | |  |  |  |  |__|  |  |  |  |-   -|    -|   @=:__,  \ ,;:;:'
    ';;:;  =./)      |_____|_____|_|_|_|_____|  |_____|_____|_____|_____|_____|      _(\.=  ;:;;'
    `"=\_  )_"`                                                                     `"_(  _/="`
      ``'"`                     DRIVING INTERRUPTS CRAZY SINCE 2010                    `"'``

**************************************************************************************************/

/* Sumo Overrides and Defaults for Qtip 2 */
(function(overridesFn) {
  'use strict';

  if(typeof define === 'function' && define.amd) {
    define(['jquery'], overridesFn);
  } else {
    overridesFn(jQuery);
  }
})(function($) {
  $.fn.qtip.zindex = 999910;
  $.fn.qtip.plugins.modal.zindex = 999910;
});

