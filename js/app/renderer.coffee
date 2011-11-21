Renderer = ( options ) ->
  this._init( options )
  null

Renderer.prototype = {
  _init: ( options ) ->
    this.options = options
  render: ( data ) ->
    Logger.debug "renderer called"
}

window.Renderer = Renderer
