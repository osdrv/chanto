Request = (() ->
  ret = {
    params: ( url ) ->
      url = url || window.location.href
      hash = {}
      hashes = url.slice(window.location.href.indexOf('?') + 1).split('&')
      hashes.each( ( pair )->
        pair = pair.split("=")
        hash[pair[0]] = pair[1]
      )
      hash
    hash: ( url ) ->
      url = url || window.location.hash
      url.replace("#", "")
      url
    hostname: () ->
      _r = ret
      [ _r.protocol(), "//", _r.host(), _r.port() ].join("")
  }
  _w("host port protocol pathname").each(( k ) ->
    ret[k] = ()->
      window.location[k]
  )
  ret
)(window)

window.Request = Request