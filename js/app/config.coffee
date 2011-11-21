window.Config = (() ->
  this.pool = {}
  self = this
  {
    v: ( k, v ) ->
      if v == undefined
        return self.pool[k]
      else
        self.pool[k] = v
  }
)()