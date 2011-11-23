Renderer = ( options ) ->
  this._init( options )
  null

Renderer.prototype = {
  _init: ( options ) ->
    options = options || {}
    this.options = $.extend( {}, options )
    this.page = this.options.page || $(".ui-page").first()
  render: ( data ) ->
    Logger.debug "renderer called"
  setHeader: ( content ) ->
    this.getHeader().empty().append( content )
  getHeader: () ->
    this.page.find("div[data-role=\"header\"]")
  setFooter: ( content ) ->
    this.getFooter().empty().append( content )
  getFooter: () ->
    this.page.find("div[data-role=\"footer\"]")
  setContent: ( content ) ->
    this.getContent().empty().append( content )
  getContent: () ->
    this.page.find("div[data-role=\"content\"]")
}

window.Renderer = Renderer
