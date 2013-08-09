is-run = 0
toggle = ->
  is-run := 1 - is-run
  if !is-run and handler => clearInterval handler
  if is-run => run!

count = ->
  tm = $ \#timer
  diff = start.getTime! - (new Date!)getTime! + 300000
  tm.text "#{diff}"
  resize!

handler = null
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
  tm.css \font-size, "#{1.5 * w/len}px"
  console.log w,len
  tm.css \line-height, "#{h}px"


window.onload = -> resize!
window.onresize = -> resize!
