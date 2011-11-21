Action = ( options ) ->
  this._init( options )
  null

Action.prototype = {
  _init: ( options ) ->
    options = options || {}
    this.options = $.extend( {}, options )
    this.data = {}
  
  bang: () ->
    p "action bang!"
}

window.Action = Action