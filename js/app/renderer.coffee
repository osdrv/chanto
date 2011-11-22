Renderer = ( options ) ->
  this._init( options )
  null

Renderer.prototype = {
  _init: ( options ) ->
    options = options || {}
    this.options = $.extend( {}, options )
  render: ( data ) ->
    Logger.debug "renderer called"
  setHeader: ( content ) ->
    this.getHeader().empty().append( content )
  getHeader: () ->
    $("div[data-role=\"header\"]").filter( ":visible" )
  setFooter: ( content ) ->
    this.getFooter().empty().append( content )
  getFooter: () ->
    $("div[data-role=\"footer\"]").filter( ":visible" )
  setContent: ( content ) ->
    this.getContent().empty().append( content )
  getContent: () ->
    $("div[data-role=\"content\"]").filter( ":visible" )
}

window.Renderer = Renderer
