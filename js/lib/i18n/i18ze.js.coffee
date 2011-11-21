window.set_locale = (locale) ->
  throw "Unknown locale given: " + locale if locales[locale] == undefined
  window.i18n.locale(locale)
  locales[locale].call(window, locale)


locales = {

  "en": (locale) ->
    window.i18n.bind(Number).i18ze(locale, { pluralize: (variants) ->
      variants[1 == this ? 0 : 1]
    })
    window.i18n.bind(Date).i18ze(locale, { month_names: _w("january february marth april may june july august september october november december") })



  , "ru": (locale) ->
    window.i18n.bind(Number).i18ze(locale, { pluralize: (variants) ->
      v = this
      k = 2
      k = 0 if (v % 10 == 1 && v % 100 != 11)
      k = 1 if ( v % 10 >= 2 && v % 10 <= 4 && ( v % 100 < 10 || v % 100 >= 20))
      variants[k]
    })
    window.i18n.bind(Date).i18ze(locale, { month_names: _w("январь февраль март апрель май июнь июль август сентябрь октябрь ноябрь декабрь"), month_names_related: _w("января февраля марта апреля мая июня июля августа сентября октября ноября декабря") })

}
