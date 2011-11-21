(function() {
  var Core, locales, router;
  Core = function(opts) {
    this._init(opts);
    return null;
  };
  Core.prototype = {
    _init: function(opts) {
      return this.options = $.extend({}, opts);
    },
    run: function(force) {
      force = force || this.options.force_run_initializers || false;
      if (this.__inited && !force) {
        return;
      }
      this.__inited = true;
      return this._runInitializers();
    },
    _runInitializers: function() {
      return this.initializer.run();
    },
    initializer: (function() {
      this.pool = [];
      return {
        register: function(i) {
          return pool.push(i);
        },
        run: function() {
          return pool.each(function(i) {
            return i.run();
          });
        }
      };
    })()
  };
  window.core = new Core();
  router = (function() {
    return {
      run: function() {
        return p(window.location.href);
      }
    };
  })();
  window.core.initializer.register(router);
  window.core.initializer.register({
    run: function() {
      return $("[data-role=\"tabs-slider\"]").tabs_slider();
    }
  });
  window.Array.prototype.first = function() {
    return this[0];
  };
  window.Array.prototype.last = function() {
    return this[this.length - 1];
  };
  window.Array.prototype.uniq = function() {
    var h, i, _i, _len;
    h = {};
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      i = this[_i];
      h[i] = true;
    }
    return keys(h);
  };
  window.Array.prototype.compact = function() {
    var a, i, _i, _len;
    a = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      i = this[_i];
      if (i) {
        a.push(i);
      }
    }
    return a;
  };
  window.Array.prototype.each = function(cb) {
    var i, self, _fn, _i, _len;
    _fn = function(k) {
      return cb.call(self, k);
    };
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      i = this[_i];
      self = this;
      _fn(i);
    }
    return this;
  };
  window.Array.prototype.indexof = function(v) {
    var i, l, val, _len;
    l = this.length - 1;
    for (i = 0, _len = this.length; i < _len; i++) {
      val = this[i];
      if (val === v) {
        return i;
      }
    }
    return null;
  };
  window.Array.prototype.exclude = function(v) {
    var res, val, _i, _len;
    res = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      val = this[_i];
      if (v !== val) {
        res.push(val);
      }
    }
    return res;
  };
  window.Date.prototype.getMonthName = function() {
    var opts;
    if (!(this instanceof Date)) {
      return null;
    }
    opts = Date.i18zed();
    if (opts !== void 0) {
      return opts.month_names[this.getMonth()];
    }
  };
  window.Date.prototype.getMonthNameRelated = function() {
    var month_names, opts;
    if (!(this instanceof Date)) {
      return null;
    }
    opts = Date.i18zed();
    if (opts === void 0) {
      return null;
    }
    month_names = opts.month_names_related || opts.month_names;
    return month_names[this.getMonth()];
  };
  window.Date.prototype.to_i = function() {
    if (!(this instanceof Date)) {
      return null;
    }
    return this.valueOf();
  };
  Number.prototype.pluralize = function() {
    var opts, variants;
    opts = Number.i18zed();
    variants = arguments;
    if (opts) {
      return opts.pluralize.call(this, variants);
    }
  };
  window.i18n = (function() {
    var __def_loc;
    __def_loc = "en";
    return {
      locale: function(loc) {
        if (loc !== void 0) {
          return __def_loc = loc;
        } else {
          return __def_loc;
        }
      },
      bind: function(o) {
        if (o.i18ze === void 0) {
          o.i18ze = function(loc, opts, merge) {
            var _base;
            if (merge == null) {
              merge = true;
            }
            this._i18n_pool = this._i18n_pool || {};
            (_base = this._i18n_pool)[loc] || (_base[loc] = {});
            if (merge) {
              opts = $.extend({}, this._i18n_pool[loc], opts);
            }
            return this._i18n_pool[loc] = opts;
          };
        }
        if (o.i18zed === void 0) {
          o.i18zed = function(loc) {
            loc = loc || i18n.locale();
            this._i18n_pool = this._i18n_pool || {};
            return this._i18n_pool[loc];
          };
        }
        return o;
      }
    };
  })();
  window.set_locale = function(locale) {
    if (locales[locale] === void 0) {
      throw "Unknown locale given: " + locale;
    }
    window.i18n.locale(locale);
    return locales[locale].call(window, locale);
  };
  locales = {
    "en": function(locale) {
      window.i18n.bind(Number).i18ze(locale, {
        pluralize: function(variants) {
          var _ref;
          return variants[(_ref = 1 === this) != null ? _ref : {
            0: 1
          }];
        }
      });
      return window.i18n.bind(Date).i18ze(locale, {
        month_names: _w("january february marth april may june july august september october november december")
      });
    },
    "ru": function(locale) {
      window.i18n.bind(Number).i18ze(locale, {
        pluralize: function(variants) {
          var k, v;
          v = this;
          k = 2;
          if (v % 10 === 1 && v % 100 !== 11) {
            k = 0;
          }
          if (v % 10 >= 2 && v % 10 <= 4 && (v % 100 < 10 || v % 100 >= 20)) {
            k = 1;
          }
          return variants[k];
        }
      });
      return window.i18n.bind(Date).i18ze(locale, {
        month_names: _w("январь февраль март апрель май июнь июль август сентябрь октябрь ноябрь декабрь"),
        month_names_related: _w("января февраля марта апреля мая июня июля августа сентября октября ноября декабря")
      });
    }
  };
  $.widget("ui.tabs_slider", {
    options: {
      speed: 20,
      stable_offset: 100
    },
    _create: function() {
      this._decorate();
      this._calcTabsWidth();
      this._bindDeviceWidthChange();
      this._bindUserActions();
      this.state = 1;
      return this.stable_offset = this.options.stable_offset;
    },
    _decorate: function() {
      this.element.addClass("ui-tabs-slider");
      return this.element.children("ul").addClass("ui-slider-internal").children("li").addClass("ui-slider-tab");
    },
    _bindDeviceWidthChange: function() {
      var self;
      self = this;
      return $(document).bind("orientationchange", function() {
        return self._calcTabsWidth();
      });
    },
    _bindUserActions: function() {
      var events, self;
      self = this;
      events = ["mousedown", "mouseup", "mousemove"];
      this.element.bind(events[0], function(e) {
        e.preventDefault();
        this.touchable = true;
        return this.touch_started_at = this.touch_offset = self.pageX(e);
      });
      this.element.bind(events[1], function(e) {
        e.preventDefault();
        this.touchable = false;
        this.touch_offset = null;
        return self.moveStableState.call(self);
      });
      return this.element.bind(events[2], function(e) {
        var deltaX, offset, state_offset;
        if (this.touchable) {
          e.preventDefault();
          state_offset = (self.state - 1) * self.window_width * self.stable_offset / 100;
          offset = self.pageX(e) - this.touch_started_at + state_offset;
          deltaX = self.pageX(e) - this.touch_offset;
          this.touch_offset = self.pageX(e);
          return self.move.call(self, offset);
        }
      });
    },
    pageX: function(e) {
      if (e.originalEvent.touches) {
        return e.originalEvent.touches[0].pageX;
      } else {
        return e.pageX;
      }
    },
    move: function(px) {
      p(px);
      this.offset = Math.round(1000 * px / this.window_width, 10);
      return this.element.children("ul").css("left", this.offset + "px");
    },
    _calcTabsWidth: function() {
      var lis, ul, width;
      width = parseInt(window.innerWidth, 10);
      this.window_width = width;
      ul = this.element.children("ul");
      lis = ul.children("li");
      ul.css("width", (lis.count * width) + "px");
      lis.css("width", width + "px");
      return this.tabs_count = lis.count;
    },
    moveStableState: function(state) {
      var animation, calculated_state, current_offset, delta, new_offset, self, step, w, _ref;
      w = this.window_width;
      self = this;
      if (state === void 0) {
        calculated_state = Math.round(this.offset / this.window_width) - 1;
        delta = this.offset - this.getStableOffset();
        if (delta > 0 && delta > this.options.stable_offset) {
          calculated_state += 1;
        } else if (delta < 0 && -1 * delta > this.options.stable_offset) {
          calculated_state -= 1;
        }
        if (calculated_state > this.tabs_count) {
          calculated_state = this.tabs_count;
        } else if (calculated_state < 1) {
          calculated_state = 1;
        }
        this.state = calculated_state;
      } else {
        this.state = state;
      }
      new_offset = this.getStableOffset();
      current_offset = this.offset;
      if (new_offset === current_offset) {
        return;
      }
      step = (_ref = new_offset - current_offset > 0) != null ? _ref : {
        1: -1
      };
      step *= this.options.speed;
      return animation = window.setInterval(function() {
        current_offset += step;
        if (Math.abs(new_offset - current_offset) < Math.abs(step)) {
          current_offset = new_offset;
          window.clearInterval(animation);
          self.element.trigger("state_change", self.state);
        }
        return self.move(Math.round(current_offset / 100 * w));
      }, 20);
    },
    getStableOffset: function() {
      return (this.state - 1) * this.window_width;
    }
  });
  window.p = function() {
    return console.log(arguments);
  };
  window._c = function(e) {
    e.preventDefault();
    return e.stopPropagation();
  };
  window._w = function(str) {
    return str.split(/\s+/);
  };
  $(function() {
    return $('a[href="#"]').live('click', function(e) {
      return e.preventDefault();
    });
  });
}).call(this);
