
//
// jquery.temporaryClass
//
(function($) {

  // Adds a class temporarily
  function addTempClass(element, classname, timeout) {
      element.addClass(classname);
      setTimeout(function() {
          element.removeClass(classname, timeout);
      });
  }

  $.fn.temporaryClass = function(classname, timeout) {
    return this.each(function() {
      addTempClass($(this), classname, timeout);
    });
  };
})(jQuery);
