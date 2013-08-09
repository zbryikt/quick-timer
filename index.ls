start = null
is-blink = 0
is-light = 1
is-run = 0
handler = null
latency = 0
stop-by = null
delay = 300000
is-show = 1

show = ->
  is-show := 1 - is-show
  $ \.fbtn .css \opacity, if is-show => \1.0 else \0.1

adjust = (it,v) ->
  if is-blink => return
  delay := delay + it * 1000
  if it==0 => delay := v * 1000
  if delay <= 0 => delay := 0
  $ \#timer .text (delay)
  resize!

toggle = ->
  is-run := 1 - is-run
  $ \#toggle .text if is-run => "STOP" else "RUN"
  if !is-run and handler => 
    stop-by := new Date!
    clearInterval handler
    handler := null
  if stop-by =>
    latency := latency + (new Date!)getTime! - stop-by.getTime!
  if is-run => run!

reset = ->
  stop-by := 0
  is-blink := 0
  latency := 0
  start := new Date!
  is-run := 1
  toggle!
  if handler => clearInterval handler
  handler := null
  $ \#timer .text delay
  $ \#timer .css \color, \#fff
  resize!


blink = ->
  is-blink := 1
  is-light := 1 - is-light
  $ \#timer .css \color, if is-light => \#fff else \#f00

count = ->
  tm = $ \#timer
  diff = start.getTime! - (new Date!)getTime! + delay + latency
  if diff < 0 and is-blink == 0 => 
    is-blink := 1
    diff = 0
    clearInterval handler
    handler := setInterval ( -> blink!), 500
  tm.text "#{diff}"
  resize!

run =  ->
  if start == null =>
    start := new Date!
    latency := 0
    is-blink := 0
  if handler => clearInterval handler
  if is-blink => handler := setInterval (-> blink!), 500
  else handler := setInterval (-> count!), 100

resize = ->
  tm = $ \#timer
  w = tm.width! 
  h = $ window .height!
  len = tm.text!length
  if len<=3 => len = 3 
  tm.css \font-size, "#{1.5 * w/len}px"
  console.log w,len
  tm.css \line-height, "#{h}px"


window.onload = -> 
  $ \#timer .text delay
  resize!
window.onresize = -> resize!
