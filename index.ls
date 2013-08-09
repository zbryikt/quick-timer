is-run = 0
toggle = ->
  is-run := 1 - is-run
  if !is-run and handler => clearInterval handler
  if is-run => run!

is-light = 0
blink = ->
  is-light := 1 - is-light
  $ \#timer .css \color, if is-light => \#fff else \#f00

handler = null
count = ->
  tm = $ \#timer
  diff = start.getTime! - (new Date!)getTime! + 3000
 #300000
  if diff < 0 and is-light == 0 => 
    is-light := 1
    diff = 0
    clearInterval handler
    handler := setInterval ( -> blink!), 500
  tm.text "#{diff}"
  resize!

start = null
run = ->
  if handler => clearInterval handler
  else start := new Date!
  handler := setInterval (-> count!), 100

resize = ->
  tm = $ \#timer
  w = tm.width! 
  h = $ window .height!
  len = tm.text!length
  if len<=3 => len = 3 
  tm.css \font-size, "#{1.5 * w/len}px"
  console.log w,len
  tm.css \line-height, "#{h}px"


window.onload = -> resize!
window.onresize = -> resize!
