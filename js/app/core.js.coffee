Core = ( opts )->
  this._init( opts )
  null

Core.prototype = {
  _init: ( opts )->
    this.options = $.extend( {}, opts )

  run: ( force ) ->
    force = force || this.options.force_run_initializers || false
    return if this.__inited && !force
    this.__inited = true
    this._runInitializers()

  _runInitializers: () ->
    this.initializer.run()

  initializer: ( () ->
    this.pool = []
    {
      register: ( i ) ->
        pool.push( i )
      run: () ->
        pool.each( ( i ) ->
          i.run()
        )
    }
  )()
}

window.core = new Core()
