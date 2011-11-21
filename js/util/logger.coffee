window.Logger = (() ->
  {
    debug: ( m ) ->
      if ( navigator && navigator.notification )
        navigator.notification.alert( "" + m )
      else
        alert( m )
  }
)()