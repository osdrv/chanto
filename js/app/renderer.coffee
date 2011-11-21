Renderer = ( options ) ->
  this._init( options )
  null

Renderer.prototype = {
  _init: ( options ) ->
    this.options = options
  render: ( data ) ->
    Logger.debug "renderer called"
  setHeader: ( content ) ->
    $("div[data-role=\"header\"]").empty().append( content )
  setFooter: ( content ) ->
    $("div[data-role=\"footer\"]").empty().append( content )
  setContent: ( content ) ->
    $("div[data-role=\"content\"]").empty().append( content )
}

window.Renderer = Renderer
