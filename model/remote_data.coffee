RemoteData = ( options ) ->
  this._init( options )
  null

RemoteData.prototype = {
  _init: ( options ) ->
    options = options || {}
    this.options = $.extend( {}, options )
    Logger.debug("No remote host given.") if !this.options.remote_host
  
  get: ( key, opts ) ->
    dataType = opts.dataType || "html"
    $.get( this.options.remote_host + key, opts.success, dataType )
}

window.RemoteData = RemoteData