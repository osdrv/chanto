window.Router = (() ->
  self = this
  this.routing_table = {}
  {
    register: ( name, mask, handler ) ->
      self.routing_table[name] = { mask: mask, handler: handler }
    proceed: () ->
      href = window.location.href
      $.each( self.routing_table, ( name, obj ) ->
        mask = obj.mask
        handler = obj.handler
        if typeof( mask ) == "string"
          if href.search( mask ) != -1
            handler.call( window )
            return false
        else if typeof( mask ) == "object"
          if typeof( mask.test ) == "function"
            if mask.test( href )
              handler.call( window )
              return false
        else if typeof( mask ) == "function"
          if mask.call( window )
            handler.call( window )
            return false
        true
      )
  }
)()