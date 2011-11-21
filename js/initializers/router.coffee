router = ( () ->
  {
    run: () ->
      Logger.debug("Router ready to proceed")
      window.Router.proceed()
  }
)()

window.core.initializer.register( router )
