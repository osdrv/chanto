window.i18n = (() ->
  __def_loc = "en"
  {
    locale: (loc) ->
      if loc != undefined
        __def_loc = loc
      else
        __def_loc
    , bind: (o) ->
      if o.i18ze == undefined
        o.i18ze = (loc, opts, merge = true) ->
          this._i18n_pool = this._i18n_pool || {}
          this._i18n_pool[loc] ||= {}
          opts = $.extend({}, this._i18n_pool[loc], opts) if merge
          this._i18n_pool[loc] = opts
      if o.i18zed == undefined
        o.i18zed = (loc) ->
          loc = loc || i18n.locale()
          this._i18n_pool = this._i18n_pool || {}
          this._i18n_pool[loc]
      o
  }
)()

