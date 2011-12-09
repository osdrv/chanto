window.Logger = (() ->
  {
    notice: ( m ) ->
      if ( navigator && navigator.notification )
        navigator.notification.alert( "" + m )
      else
        alert( m )
    debug: ( m ) ->
      console.log( m )
  }
)()