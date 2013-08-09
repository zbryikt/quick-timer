var start, isBlink, isLight, isRun, handler, latency, stopBy, delay, isShow, show, adjust, toggle, reset, blink, count, run, resize;
start = null;
isBlink = 0;
isLight = 1;
isRun = 0;
handler = null;
latency = 0;
stopBy = null;
delay = 300000;
isShow = 1;
show = function(){
  isShow = 1 - isShow;
  return $('.fbtn').css('opacity', isShow ? '1.0' : '0.1');
};
adjust = function(it, v){
  if (isBlink) {
    return;
  }
  delay = delay + it * 1000;
  if (it === 0) {
    delay = v * 1000;
  }
  if (delay <= 0) {
    delay = 0;
  }
  $('#timer').text(delay);
  return resize();
};
toggle = function(){
  isRun = 1 - isRun;
  $('#toggle').text(isRun ? "STOP" : "RUN");
  if (!isRun && handler) {
    stopBy = new Date();
    clearInterval(handler);
    handler = null;
  }
  if (stopBy) {
    latency = latency + new Date().getTime() - stopBy.getTime();
  }
  if (isRun) {
    return run();
  }
};
reset = function(){
  stopBy = 0;
  isBlink = 0;
  latency = 0;
  start = new Date();
  isRun = 1;
  toggle();
  if (handler) {
    clearInterval(handler);
  }
  handler = null;
  $('#timer').text(delay);
  $('#timer').css('color', '#fff');
  return resize();
};
blink = function(){
  isBlink = 1;
  isLight = 1 - isLight;
  return $('#timer').css('color', isLight ? '#fff' : '#f00');
};
count = function(){
  var tm, diff;
  tm = $('#timer');
  diff = start.getTime() - new Date().getTime() + delay + latency;
  if (diff < 0 && isBlink === 0) {
    isBlink = 1;
    diff = 0;
    clearInterval(handler);
    handler = setInterval(function(){
      return blink();
    }, 500);
  }
  tm.text(diff + "");
  return resize();
};
run = function(){
  if (start === null) {
    start = new Date();
    latency = 0;
    isBlink = 0;
  }
  if (handler) {
    clearInterval(handler);
  }
  if (isBlink) {
    return handler = setInterval(function(){
      return blink();
    }, 500);
  } else {
    return handler = setInterval(function(){
      return count();
    }, 100);
  }
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
  $('#timer').text(delay);
  return resize();
};
window.onresize = function(){
  return resize();
};