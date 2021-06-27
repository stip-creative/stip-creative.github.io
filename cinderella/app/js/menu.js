$(document).ready(function() {
  var btns = $(".mobileMeu li a");
  btns.removeClass('active');

  for (var i = 0; i < btns.length; i++) {
    if (window.location.href.indexOf(btns[i].href) > -1) {
      btns[i].classList.add('active')
    }
  }
});