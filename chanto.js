(function() {
  var Action, Core, RemoteData, Renderer, Request, Router, locales, router;
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
  window.Logger = (function() {
    return {
      notice: function(m) {
        if (navigator && navigator.notification) {
          return navigator.notification.alert("" + m);
        } else {
          return alert(m);
        }
      },
      debug: function(m) {
        return console.log(m);
      }
    };
  })();
  Core = function(opts) {
    this._init(opts);
    return null;
  };
  Core.prototype = {
    _init: function(opts) {
      opts = opts || {};
      return this.options = $.extend({}, opts);
    },
    run: function(force) {
      try {
        force = force || this.options.force_run_initializers || false;
        if (this.__inited && !force) {
          return;
        }
        this.__inited = true;
        return this._runInitializers();
      } catch (e) {
        return Logger.debug(e);
      }
    },
    _runInitializers: function() {
      return this.initializer.run();
    },
    initializer: (function() {
      var self;
      this.pool = [];
      self = this;
      return {
        register: function(i) {
          return self.pool.push(i);
        },
        run: function() {
          return self.pool.each(function(i) {
            return i.run();
          });
        }
      };
    })()
  };
  window.core = new Core();
  Action = function(options) {
    this._init(options);
    return null;
  };
  Action.prototype = {
    _init: function(options) {
      options = options || {};
      this.options = $.extend({}, options);
      return this.data = {};
    },
    bang: function() {
      return Logger.debug("action bang!");
    }
  };
  window.Action = Action;
  window.Config = (function() {
    var self;
    this.pool = {};
    self = this;
    return {
      v: function(k, v) {
        if (v === void 0) {
          return self.pool[k];
        } else {
          return self.pool[k] = v;
        }
      }
    };
  })();
  Core = function(opts) {
    this._init(opts);
    return null;
  };
  Core.prototype = {
    _init: function(opts) {
      opts = opts || {};
      return this.options = $.extend({}, opts);
    },
    run: function(force) {
      try {
        force = force || this.options.force_run_initializers || false;
        if (this.__inited && !force) {
          return;
        }
        this.__inited = true;
        return this._runInitializers();
      } catch (e) {
        return Logger.debug(e);
      }
    },
    _runInitializers: function() {
      return this.initializer.run();
    },
    initializer: (function() {
      var self;
      this.pool = [];
      self = this;
      return {
        register: function(i) {
          return self.pool.push(i);
        },
        run: function() {
          return self.pool.each(function(i) {
            return i.run();
          });
        }
      };
    })()
  };
  window.core = new Core();
  window.human_date = function(d) {
    var date, time;
    date = new Date();
    time = Date.parse(d.replace(/\-/g, '/'));
    date.setTime(time);
    if (date) {
      return date.getDate() + " " + date.getMonthNameRelated();
    }
  };
  window.url_query_string = function(params, use_blank) {
    var request_pairs, res;
    use_blank = use_blank || false;
    request_pairs = [];
    $.each(params, function(k, v) {
      if (!use_blank && !v) {
        return;
      }
      return request_pairs.push(k + "=" + v);
    });
    res = request_pairs.join("&");
    if (res) {
      res = "?" + res;
    }
    return res;
  };
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
  Renderer = function(options) {
    this._init(options);
    return null;
  };
  Renderer.prototype = {
    _init: function(options) {
      options = options || {};
      this.options = $.extend({}, options);
      return this.page = this.options.page || $(".ui-page").first();
    },
    render: function(data) {
      return Logger.debug("renderer called");
    },
    setHeader: function(content) {
      return this.getHeader().empty().append(content);
    },
    getHeader: function() {
      return this.page.find("div[data-role=\"header\"]");
    },
    setFooter: function(content) {
      return this.getFooter().empty().append(content);
    },
    getFooter: function() {
      return this.page.find("div[data-role=\"footer\"]");
    },
    setContent: function(content) {
      return this.getContent().empty().append(content);
    },
    getContent: function() {
      return this.page.find("div[data-role=\"content\"]");
    }
  };
  window.Renderer = Renderer;
  Request = (function() {
    var ret;
    ret = {
      params: function(url) {
        var hash, hashes;
        url = url || window.location.href;
        hash = {};
        hashes = url.slice(window.location.href.indexOf('?') + 1).split('&');
        hashes.each(function(pair) {
          pair = pair.split("=");
          return hash[pair[0]] = pair[1];
        });
        return hash;
      },
      hash: function(url) {
        url = url || window.location.hash;
        url.replace("#", "");
        return url;
      },
      hostname: function() {
        var _r;
        _r = ret;
        return [_r.protocol(), "//", _r.host(), _r.port()].join("");
      }
    };
    _w("host port protocol pathname").each(function(k) {
      return ret[k] = function() {
        return window.location[k];
      };
    });
    return ret;
  })(window);
  window.Request = Request;
  Router = (function() {
    var self;
    self = this;
    this.routing_table = {};
    return {
      register: function(name, mask, handler) {
        self.routing_table[name] = {
          mask: mask,
          handler: handler
        };
        return Router;
      },
      proceed: function() {
        var href;
        href = Request.pathname();
        return $.each(self.routing_table, function(name, obj) {
          var handler, mask, proceed;
          mask = obj.mask;
          handler = obj.handler;
          proceed = false;
          try {
            if (typeof mask === "string") {
              if (href.search(mask) !== -1) {
                proceed = true;
              }
            } else if (mask instanceof Array) {
              if (mask.indexof(href) !== null) {
                proceed = true;
              }
            } else if (typeof mask.test === "function") {
              if (mask.test(href)) {
                proceed = true;
              }
            } else if (typeof mask === "function") {
              if (mask.call(window)) {
                proceed = true;
              }
            }
            if (proceed) {
              handler.call(self);
              try {
                if (self.action) {
                  self.action.bang();
                }
              } catch (e) {
                Logger.debug(e);
              }
              return false;
            }
          } catch (e) {
            return Logger.debug(e);
          }
        });
      }
    };
  })();
  window.Router = Router;
  router = (function() {
    return {
      run: function() {
        return window.Router.proceed();
      }
    };
  })();
  window.core.initializer.register(router);
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
  RemoteData = function(options) {
    this._init(options);
    return null;
  };
  RemoteData.prototype = {
    _init: function(options) {
      options = options || {};
      this.options = $.extend({}, options);
      if (!this.options.remote_host) {
        return Logger.debug("No remote host given.");
      }
    },
    get: function(key, opts) {
      var dataType;
      dataType = opts.dataType || "html";
      return $.get(this.options.remote_host + key, opts.success, dataType);
    }
  };
  window.RemoteData = RemoteData;
  window.Logger = (function() {
    return {
      notice: function(m) {
        if (navigator && navigator.notification) {
          return navigator.notification.alert("" + m);
        } else {
          return alert(m);
        }
      },
      debug: function(m) {
        return console.log(m);
      }
    };
  })();
  window.Logger = (function() {
    return {
      notice: function(m) {
        if (navigator && navigator.notification) {
          return navigator.notification.alert("" + m);
        } else {
          return alert(m);
        }
      },
      debug: function(m) {
        return console.log(m);
      }
    };
  })();
}).call(this);
