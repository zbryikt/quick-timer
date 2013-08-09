var isRun, toggle, isLight, blink, handler, count, start, run, resize;
isRun = 0;
toggle = function(){
  isRun = 1 - isRun;
  if (!isRun && handler) {
    clearInterval(handler);
  }
  if (isRun) {
    return run();
  }
};
isLight = 0;
blink = function(){
  isLight = 1 - isLight;
  return $('#timer').css('color', isLight ? '#fff' : '#f00');
};
handler = null;
count = function(){
  var tm, diff;
  tm = $('#timer');
  diff = start.getTime() - new Date().getTime() + 3000;
  if (diff < 0 && isLight === 0) {
    isLight = 1;
    diff = 0;
    clearInterval(handler);
    handler = setInterval(function(){
      return blink();
    }, 500);
  }
  tm.text(diff + "");
  return resize();
};
start = null;
run = function(){
  if (handler) {
    clearInterval(handler);
  } else {
    start = new Date();
  }
  return handler = setInterval(function(){
    return count();
  }, 100);
};
resize = function(){
  var tm, w, h, len;
  tm = $('#timer');
  w = tm.width();
  h = $(window).height();
  len = tm.text().length;
  if (len <= 3) {
    len = 3;
  }
  tm.css('font-size', 1.5 * w / len + "px");
  console.log(w, len);
  return tm.css('line-height', h + "px");
};
window.onload = function(){
  return resize();
};
window.onresize = function(){
  return resize();
};