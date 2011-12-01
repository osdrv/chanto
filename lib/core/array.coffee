window.Array.prototype.first = () ->
  this[0]


window.Array.prototype.last = () ->
  this[this.length - 1]


window.Array.prototype.uniq = () ->
  h = {}
  for i in this
    h[i] = true
  keys(h)


window.Array.prototype.compact = () ->
  a = []
  for i in this
    a.push(i) if i
  a


window.Array.prototype.each = (cb) ->
  for i in this
    self = this
    ((k) -> cb.call(self, k))(i)
  this


window.Array.prototype.indexof = (v) ->
  l = this.length - 1
  for val, i in this
    return i if val == v
  null


window.Array.prototype.exclude = (v) ->
  res = []
  for val in this
    res.push val if v != val
  res
