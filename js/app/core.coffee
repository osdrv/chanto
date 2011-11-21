Core = ( opts )->
  this._init( opts )
  null

Core.prototype = {
  _init: ( opts )->
    this.options = $.extend( {}, opts )

  run: ( force ) ->
    try
      force = force || this.options.force_run_initializers || false
      return if this.__inited && !force
      this.__inited = true
      this._runInitializers()
    catch e
      Logger.debug e

  _runInitializers: () ->
    this.initializer.run()

  initializer: ( () ->
    this.pool = []
    Logger.debug()
    self = this
    {
      register: ( i ) ->
        self.pool.push( i )
      run: () ->
        self.pool.each( ( i ) ->
          i.run()
        )
    }
  )()
}

window.core = new Core()
