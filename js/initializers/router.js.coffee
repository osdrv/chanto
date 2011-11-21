router = ( () ->
  {
    run: () ->
      p( window.location.href )
  }
)()

window.core.initializer.register( router )
