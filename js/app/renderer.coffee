Renderer = ( options ) ->
  this._init( options )
  null

Renderer.prototype = {
  _init: ( options ) ->
    this.options = options
  render: ( data ) ->
    p "renderer called"
}

window.Renderer = Renderer
