window.Logger = (() ->
  {
    debug: ( m ) ->
      if ( undefined != navigator)
        navigator.notification.alert( "" + m )
      else
        alert( m )
  }
)()