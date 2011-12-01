window.url_query_string = ( params, use_blank ) ->
  use_blank = use_blank || false
  request_pairs = []
  $.each( params, ( k, v ) ->
    return if !use_blank && !v
    request_pairs.push( k + "=" + v )
  )
  res = request_pairs.join( "&" )
  res = "?" + res if res
  res