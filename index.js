var isRun, toggle, count, handler, start, run, resize;
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
count = function(){
  var tm, diff;
  tm = $('#timer');
  diff = start.getTime() - new Date().getTime() + 300000;
  tm.text(diff + "");
  return resize();
};
handler = null;
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