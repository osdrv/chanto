Number.prototype.pluralize = () ->
  opts = Number.i18zed()
  variants = arguments
  opts.pluralize.call(this, variants) if opts
