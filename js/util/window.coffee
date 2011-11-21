window.p = () ->
  console.log(arguments)

window._c = (e) ->
  e.preventDefault()
  e.stopPropagation()

window._w = (str) ->
  str.split(/\s+/)

$(()->
  $('a[href="#"]').live('click', (e) ->
    e.preventDefault()
  )
)