window.Date.prototype.getMonthName = () ->
  return null if !(this instanceof Date)
  opts = Date.i18zed()
  opts.month_names[this.getMonth()] if opts != undefined


window.Date.prototype.getMonthNameRelated = () ->
  return null if !(this instanceof Date)
  opts = Date.i18zed()
  return null if opts == undefined
  month_names = opts.month_names_related || opts.month_names
  month_names[this.getMonth()]


window.Date.prototype.to_i = () ->
  return null if !(this instanceof Date)
  this.valueOf()
  #Date.UTC(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDay(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds())
