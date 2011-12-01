router = ( () ->
  {
    run: () ->
      window.Router.proceed()
  }
)()

window.core.initializer.register( router )
