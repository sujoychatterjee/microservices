(function($) {
  $.escapeHTML = function(s) {
    try { $.log("$.escapeHTML() is deprecated, use $.encoder.encodeForHTML() instead")} catch(e) {}
    if (s == null) {
      return s;
    }
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };
})(jQuery);