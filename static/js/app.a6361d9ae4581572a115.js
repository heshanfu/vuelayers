webpackJsonp([1,2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.feature = exports.coord = exports.style = exports.helpers = exports.consts = undefined;

var _openlayers = __webpack_require__(23);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _consts2 = __webpack_require__(46);

var _consts = _interopRequireWildcard(_consts2);

var _helpers2 = __webpack_require__(264);

var _helpers = _interopRequireWildcard(_helpers2);

var _style2 = __webpack_require__(265);

var _style = _interopRequireWildcard(_style2);

var _coord2 = __webpack_require__(262);

var _coord = _interopRequireWildcard(_coord2);

var _feature2 = __webpack_require__(263);

var _feature = _interopRequireWildcard(_feature2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _openlayers2.default; /**
                                         * OpenLayers helpers and constants
                                         */

exports.consts = _consts;
exports.helpers = _helpers;
exports.style = _style;
exports.coord = _coord;
exports.feature = _feature;

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(25);

var _create2 = _interopRequireDefault(_create);

var _defineProperties = __webpack_require__(37);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _rxSubs = __webpack_require__(36);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _vmBind = __webpack_require__(16);

var _vmBind2 = _interopRequireDefault(_vmBind);

var _stubVnode = __webpack_require__(17);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

var _debug = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

var methods = {
  /**
   * @protected
   */
  initialize: function initialize() {
    /**
     * @type {ol.interaction.Interaction}
     * @protected
     */
    this.interaction = this.createInteraction();
    this.bindSelfTo(this.interaction);
  },

  /**
   * @return {ol.interaction.Interaction}
   * @protected
   */
  createInteraction: function createInteraction() {
    throw new Error('Not implemented method');
  },

  /**
   * @protected
   */
  mountInteraction: function mountInteraction() {
    if (this.map) {
      this.map.addInteraction(this.interaction);
      this.subscribeAll();
    } else if (false) {
      (0, _debug.warn)("Invalid usage of interaction component, should have map component among it's ancestors");
    }
  },

  /**
   * @protected
   */
  unmountInteraction: function unmountInteraction() {
    this.unsubscribeAll();
    this.map && this.map.removeInteraction(this.interaction);
  },
  refresh: function refresh() {
    this.interaction && this.interaction.changed();
  }
};

exports.default = {
  mixins: [_rxSubs2.default, _vmBind2.default, _stubVnode2.default],
  inject: ['map'],
  props: props,
  methods: methods,
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  provide: function provide() {
    var _this = this;

    return (0, _defineProperties2.default)((0, _create2.default)(null), {
      interaction: {
        enumerable: true,
        get: function get() {
          return _this.interaction;
        }
      }
    });
  },
  created: function created() {
    this.initialize();
  },
  mounted: function mounted() {
    this.$nextTick(this.mountInteraction);
  },
  destroyed: function destroyed() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.unmountInteraction();
      _this2.interaction = undefined;
    });
  }
};

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _layer = __webpack_require__(89);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  preload: Number
};

var methods = {
  createLayer: function createLayer() {
    return new _vlOl2.default.layer.Tile({
      id: this.id,
      minResolution: this.minResolution,
      maxResolution: this.maxResolution,
      opacity: this.opacity,
      visible: this.visible,
      preload: this.preload,
      projection: this.projection,
      extent: this.extent,
      zIndex: this.zIndex
    });
  }
};

exports.default = {
  mixins: [_layer2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = warn;
exports.error = error;
exports.warndbg = warndbg;
exports.errordbg = errordbg;
/* global PKG_FULLNAME */

function warn(msg) {
  var _console;

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  (_console = console).warn.apply(_console, ['[' + "VueLayers" + '] WARNING: ' + msg].concat(args));
}

function error(msg) {
  var _console2;

  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  (_console2 = console).error.apply(_console2, ['[' + "VueLayers" + '] WARNING: ' + msg].concat(args));
}

function warndbg() {
  if (false) {
    warn.apply(undefined, arguments);
  }
}

function errordbg() {
  if (false) {
    error.apply(undefined, arguments);
  }
}

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(47);

var _assign2 = _interopRequireDefault(_assign);

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _layer = __webpack_require__(89);

var _layer2 = _interopRequireDefault(_layer);

var _target = __webpack_require__(45);

var _target2 = _interopRequireDefault(_target);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  updateWhileAnimating: {
    type: Boolean,
    default: false
  },
  updateWhileInteracting: {
    type: Boolean,
    default: false
  }
  // todo implement options
  // renderOrder: Function,
  // renderBuffer: Number
};

var methods = {
  createLayer: function createLayer() {
    return new _vlOl2.default.layer.Vector({
      id: this.id,
      minResolution: this.minResolution,
      maxResolution: this.maxResolution,
      opacity: this.opacity,
      visible: this.visible,
      preload: this.preload,
      projection: this.projection,
      extent: this.extent,
      zIndex: this.zIndex,
      updateWhileAnimating: this.updateWhileAnimating,
      updateWhileInteracting: this.updateWhileInteracting
    });
  },
  styleTarget: function styleTarget() {
    return this.layer;
  }
};

var layerProvide = _layer2.default.provide;
var styleTargetProvide = _target2.default.provide;
exports.default = {
  mixins: [_layer2.default, _target2.default],
  props: props,
  methods: methods,
  provide: function provide() {
    return (0, _assign2.default)(layerProvide.call(this), styleTargetProvide.call(this));
  }
};

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(146);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = __webpack_require__(48);

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = __webpack_require__(144);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _func = __webpack_require__(8);

var _source = __webpack_require__(90);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  loader: Function,
  useSpatialIndex: {
    type: Boolean,
    default: true
  },
  features: {
    type: Array,
    default: function _default() {
      return [];
    }
  }
  // todo implement options
  // format: String,
  // strategy: String
};

var computed = {
  currentLoader: function currentLoader() {
    return this.loader;
  }
};

var _source$methods = _source2.default.methods,
    sourceMountSource = _source$methods.mountSource,
    sourceUnmountSource = _source$methods.unmountSource;


var methods = {
  /**
   * @return {function|undefined}
   * @protected
   */
  sourceLoader: function sourceLoader() {
    if (!this.currentLoader) return;

    var loader = this.currentLoader.bind(this);
    var self = this;

    return function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(extent, resolution, projection) {
        var features;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                projection = projection.getCode();
                extent = _vlOl.coord.extentToLonLat(extent, projection);

                _context.next = 4;
                return _promise2.default.resolve(loader(extent, resolution, projection));

              case 4:
                features = _context.sent;


                if (features && features.length) {
                  self.$nextTick(function () {
                    self.$emit('load', {
                      features: features,
                      extent: extent,
                      resolution: resolution,
                      projection: projection
                    });
                  });
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function __loader(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return __loader;
    }();
  },
  createSource: function createSource() {
    return new _vlOl2.default.source.Vector({
      attributions: this.currentAttributions,
      projection: this.currentProjection,
      loader: this.sourceLoader(),
      useSpatialIndex: this.useSpatialIndex,
      wrapX: this.wrapX,
      logo: this.logo,
      strategy: _vlOl2.default.loadingstrategy.bbox
      // url: this.url,
    });
  },
  mountSource: function mountSource() {
    sourceMountSource.call(this);

    if (this.features.length) {
      this.source.addFeatures(this.features.map(createFeature.bind(this)));
    }
  },
  unmountSource: function unmountSource() {
    sourceUnmountSource.call(this);
    this.source.clear();
  }
};

var watch = {
  features: function features(value, oldValue) {
    var _this = this;

    var forAdd = (0, _func.diffById)(value, oldValue);
    var forRemove = (0, _func.diffById)(oldValue, value);

    this.source.addFeatures(forAdd.map(createFeature.bind(this)));
    forRemove.map(function (plainFeature) {
      var feature = _this.source.getFeatureById(plainFeature.id);

      if (feature) {
        _this.source.removeFeature(feature);
        delete feature.layer;
      }
    });
  }
};

exports.default = {
  mixins: [_source2.default],
  props: props,
  computed: computed,
  methods: methods,
  watch: watch,
  stubVNode: {
    empty: false,
    attrs: function attrs() {
      return {
        id: this.$options.name
      };
    }
  }
};


function createFeature(plainFeature) {
  var _this2 = this;

  // plainFeature.properties || (plainFeature.properties = {})
  // plainFeature.properties = {
  //   ...plainFeature.properties,
  //   layer: this.layer.id
  // }

  var feature = _vlOl.feature.createFeature(plainFeature, this.currentProjection);
  Object.defineProperty(feature, 'layer', {
    enumerable: true,
    configurable: true,
    get: function get() {
      return _this2.layer;
    }
  });

  return feature;
}

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(49);

var _extends3 = _interopRequireDefault(_extends2);

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _tileBase = __webpack_require__(91);

var _tileBase2 = _interopRequireDefault(_tileBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base mixin for WMS sources
 */
var props = {
  layers: {
    type: String,
    required: true
  },
  styles: String, // WMS Request styles
  extParams: Object, // Additional WMS Request params
  gutter: Number,
  hidpi: Boolean,
  serverType: String
};

var computed = {
  currentLayers: function currentLayers() {
    return this.layers;
  },
  currentStyles: function currentStyles() {
    return this.styles;
  },
  currentServerType: function currentServerType() {
    return this.serverType;
  },
  currentExtParams: function currentExtParams() {
    return this.extParams;
  }
};

var methods = {
  createSource: function createSource() {
    return new _vlOl2.default.source.TileWMS({
      attributions: this.currentAttributions,
      cacheSize: this.cacheSize,
      params: (0, _extends3.default)({}, this.currentExtParams, {
        LAYERS: this.currentLayers,
        STYLES: this.currentStyles
      }),
      crossOrigin: this.crossOrigin,
      gutter: this.gutter,
      hidpi: this.hidpi,
      logo: this.logo,
      tileGrid: this.tileGrid,
      projection: this.currentProjection,
      reprojectionErrorThreshold: this.reprojectionErrorThreshold,
      serverType: this.currentServerType,
      wrapX: this.wrapX,
      url: this.replaceUrlTokens()
    });
  }
};

exports.default = {
  mixins: [_tileBase2.default],
  props: props,
  computed: computed,
  methods: methods
};

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  methods: {
    bindSelfTo: function bindSelfTo(object) {
      var _this = this;

      this._vmBinded = object;

      return Object.defineProperty(object, '$vm', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return _this;
        }
      });
    }
  },
  destroyed: function destroyed() {
    delete this._vmBinded.$vm;
  }
};

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _func = __webpack_require__(8);

exports.default = {
  render: function render(h) {
    var options = this.$options.stubVNode || {};
    // render as HTML comment
    if (options.empty) {
      var vnode = h();
      if ((0, _func.isString)(options.empty)) {
        vnode.text = options.empty;
      } else if ((0, _func.isFunction)(options.empty)) {
        vnode.text = options.empty.call(this);
      }

      return vnode;
    }

    var children = void 0;
    if (options.slots === false) {
      children = undefined;
    } else {
      children = extractChildren(this.$slots, options.slots);
    }

    var attrs = (0, _func.isFunction)(options.attrs) ? options.attrs.call(this) : options.attrs;

    var data = {
      attrs: attrs,
      style: {
        display: 'none !important'
      }
    };

    return h(options.tag || 'i', data, children);
  }
};


function extractChildren(slots) {
  var slotNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return (0, _func.reduce)(function (all, nodes, name) {
    if (!slotNames.length || slotNames.includes(name)) {
      all = all.concat(nodes);
    }

    return all;
  }, [], slots);
}

/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(49);

var _extends3 = _interopRequireDefault(_extends2);

var _func = __webpack_require__(8);

var _components = __webpack_require__(241);

var components = _interopRequireWildcard(_components);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global PKG_VERSION, PKG_FULLNAME */
/**
 * VueLayers
 * Vue components to work with OpenLayers.
 *
 * @author Vladimir Vershinin <ghettovoice@gmail.com>
 * @license MIT
 * @copyright (c) 2017, Vladimir Vershinin <ghettovoice@gmail.com>
 */
var keys = ['geom', 'layer', 'source', 'style', 'interaction'];

var flatComponents = (0, _extends3.default)({}, (0, _func.omit)(keys, components), keys.reduce(function (all, key) {
  return (0, _func.merge)(all, components[key]);
}, {}));

exports.default = (0, _extends3.default)({
  PKG_NAME: "VueLayers",
  VERSION: "0.4.0"
}, flatComponents, {
  install: function install(Vue) {
    (0, _func.forEach)(function (component, key) {
      if (component.install) {
        Vue.use(component);
      }
    }, flatComponents);
  }
});

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(800)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(267),
  /* template */
  __webpack_require__(783),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/docs/app.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] app.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6474fc42", Component.options)
  } else {
    hotAPI.reload("data-v-6474fc42", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feature = __webpack_require__(758);

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_feature2.default.install = function (Vue) {
  Vue.component(_feature2.default.name, _feature2.default);
};

exports.default = _feature2.default;

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geoloc = __webpack_require__(759);

var _geoloc2 = _interopRequireDefault(_geoloc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geoloc2.default.install = function (Vue) {
  Vue.component(_geoloc2.default.name, _geoloc2.default);
};

exports.default = _geoloc2.default;

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.GeomMultiPolygon = exports.GeomMultiLineString = exports.GeomMultiPoint = exports.GeomPolygon = exports.GeomLineString = exports.GeomPoint = undefined;

var _geom = __webpack_require__(24);

var _geom2 = _interopRequireDefault(_geom);

var _point = __webpack_require__(239);

var _point2 = _interopRequireDefault(_point);

var _lineString = __webpack_require__(235);

var _lineString2 = _interopRequireDefault(_lineString);

var _polygon = __webpack_require__(240);

var _polygon2 = _interopRequireDefault(_polygon);

var _multiPoint = __webpack_require__(237);

var _multiPoint2 = _interopRequireDefault(_multiPoint);

var _multiLineString = __webpack_require__(236);

var _multiLineString2 = _interopRequireDefault(_multiLineString);

var _multiPolygon = __webpack_require__(238);

var _multiPolygon2 = _interopRequireDefault(_multiPolygon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.GeomPoint = _point2.default;
exports.GeomLineString = _lineString2.default;
exports.GeomPolygon = _polygon2.default;
exports.GeomMultiPoint = _multiPoint2.default;
exports.GeomMultiLineString = _multiLineString2.default;
exports.GeomMultiPolygon = _multiPolygon2.default;
var mixins = exports.mixins = {
  geom: _geom2.default
};

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(760);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(761);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(762);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;

/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(763);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(764);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(25);

var _create2 = _interopRequireDefault(_create);

var _defineProperties = __webpack_require__(37);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _rxSubs = __webpack_require__(36);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _vmBind = __webpack_require__(16);

var _vmBind2 = _interopRequireDefault(_vmBind);

var _stubVnode = __webpack_require__(17);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

var _vlOl = __webpack_require__(0);

var _debug = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  /**
   * Coordinates in EPSG:4326
   */
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length;
    }
  }
}; // import { isEqual } from 'vl-utils/func'
// import Observable from 'vl-rx'


var computed = {
  type: function type() {
    return this.geometry.getType();
  }
};

var methods = {
  /**
   * @protected
   */
  initialize: function initialize() {
    /**
     * @type {ol.geom.SimpleGeometry}
     * @protected
     */
    this.geometry = this.createGeometry();
    this.bindSelfTo(this.geometry);
    /**
     * @protected
     */
    this.coordTransform = _vlOl.coord.coordTransform[this.geometry.getType()];

    this.currentCoordinates = this.coordTransform.toLonLat(this.geometry.getCoordinates(), this.view.getProjection());
    this.currentExtent = _vlOl.coord.extentToLonLat(this.geometry.getExtent(), this.view.getProjection());
  },

  /**
   * @return {ol.geom.SimpleGeometry}
   * @protected
   */
  createGeometry: function createGeometry() {
    throw new Error('Not implemented method');
  },
  subscribeAll: function subscribeAll() {
    // this::subscribeToGeomChanges()
  },

  /**
   * @protected
   */
  mountGeometry: function mountGeometry() {
    if (this.feature) {
      this.feature.setGeometry(this.geometry);
      this.subscribeAll();
    } else if (false) {
      (0, _debug.warn)("Invalid usage of geometry component, should have feature component among it's ancestors");
    }
  },

  /**
   * @protected
   */
  unmountGeometry: function unmountGeometry() {
    this.unsubscribeAll();
    this.feature && this.feature.setGeometry(undefined);
  },
  refresh: function refresh() {
    this.geometry && this.geometry.changed();
  }
};
// todo use turf.js to optimize geometry compare
var watch = {
  coordinates: function coordinates(value) {
    // this.geometry.setCoordinates(this.coordTransform.fromLonLat(value, this.view.getProjection()))
  }
};

exports.default = {
  mixins: [_rxSubs2.default, _vmBind2.default, _stubVnode2.default],
  inject: ['view', 'feature'],
  props: props,
  computed: computed,
  watch: watch,
  methods: methods,
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  provide: function provide() {
    var _this = this;

    return (0, _defineProperties2.default)((0, _create2.default)(null), {
      geometry: {
        enumerable: true,
        get: function get() {
          return _this.geometry;
        }
      }
    });
  },
  data: function data() {
    return {
      currentCoordinates: this.coordinates.slice(),
      currentExtent: []
    };
  },
  created: function created() {
    this.initialize();
  },
  mounted: function mounted() {
    this.$nextTick(this.mountGeometry);
  },
  destroyed: function destroyed() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.unmountGeometry();
      _this2.geometry = undefined;
    });
  }
};

// function subscribeToGeomChanges () {
//   this.rxSubs.geomChanges = Observable.fromOlEvent(this.geometry, 'change')
//     .throttleTime(1000)
//     .map(() => {
//       return [
//         this.coordTransform.toLonLat(this.geometry.getCoordinates(), this.view.getProjection()),
//         coordHelper.extentToLonLat(this.geometry.getExtent(), this.view.getProjection())
//       ]
//     })
//     .distinctUntilChanged((a, b) => isEqual(a, b))
//     .subscribe(
//       ([ coordinates, extent ]) => {
//         this.currentCoordinates = coordinates
//         this.currentExtent = extent
//         this.$emit('change', { coordinates, extent })
//       },
//       ::console.error
//     )
// }

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(765);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interaction = exports.style = exports.source = exports.layer = exports.geom = exports.Geoloc = exports.Feature = exports.View = exports.Map = undefined;

var _map = __webpack_require__(247);

var _map2 = _interopRequireDefault(_map);

var _view = __webpack_require__(261);

var _view2 = _interopRequireDefault(_view);

var _feature = __webpack_require__(232);

var _feature2 = _interopRequireDefault(_feature);

var _geoloc = __webpack_require__(233);

var _geoloc2 = _interopRequireDefault(_geoloc);

var _geom2 = __webpack_require__(234);

var _geom = _interopRequireWildcard(_geom2);

var _layer2 = __webpack_require__(244);

var _layer = _interopRequireWildcard(_layer2);

var _source2 = __webpack_require__(248);

var _source = _interopRequireWildcard(_source2);

var _style2 = __webpack_require__(259);

var _style = _interopRequireWildcard(_style2);

var _interaction2 = __webpack_require__(242);

var _interaction = _interopRequireWildcard(_interaction2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Map = _map2.default;
exports.View = _view2.default;
exports.Feature = _feature2.default;
exports.Geoloc = _geoloc2.default;
exports.geom = _geom;
exports.layer = _layer;
exports.source = _source;
exports.style = _style;
exports.interaction = _interaction;

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.InteractionSelect = undefined;

var _interaction = __webpack_require__(138);

var _interaction2 = _interopRequireDefault(_interaction);

var _select = __webpack_require__(243);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.InteractionSelect = _select2.default;
var mixins = exports.mixins = {
  interaction: _interaction2.default
};

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interaction = __webpack_require__(766);

var _interaction2 = _interopRequireDefault(_interaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_interaction2.default.install = function (Vue) {
  Vue.component(_interaction2.default.name, _interaction2.default);
};

exports.default = _interaction2.default;

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.LayerTile = exports.LayerVector = undefined;

var _layer = __webpack_require__(89);

var _layer2 = _interopRequireDefault(_layer);

var _tileBase = __webpack_require__(139);

var _tileBase2 = _interopRequireDefault(_tileBase);

var _vectorBase = __webpack_require__(140);

var _vectorBase2 = _interopRequireDefault(_vectorBase);

var _vector = __webpack_require__(246);

var _vector2 = _interopRequireDefault(_vector);

var _tile = __webpack_require__(245);

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.LayerVector = _vector2.default;
exports.LayerTile = _tile2.default;
var mixins = exports.mixins = {
  layer: _layer2.default,
  layerTile: _tileBase2.default,
  layerVector: _vectorBase2.default
};

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layer = __webpack_require__(767);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_layer2.default.install = function (Vue) {
  Vue.component(_layer2.default.name, _layer2.default);
};

exports.default = _layer2.default;

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layer = __webpack_require__(768);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_layer2.default.install = function (Vue) {
  Vue.component(_layer2.default.name, _layer2.default);
};

exports.default = _layer2.default;

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(769);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_map2.default.install = function (Vue) {
  Vue.component(_map2.default.name, _map2.default);
}; /**
    * VueLayers map component
    */
exports.default = _map2.default;

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.SourceWms = exports.SourceMapbox = exports.SourceOsm = exports.SourceXyz = exports.SourceVector = undefined;

var _source = __webpack_require__(90);

var _source2 = _interopRequireDefault(_source);

var _vectorBase = __webpack_require__(141);

var _vectorBase2 = _interopRequireDefault(_vectorBase);

var _tileBase = __webpack_require__(91);

var _tileBase2 = _interopRequireDefault(_tileBase);

var _xyzBase = __webpack_require__(63);

var _xyzBase2 = _interopRequireDefault(_xyzBase);

var _wmsBase = __webpack_require__(142);

var _wmsBase2 = _interopRequireDefault(_wmsBase);

var _vector = __webpack_require__(251);

var _vector2 = _interopRequireDefault(_vector);

var _xyz = __webpack_require__(253);

var _xyz2 = _interopRequireDefault(_xyz);

var _osm = __webpack_require__(250);

var _osm2 = _interopRequireDefault(_osm);

var _mapbox = __webpack_require__(249);

var _mapbox2 = _interopRequireDefault(_mapbox);

var _wms = __webpack_require__(252);

var _wms2 = _interopRequireDefault(_wms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.SourceVector = _vector2.default;
exports.SourceXyz = _xyz2.default;
exports.SourceOsm = _osm2.default;
exports.SourceMapbox = _mapbox2.default;
exports.SourceWms = _wms2.default;
var mixins = exports.mixins = {
  source: _source2.default,
  sourceVector: _vectorBase2.default,
  sourceTile: _tileBase2.default,
  sourceXyz: _xyzBase2.default,
  sourceWms: _wmsBase2.default
};

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(770);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(771);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(772);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(773);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(774);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _circle = __webpack_require__(775);

var _circle2 = _interopRequireDefault(_circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_circle2.default.install = function (Vue) {
  Vue.component(_circle2.default.name, _circle2.default);
};

exports.default = _circle2.default;

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _container = __webpack_require__(776);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_container2.default.install = function (Vue) {
  Vue.component(_container2.default.name, _container2.default);
};

exports.default = _container2.default;

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fill = __webpack_require__(777);

var _fill2 = _interopRequireDefault(_fill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fill2.default.install = function (Vue) {
  Vue.component(_fill2.default.name, _fill2.default);
};

exports.default = _fill2.default;

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _func = __webpack_require__(778);

var _func2 = _interopRequireDefault(_func);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_func2.default.install = function (Vue) {
  Vue.component(_func2.default.name, _func2.default);
};
exports.default = _func2.default;

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = __webpack_require__(779);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_icon2.default.install = function (Vue) {
  Vue.component(_icon2.default.name, _icon2.default);
};

exports.default = _icon2.default;

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.StyleFunc = exports.StyleIcon = exports.StyleCircle = exports.StyleStroke = exports.StyleFill = exports.StyleContainer = undefined;

var _style = __webpack_require__(35);

var _style2 = _interopRequireDefault(_style);

var _image = __webpack_require__(92);

var _image2 = _interopRequireDefault(_image);

var _target = __webpack_require__(45);

var _target2 = _interopRequireDefault(_target);

var _container = __webpack_require__(255);

var _container2 = _interopRequireDefault(_container);

var _fill = __webpack_require__(256);

var _fill2 = _interopRequireDefault(_fill);

var _stroke = __webpack_require__(260);

var _stroke2 = _interopRequireDefault(_stroke);

var _circle = __webpack_require__(254);

var _circle2 = _interopRequireDefault(_circle);

var _icon = __webpack_require__(258);

var _icon2 = _interopRequireDefault(_icon);

var _func = __webpack_require__(257);

var _func2 = _interopRequireDefault(_func);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.StyleContainer = _container2.default;
exports.StyleFill = _fill2.default;
exports.StyleStroke = _stroke2.default;
exports.StyleCircle = _circle2.default;
exports.StyleIcon = _icon2.default;
exports.StyleFunc = _func2.default;
var mixins = exports.mixins = {
  style: _style2.default,
  styleImage: _image2.default,
  styleTarget: _target2.default
};

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stroke = __webpack_require__(780);

var _stroke2 = _interopRequireDefault(_stroke);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_stroke2.default.install = function (Vue) {
  Vue.component(_stroke2.default.name, _stroke2.default);
};

exports.default = _stroke2.default;

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(781);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_view2.default.install = function (Vue) {
  Vue.component(_view2.default.name, _view2.default);
};

exports.default = _view2.default;

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coordTransform = undefined;
exports.extentFromLonLat = extentFromLonLat;
exports.extentToLonLat = extentToLonLat;
exports.pointToLonLat = pointToLonLat;
exports.pointFromLonLat = pointFromLonLat;
exports.lineToLonLat = lineToLonLat;
exports.lineFromLonLat = lineFromLonLat;
exports.polygonToLonLat = polygonToLonLat;
exports.polygonFromLonLat = polygonFromLonLat;
exports.multiPointToLonLat = multiPointToLonLat;
exports.multiPointFromLonLat = multiPointFromLonLat;
exports.multiLineToLonLat = multiLineToLonLat;
exports.multiLineFromLonLat = multiLineFromLonLat;
exports.multiPolygonToLonLat = multiPolygonToLonLat;
exports.multiPolygonFromLonLat = multiPolygonFromLonLat;

var _openlayers = __webpack_require__(23);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _consts = __webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {ol.Extent} extent
 * @param {ol.ProjectionLike} projection
 * @return {ol.Extent}
 */
function extentFromLonLat(extent) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return _openlayers2.default.proj.transformExtent(extent, _consts.DATA_PROJECTION, projection);
}

/**
 * @param {ol.Extent} extent
 * @param {ol.ProjectionLike} projection
 * @return {ol.Extent}
 */
function extentToLonLat(extent) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return _openlayers2.default.proj.transformExtent(extent, projection, _consts.DATA_PROJECTION);
}

function pointToLonLat(coordinate) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return _openlayers2.default.proj.toLonLat(coordinate, projection);
}
function pointFromLonLat(coordinate) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return _openlayers2.default.proj.fromLonLat(coordinate, projection);
}

function lineToLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (point) {
    return pointToLonLat(point, projection);
  });
}
function lineFromLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (point) {
    return pointFromLonLat(point, projection);
  });
}

function polygonToLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (line) {
    return lineToLonLat(line, projection);
  });
}
function polygonFromLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (line) {
    return lineFromLonLat(line, projection);
  });
}

function multiPointToLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (point) {
    return pointToLonLat(point, projection);
  });
}
function multiPointFromLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (point) {
    return pointFromLonLat(point, projection);
  });
}

function multiLineToLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (line) {
    return lineToLonLat(line, projection);
  });
}
function multiLineFromLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (line) {
    return lineFromLonLat(line, projection);
  });
}

function multiPolygonToLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (polygon) {
    return polygonToLonLat(polygon, projection);
  });
}
function multiPolygonFromLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (polygon) {
    return polygonFromLonLat(polygon, projection);
  });
}

var coordTransform = exports.coordTransform = {
  Point: {
    toLonLat: pointToLonLat,
    fromLonLat: pointFromLonLat
  },
  LineString: {
    toLonLat: lineToLonLat,
    fromLonLat: lineFromLonLat
  },
  Polygon: {
    toLonLat: polygonToLonLat,
    fromLonLat: polygonFromLonLat
  },
  MultiPoint: {
    toLonLat: multiPointToLonLat,
    fromLonLat: multiPointFromLonLat
  },
  MultiLineString: {
    toLonLat: multiLineToLonLat,
    fromLonLat: multiLineFromLonLat
  },
  MultiPolygon: {
    toLonLat: multiPolygonToLonLat,
    fromLonLat: multiPolygonFromLonLat
  }
};

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanProperties = undefined;

var _extends2 = __webpack_require__(49);

var _extends3 = _interopRequireDefault(_extends2);

exports.createFeature = createFeature;
exports.plainFeature = plainFeature;

var _openlayers = __webpack_require__(23);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _func = __webpack_require__(8);

var _consts = __webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var geoJsonFormat = new _openlayers2.default.format.GeoJSON();

var cleanProperties = exports.cleanProperties = (0, _func.omit)(['geometry']);

function createFeature() {
  var geoJson = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var featureProjection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  var feature = geoJsonFormat.readFeature((0, _extends3.default)({}, geoJson, {
    type: 'Feature',
    properties: cleanProperties(geoJson.properties || {})
  }), {
    featureProjection: featureProjection
  });
  feature.plain = function () {
    var featureProjection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _consts.MAP_PROJECTION;

    return plainFeature(this, featureProjection);
  };

  return feature;
}

function plainFeature(feature) {
  var featureProjection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return geoJsonFormat.writeFeatureObject(feature, {
    featureProjection: featureProjection
  });
}

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(48);

var _promise2 = _interopRequireDefault(_promise);

var _log = __webpack_require__(294);

var _log2 = _interopRequireDefault(_log);

exports.zoomToResolution = zoomToResolution;
exports.resolutionToZoom = resolutionToZoom;
exports.createAttributions = createAttributions;
exports.haversineDistance = haversineDistance;
exports.flyTo = flyTo;

var _openlayers = __webpack_require__(23);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _func = __webpack_require__(8);

var _consts = __webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {number} zoom
 * @param {number} [latitude=0.0]
 * @param {number} [tileSize=256]
 * @return {number}
 */
function zoomToResolution(zoom) {
  var latitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0;
  var tileSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _consts.TILE_SIZE;

  // meters per pixel at zoom = 0
  var mpp = 2 * Math.PI * _consts.EARTH_RADIUS / tileSize;

  return mpp * Math.cos(latitude) / Math.pow(2, zoom);
}
/**
 * @param {number} resolution
 * @param {number} [latitude=0.0]
 * @param {number} [tileSize=256]
 * @return {number}
 */
function resolutionToZoom(resolution) {
  var latitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0;
  var tileSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _consts.TILE_SIZE;

  // meters per pixel at zoom = 0
  var mpp = 2 * Math.PI * _consts.EARTH_RADIUS / tileSize;

  return Math.round(Math.log(mpp * Math.cos(latitude) / resolution) / Math.log(2));
}

/**
 * @param {string[]} attributions
 * @return {ol.Attribution[]}
 */
function createAttributions(attributions) {
  return (attributions || []).map(function (html) {
    return new _openlayers2.default.Attribution({ html: html });
  });
}

/**
 * @param {number[]} p1 First point in EPSG:4326
 * @param {number[]} p2 Second point in EPSG:4326
 * @return {number} Distance in meters.
 */
function haversineDistance(p1, p2) {
  return _consts.WGS84_SPHERE.haversineDistance(p1, p2);
}

/**
 * @param {ol.View} view
 * @param {number[]} coordinate Coordinate in EPSG:4326
 * @param {number} zoom
 * @return {Promise}
 */
function flyTo(view, coordinate, zoom) {
  var currentZoom = Math.ceil(view.getZoom());
  var currentCenter = _openlayers2.default.proj.toLonLat(view.getCenter(), view.getProjection());
  var distance = haversineDistance(currentCenter, coordinate);
  var duration = (0, _log2.default)(distance / 1000) * 1000;

  var centerPromise = new _promise2.default(function (resolve) {
    return view.animate({
      center: coordinate,
      duration: duration
    }, resolve);
  });

  var zoomPromise = void 0;
  if (currentZoom >= 10 && distance >= 10000 && !(0, _func.isEqual)(coordinate, currentCenter)) {
    zoomPromise = new _promise2.default(function (resolve) {
      return view.animate({
        zoom: Math.ceil(currentZoom / 2),
        duration: duration / 2
      }, {
        zoom: zoom,
        duration: duration / 2
      }, resolve);
    });
  } else {
    zoomPromise = new _promise2.default(function (resolve) {
      return view.animate({
        zoom: zoom,
        duration: duration
      });
    });
  }

  return _promise2.default.all([centerPromise, zoomPromise]);
}

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(47);

var _assign2 = _interopRequireDefault(_assign);

var _create = __webpack_require__(25);

var _create2 = _interopRequireDefault(_create);

var _extends2 = __webpack_require__(49);

var _extends3 = _interopRequireDefault(_extends2);

exports.getDefaultStyleHash = getDefaultStyleHash;
exports.transformStyleHash = transformStyleHash;
exports.createStyleFunc = createStyleFunc;
exports.transformStyle = transformStyle;
exports.normalizeColorValue = normalizeColorValue;
exports.transformFillStyle = transformFillStyle;
exports.transformStrokeStyle = transformStrokeStyle;
exports.transformImageStyle = transformImageStyle;
exports.transformTextStyle = transformTextStyle;
exports.defaultStyle = defaultStyle;
exports.defaultEditStyle = defaultEditStyle;

var _openlayers = __webpack_require__(23);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _func = __webpack_require__(8);

var _consts = __webpack_require__(46);

var consts = _interopRequireWildcard(_consts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Style helpers (get from geo-1.1)
// todo change to ol default
/**
 * @typedef {Object} GeoStyle
 *
 * Shared
 * @property {string|number[]|undefined} fillColor
 * @property {string|number[]|undefined} strokeColor
 * @property {number|undefined} strokeWidth
 * @property {number[]|undefined} strokeDash
 * @property {string|undefined} strokeCap
 * @property {string|undefined} strokeJoin
 * @property {number|undefined} zIndex
 *
 * Text only
 * @property {string|undefined} text
 * @property {string|undefined} textFont
 * @property {number|undefined} textFontSize
 * @property {number|undefined} textFillColor
 * @property {number|undefined} textStrokeColor
 * @property {number|undefined} textScale
 * @property {string|undefined} textAlign
 * @property {number|undefined} textRotation
 * @property {number|undefined} textOffsetX
 * @property {number|undefined} textOffsetY
 *
 * Icon only
 * @property {string|undefined} iconUrl
 * @property {Image|undefined} iconImg
 * @property {number[]|undefined} iconSize
 * @property {number[]|undefined} iconImgSize
 * @property {number|undefined} iconOffset
 * @property {number[]|undefined} iconAnchor
 * @property {number|undefined} iconScale
 * @property {number|undefined} iconRotation
 * @property {number|undefined} iconRadius
 * @property {number|undefined} iconRadius1
 * @property {number|undefined} iconRadius2
 * @property {number|undefined} iconPoints
 * @property {number|undefined} iconAngle
 * @property {number|undefined} iconOpacity
 * @property {ol.style.IconOrigin | undefined} iconAnchorOrigin
 * @property {ol.Color | string | undefined} iconColor
 * @property {ol.style.IconOrigin | undefined} iconOffsetOrigin
 */
function getDefaultStyleHash() {
  var default_ = {
    fillColor: [255, 255, 255, 0.7],
    strokeColor: [30, 54, 133, 1],
    strokeWidth: 2,
    strokeCap: 'round',
    strokeJoin: 'round',
    iconRadius: 7,
    textStrokeColor: [30, 54, 133, 1],
    textFillColor: [30, 54, 133, 1],
    textFont: 'sans-serif',
    textFontSize: 12,
    textStrokeWidth: 1
  };

  var select = (0, _extends3.default)({}, default_, {
    fillColor: [255, 255, 255, 0.8],
    strokeColor: [255, 121, 1, 1],
    textFillColor: [255, 121, 1, 1],
    textStrokeColor: [255, 121, 1, 1],
    zIndex: 1
  });

  var cluster = (0, _extends3.default)({}, default_, {
    text: '<%= item.clusterSize %>',
    iconUrl: null,
    iconImg: null,
    iconPoints: null,
    iconRadius: 20,
    textFontSize: 14,
    zIndex: 1
  });

  var modify = (0, _extends3.default)({}, default_, {
    fillColor: [255, 255, 255, 0.8],
    strokeColor: '#FF1E23',
    zIndex: 1
  });

  var current = (0, _extends3.default)({}, default_, {
    fillColor: [27, 226, 23, 0.8],
    strokeColor: [14, 118, 11, 1],
    strokeWidth: 4,
    zIndex: 1
  });

  return {
    default: [(0, _extends3.default)({}, default_)],
    select: [(0, _extends3.default)({}, select)],
    cluster: [(0, _extends3.default)({}, cluster)],
    remove: null,
    modify: [(0, _extends3.default)({}, modify)],
    current: [(0, _extends3.default)({}, current)]
  };
}

/**
 * @param {Object<string, GeoStyle[]>} styleHash
 * @return {Object<string, ol.style.Style[]>}
 * @function
 */
function transformStyleHash(styleHash) {
  var transformer = (0, _func.reduce)(function (olStyleHash, geoStyles, styleName) {
    if (geoStyles && geoStyles.length) {
      var olStyle = geoStyles.map(transformStyle);

      if (!(0, _func.isEmpty)(olStyle)) {
        olStyleHash[styleName] = olStyle;
      }
    }

    return olStyleHash;
  }, (0, _create2.default)(null));

  return transformer(styleHash);
}

/**
 * Returns style function for `styleHash` or default style function.
 *
 * @param {Object} [styleHash]
 * @return {ol.StyleFunction}
 */
function createStyleFunc(styleHash) {
  styleHash = (0, _func.merge)(getDefaultStyleHash(), styleHash);

  // Static pre-compilation
  var olStyleHash = transformStyleHash(styleHash);

  return (
    /**
     * @param {ol.Feature} feature
     * @return {ol.style.Style[]}
     */
    function __styleFunc(feature) {
      var styleName = feature.get('styleName') || 'default';

      return olStyleHash[styleName];
    }
  );
}

/**
 * @param {GeoStyle} geoStyle
 * @return {ol.style.Style|undefined}
 */
function transformStyle(geoStyle) {
  if ((0, _func.isEmpty)(geoStyle)) return;

  var olStyle = {
    text: transformTextStyle(geoStyle),
    fill: transformFillStyle(geoStyle),
    stroke: transformStrokeStyle(geoStyle),
    image: transformImageStyle(geoStyle),
    zIndex: geoStyle.zIndex
  };

  if (!(0, _func.isEmpty)(olStyle)) {
    return new _openlayers2.default.style.Style(olStyle);
  }
}

var addPrefix = function addPrefix(prefix) {
  return function (str) {
    return prefix + (prefix ? (0, _func.upperFirst)(str) : str);
  };
};

function normalizeColorValue(color) {
  if ((0, _func.isString)(color) && !/^rgb.*/.test(color) && color[0] !== '#') {
    color = '#' + color;
  }

  return color;
}

/**
 * @param {GeoStyle} geoStyle
 * @param {string} [prefix]
 * @returns {ol.style.Fill|undefined}
 */
function transformFillStyle(geoStyle) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var prefixKey = addPrefix(prefix);
  var keys = ['fillColor'].map(prefixKey);

  var transform = (0, _func.flow)((0, _func.pick)(keys), (0, _func.reduce)(function (result, value, name) {
    name = (0, _func.lowerFirst)(name.replace(new RegExp(prefixKey('fill')), ''));

    if (name === 'color') {
      value = normalizeColorValue(value);
    }

    result[name] = value;

    return result;
  }, {}));

  var fillStyle = transform(geoStyle);

  if (!(0, _func.isEmpty)(fillStyle)) {
    return new _openlayers2.default.style.Fill(fillStyle);
  }
}

/**
 * @param {GeoStyle} geoStyle
 * @param {string} [prefix]
 * @returns {ol.style.Stroke|undefined}
 */
function transformStrokeStyle(geoStyle) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var prefixKey = addPrefix(prefix);
  var keys = ['strokeColor', 'strokeWidth', 'strokeDash', 'strokeCap', 'strokeJoin'].map(prefixKey);

  var transform = (0, _func.flow)((0, _func.pick)(keys), (0, _func.reduce)(function (result, value, name) {
    switch (name) {
      case prefixKey('strokeColor'):
      case prefixKey('strokeWidth'):
        name = (0, _func.lowerFirst)(name.replace(new RegExp(prefixKey('stroke')), ''));
        break;
      case prefixKey('strokeDash'):
      case prefixKey('strokeCap'):
      case prefixKey('strokeJoin'):
        name = 'line' + name.replace(new RegExp(prefixKey('stroke')), '');
        break;
    }

    if (name === 'color') {
      value = normalizeColorValue(value);
    }

    result[name] = value;

    return result;
  }, {}));
  var strokeStyle = transform(geoStyle);

  if (!(0, _func.isEmpty)(strokeStyle)) {
    return new _openlayers2.default.style.Stroke(strokeStyle);
  }
}

/**
 * @param {GeoStyle} geoStyle
 * @returns {ol.style.Icon|ol.style.Circle|ol.style.RegularShape|undefined}
 */
function transformImageStyle(geoStyle) {
  if ((0, _func.isEmpty)(geoStyle.iconUrl) && (0, _func.isEmpty)(geoStyle.iconImg) && (0, _func.isEmpty)(geoStyle.iconPoints) && !(0, _func.isNumeric)(geoStyle.iconRadius)) {
    return;
  }

  var imageStyle = void 0;

  if (!(0, _func.isEmpty)(geoStyle.iconUrl) || !(0, _func.isEmpty)(geoStyle.iconImg)) {
    // then create ol.style.Icon options
    imageStyle = (0, _extends3.default)({}, geoStyle, {
      type: 'icon',
      anchor: geoStyle.iconAnchor,
      anchorOrigin: geoStyle.iconAnchorOrigin,
      color: geoStyle.iconColor,
      offset: geoStyle.iconOffset,
      offsetOrigin: geoStyle.iconOffsetOrigin,
      opacity: geoStyle.iconOpacity,
      scale: geoStyle.iconScale,
      rotation: geoStyle.iconRotation,
      size: geoStyle.iconSize,
      imgSize: geoStyle.iconImgSize,
      src: geoStyle.iconUrl,
      crossOrigin: 'anonymous'
    });
  } else if (geoStyle.iconPoints != null) {
    // create ol.style.RegularShape options
    imageStyle = (0, _extends3.default)({}, geoStyle, {
      type: 'shape',
      points: geoStyle.iconPoints,
      radius: geoStyle.iconRadius,
      radius1: geoStyle.iconRadius1,
      radius2: geoStyle.iconRadius2,
      angle: geoStyle.iconAngle,
      rotation: geoStyle.iconRotation
    });
  } else {
    // create ol.style.Circle options
    imageStyle = (0, _extends3.default)({}, geoStyle, {
      type: 'circle',
      radius: geoStyle.iconRadius
    });
  }

  imageStyle = (0, _extends3.default)({}, imageStyle, {
    fill: transformFillStyle(geoStyle, 'icon') || transformFillStyle(geoStyle),
    stroke: transformStrokeStyle(geoStyle, 'icon') || transformStrokeStyle(geoStyle),
    snapToPixel: true
  });

  if (!(0, _func.isEmpty)(imageStyle)) {
    return new _openlayers2.default.style[(0, _func.upperFirst)(imageStyle.type)](imageStyle);
  }
}

/**
 * @param {GeoStyle} geoStyle
 * @returns {ol.style.Text|undefined}
 */
function transformTextStyle(geoStyle) {
  // noinspection JSValidateTypes
  if (geoStyle.text == null) {
    return;
  }

  var textStyle = {
    text: geoStyle.text
  };

  var fontSize = geoStyle.textFontSize ? geoStyle.textFontSize + 'px' : undefined;
  var font = ['normal', fontSize, geoStyle.textFont].filter(function (x) {
    return !!x;
  }).join(' ');

  (0, _assign2.default)(textStyle, (0, _func.pick)(['textScale', 'textRotation', 'textOffsetX', 'textOffsetY', 'textAlign'])(geoStyle), {
    font: font,
    fill: transformFillStyle(geoStyle, 'text') || transformFillStyle(geoStyle),
    stroke: transformStrokeStyle(geoStyle, 'text') || transformStrokeStyle(geoStyle)
  });

  if (!(0, _func.isEmpty)(textStyle)) {
    return new _openlayers2.default.style.Text(textStyle);
  }
}

/**
 * Default OpenLayers styles
 *
 * @return {ol.style.Style[]}
 * @see {@link https://github.com/openlayers/openlayers/blob/master/src/ol/style/style.js#L290}
 */
function defaultStyle() {
  // We don't use an immediately-invoked function
  // and a closure so we don't get an error at script evaluation time in
  // browsers that do not support Canvas. (ol.style.Circle does
  // canvas.getContext('2d') at construction time, which will cause an.error
  // in such browsers.)
  var fill = new _openlayers2.default.style.Fill({
    color: 'rgba(255,255,255,0.4)'
  });
  var stroke = new _openlayers2.default.style.Stroke({
    color: '#3399CC',
    width: 1.25
  });
  return [new _openlayers2.default.style.Style({
    image: new _openlayers2.default.style.Circle({
      fill: fill,
      stroke: stroke,
      radius: 5
    }),
    fill: fill,
    stroke: stroke
  })];
}

/**
 * Default OpenLayers edit style.
 *
 * @return {Object.<consts.GEOMETRY_TYPE, Array.<ol.style.Style>>}
 * @see {@link https://github.com/openlayers/openlayers/blob/master/src/ol/style/style.js#L324}
 */
function defaultEditStyle() {
  /** @type {Object.<consts.GEOMETRY_TYPE, Array.<ol.style.Style>>} */
  var styles = {};
  var white = [255, 255, 255, 1];
  var blue = [0, 153, 255, 1];
  var width = 3;

  styles[consts.GEOMETRY_TYPE.LINE_STRING] = [new _openlayers2.default.style.Style({
    stroke: new _openlayers2.default.style.Stroke({
      color: white,
      width: width + 2
    })
  }), new _openlayers2.default.style.Style({
    stroke: new _openlayers2.default.style.Stroke({
      color: blue,
      width: width
    })
  })];
  styles[consts.GEOMETRY_TYPE.MULTI_LINE_STRING] = styles[consts.GEOMETRY_TYPE.LINE_STRING];

  styles[consts.GEOMETRY_TYPE.POLYGON] = [new _openlayers2.default.style.Style({
    fill: new _openlayers2.default.style.Fill({
      color: [255, 255, 255, 0.5]
    })
  })].concat(styles[consts.GEOMETRY_TYPE.LINE_STRING]);
  styles[consts.GEOMETRY_TYPE.MULTI_POLYGON] = styles[consts.GEOMETRY_TYPE.POLYGON];

  styles[consts.GEOMETRY_TYPE.CIRCLE] = styles[consts.GEOMETRY_TYPE.POLYGON].concat(styles[consts.GEOMETRY_TYPE.LINE_STRING]);

  styles[consts.GEOMETRY_TYPE.POINT] = [new _openlayers2.default.style.Style({
    image: new _openlayers2.default.style.Circle({
      radius: width * 2,
      fill: new _openlayers2.default.style.Fill({
        color: blue
      }),
      stroke: new _openlayers2.default.style.Stroke({
        color: white,
        width: width / 2
      })
    }),
    zIndex: Infinity
  })];
  styles[consts.GEOMETRY_TYPE.MULTI_POINT] = styles[consts.GEOMETRY_TYPE.POINT];

  styles[consts.GEOMETRY_TYPE.GEOMETRY_COLLECTION] = styles[consts.GEOMETRY_TYPE.POLYGON].concat(styles[consts.GEOMETRY_TYPE.LINE_STRING], styles[consts.GEOMETRY_TYPE.POINT]);

  return styles;
}

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fromOlEvent;

var _Observable = __webpack_require__(7);

__webpack_require__(726);

/**
 * Creates an Observable using OpenLayers event pattern that emits events of a specific type
 * coming from the given event target.
 *
 * @example <caption>Subscribe on view center change events</caption>
 * const map = ol.Map({ ... })
 * const changes = Observable.fromOlEvent(map.getView(), 'change:center')
 *
 * changes.subscribe(coordinate => console.log(coordinate))
 *
 * @param {ol.Object} target OpenLayers event target.
 * @param {string} eventName The event name of interest, being emitted by the `target`.
 * @param {function(...*): *} [selector] An optional function to post-process results. It takes the arguments
 *    from the event handler and should return a single value.
 * @return {Observable<T>}
 * @memberOf {Observable}
 */
function fromOlEvent(target, eventName, selector) {
  return _Observable.Observable.fromEventPattern(function (handler) {
    return target.on(eventName, handler);
  }, function (handler) {
    return target.un(eventName, handler);
  }, selector);
}

_Observable.Observable.fromOlEvent = fromOlEvent;

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(146);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(49);

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = __webpack_require__(144);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

__webpack_require__(810);

var _func = __webpack_require__(8);

var _highlight = __webpack_require__(374);

var _highlight2 = _interopRequireDefault(_highlight);

var _scss = __webpack_require__(162);

var _scss2 = _interopRequireDefault(_scss);

var _xml = __webpack_require__(163);

var _xml2 = _interopRequireDefault(_xml);

var _javascript = __webpack_require__(160);

var _javascript2 = _interopRequireDefault(_javascript);

var _bash = __webpack_require__(159);

var _bash2 = _interopRequireDefault(_bash);

var _json = __webpack_require__(161);

var _json2 = _interopRequireDefault(_json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

_highlight2.default.registerLanguage('scss', _scss2.default);
_highlight2.default.registerLanguage('xml', _xml2.default);
_highlight2.default.registerLanguage('javascript', _javascript2.default);
_highlight2.default.registerLanguage('json', _json2.default);
_highlight2.default.registerLanguage('bash', _bash2.default);

var computed = {
  selectedIds: function selectedIds() {
    return this.selected.map(function (_ref) {
      var id = _ref.id;
      return id;
    });
  },
  installHTML: function installHTML() {
    return __webpack_require__(755);
  },
  demoSrcHTML: function demoSrcHTML() {
    return __webpack_require__(754);
  }
};

var methods = {
  geometryTypeToCompName: function geometryTypeToCompName(type) {
    return 'vl-geom-' + (0, _func.kebabCase)(type);
  },
  updateMapView: function updateMapView(_ref2) {
    var center = _ref2.center,
        zoom = _ref2.zoom,
        rotation = _ref2.rotation;

    this.center = center;
    this.zoom = zoom;
    this.rotation = rotation;
  },
  updateGeoloc: function updateGeoloc(_ref3) {
    var position = _ref3.position;

    this.position = position;
  },
  select: function select(plainFeature) {
    var i = this.selectedIds.indexOf(plainFeature.id);
    if (i === -1) {
      this.selected.push(plainFeature);
    }
  },
  unselect: function unselect(_ref4) {
    var id = _ref4.id;

    var i = this.selectedIds.indexOf(id);
    if (i !== -1) {
      this.selected.splice(i, 1);
    }
  },
  loadData: function loadData() {
    var _this = this;

    return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var res, geomCollection;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch('https://openlayers.org/en/latest/examples/data/geojson/countries.geojson');

            case 2:
              res = _context.sent;
              _context.next = 5;
              return res.json();

            case 5:
              geomCollection = _context.sent;

              _this.countries = geomCollection.features.map(function (feature, i) {
                feature.properties = (0, _extends3.default)({}, feature.properties, {
                  color: i % 2 === 0 ? [49, 163, 84, 0.35] : [166, 100, 255, 0.35],
                  selectColor: (i + 1) % 2 !== 0 ? [221, 28, 119, 0.5] : undefined
                });

                return feature;
              });

              return _context.abrupt('return', _this.countries);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  selectStyleFunc: function selectStyleFunc(ol, styleHelper) {
    var styleName = 'select';
    var styleByFeature = {};
    var self = this;

    return function __selectStyleFunc(_ref5, resolution, layer) {
      var id = _ref5.id,
          properties = _ref5.properties;

      if (properties.selectColor) {
        var styles = (0, _func.get)([id, styleName], styleByFeature);
        if (!styles) {
          styles = [new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#8856a7',
              width: 4
            }),
            fill: new ol.style.Fill({
              color: properties.selectColor
            })
          })];

          (0, _func.set)([id, styleName], styles, styleByFeature);

          return styles;
        }
      }
    };
  },
  countriesStyleFunc: function countriesStyleFunc(ol, styleHelper) {
    var stroke = new ol.style.Stroke({
      color: '#8856a7',
      width: 1
    });
    var styleName = 'default';
    var styleByFeature = {};
    var self = this;

    return function __countriesStyleFunc(_ref6) {
      var id = _ref6.id,
          properties = _ref6.properties;

      var styles = (0, _func.get)([id, styleName], styleByFeature);
      if (!styles) {
        styles = [new ol.style.Style({
          stroke: stroke,
          fill: new ol.style.Fill({
            color: properties.color
          })
        })];

        (0, _func.set)([id, styleName], styles, styleByFeature);
      }

      return styles;
    };
  },
  pacmanStyleFunc: function pacmanStyleFunc(ol, styleHelper) {
    var pacman = [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#DE9147',
        width: 3
      }),
      fill: new ol.style.Fill({
        color: [222, 189, 36, 0.8]
      })
    })];
    var path = [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'blue',
        width: 1
      })
    }), new ol.style.Style({
      image: new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({
          color: 'orange'
        })
      }),
      geometry: function geometry(feature) {
        return new ol.geom.MultiPoint(feature.getGeometry().getCoordinates());
      }
    })];
    var eye = [new ol.style.Style({
      image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
          color: '#444444'
        })
      })
    })];

    return function __pacmanStyleFunc(feature) {
      switch (feature.id) {
        case 'pacman':
          return pacman;
        case 'pacman-path':
          return path;
        case 'pacman-eye':
          return eye;
      }
    };
  },
  toggleLayer: function toggleLayer(layer) {
    this.layers[layer] = !this.layers[layer];
  },
  selectFilter: function selectFilter(feature, layer) {
    return layer && ['my-position', 'pacman'].indexOf(layer) === -1;
  },
  showSourceCode: function showSourceCode() {
    this.sourceCode = true;
  }
};

var watch = {
  sourceCode: function sourceCode(value) {
    var _this2 = this;

    if (value) {
      this.$nextTick(function () {
        (0, _func.forEach)(_highlight2.default.highlightBlock.bind(_highlight2.default), _this2.$refs.sourceCode.querySelectorAll('pre > code'));
      });
    }
  }
};

exports.default = {
  name: 'app',
  computed: computed,
  watch: watch,
  methods: methods,
  data: function data() {
    return {
      zoom: 2,
      center: [0, 0],
      rotation: 0,
      selected: [],
      countries: [],
      pacman: __webpack_require__(544).features,
      position: [],
      layers: {
        osm: false,
        mapbox: true,
        countries: true,
        pacman: false,
        wms: false
      },
      sourceCode: false
    };
  },
  created: function created() {
    var _context2;

    this.loadData().catch((_context2 = console).error.bind(_context2));
  }
};

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperties = __webpack_require__(37);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _assign = __webpack_require__(47);

var _assign2 = _interopRequireDefault(_assign);

var _create = __webpack_require__(25);

var _create2 = _interopRequireDefault(_create);

var _v = __webpack_require__(228);

var _v2 = _interopRequireDefault(_v);

var _stubVnode = __webpack_require__(17);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

var _vmBind = __webpack_require__(16);

var _vmBind2 = _interopRequireDefault(_vmBind);

var _target = __webpack_require__(45);

var _target2 = _interopRequireDefault(_target);

var _debug = __webpack_require__(14);

var _vlOl = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrapper around ol.Feature.
 *
 * @todo Add property 'visible', like in layer. If visible = false -> set null style
 */
var props = {
  id: {
    type: [String, Number],
    default: function _default() {
      return (0, _v2.default)();
    }
  },
  properties: {
    type: Object,
    default: function _default() {
      return (0, _create2.default)(null);
    }
  }
};

var methods = {
  refresh: function refresh() {
    this.feature && this.feature.changed();
  },
  plain: function plain() {
    return this.feature && this.feature.plain(this.view.getProjection());
  },
  styleTarget: function styleTarget() {
    return this.feature;
  }
};

var watch = {
  id: function id(value) {
    this.feature && this.feature.setId(value);
  },
  properties: function properties(value) {
    this.feature && this.feature.setProperties(_vlOl.feature.cleanProperties(value));
  }
};

var styleTargetProvide = _target2.default.provide;
exports.default = {
  name: 'vl-feature',
  mixins: [_vmBind2.default, _stubVnode2.default, _target2.default],
  inject: ['layer', 'source', 'view'],
  props: props,
  methods: methods,
  watch: watch,
  stubVNode: {
    attrs: function attrs() {
      return {
        id: [this.$options.name, this.id].join('-')
      };
    }
  },
  provide: function provide() {
    var _this = this;

    return (0, _assign2.default)((0, _defineProperties2.default)((0, _create2.default)(null), {
      feature: {
        enumerable: true,
        get: function get() {
          return _this.feature;
        }
      }
    }), styleTargetProvide.call(this));
  },
  created: function created() {
    createFeature.call(this);
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      if (_this2.source) {
        _this2.source.addFeature(_this2.feature);
        Object.defineProperty(_this2.feature, 'layer', {
          enumerable: true,
          configurable: true,
          get: function get() {
            return _this2.layer;
          }
        });
      } else if (false) {
        (0, _debug.warn)("Invalid usage of feature component, should have source component among it's ancestors");
      }
    });
  },
  destroyed: function destroyed() {
    var _this3 = this;

    this.$nextTick(function () {
      if (_this3.source && _this3.source.getFeatureById(_this3.feature.getId())) {
        _this3.source.removeFeature(_this3.feature);
      }
      delete _this3.feature.layer;
      _this3.feature = undefined;
    });
  }
};

/**
 * Create feature without inner style applying, feature level style
 * will be applied in the layer level style function.
 *
 * @return {ol.Feature}
 */

function createFeature() {
  /**
   * @type {ol.Feature}
   * @protected
   */
  this.feature = _vlOl.feature.createFeature({
    id: this.id,
    properties: this.properties
  }, this.view.getProjection());

  this.bindSelfTo(this.feature);

  return this.feature;
}

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(145);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _vlRx = __webpack_require__(93);

var _vlRx2 = _interopRequireDefault(_vlRx);

var _debug = __webpack_require__(14);

var _func = __webpack_require__(8);

var _rxSubs = __webpack_require__(36);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _vmBind = __webpack_require__(16);

var _vmBind2 = _interopRequireDefault(_vmBind);

var _stubVnode = __webpack_require__(17);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  tracking: {
    type: Boolean,
    default: true
  },
  projection: {
    type: String,
    default: _vlOl.consts.MAP_PROJECTION
  }
};

var methods = {
  refresh: function refresh() {
    this.geoloc && this.geoloc.changed();
  },
  subscribeAll: function subscribeAll() {
    subscribeToGeolocation.call(this);
  }
};

var watch = {
  tracking: function tracking(value) {
    this.geoloc.setTracking(value);
  }
};

exports.default = {
  name: 'vl-geoloc',
  mixins: [_rxSubs2.default, _vmBind2.default, _stubVnode2.default],
  props: props,
  watch: watch,
  methods: methods,
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  data: function data() {
    return {
      currentPosition: undefined,
      currentAccuracy: undefined
    };
  },
  created: function created() {
    createGeolocApi.call(this);
    this.subscribeAll();
  },
  destroyed: function destroyed() {
    var _this = this;

    this.$nextTick(function () {
      _this.geoloc.setTracking(false);
      _this.geoloc = undefined;
    });
  }
};

/**
 * @return {ol.Geolocation}
 */

function createGeolocApi() {
  /**
   * @type {ol.Geolocation}
   * @protected
   */
  this.geoloc = new _vlOl2.default.Geolocation({
    tracking: this.tracking,
    projection: this.projection
  });

  this.bindSelfTo(this.geoloc);

  return this.geoloc;
}

function subscribeToGeolocation() {
  var _this2 = this;

  var geolocChanges = _vlRx2.default.combineLatest(_vlRx2.default.of().merge(_vlRx2.default.fromOlEvent(this.geoloc, 'change:position', function () {
    return _this2.geoloc.getPosition();
  })), _vlRx2.default.of().merge(_vlRx2.default.fromOlEvent(this.geoloc, 'change:accuracy', function () {
    return _this2.geoloc.getAccuracy();
  }))).throttleTime(1000).distinctUntilChanged(function (a, b) {
    return (0, _func.isEqual)(a, b);
  }).map(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        position = _ref2[0],
        accuracy = _ref2[1];

    return {
      position: _vlOl2.default.proj.toLonLat(_this2.geoloc.getPosition(), _this2.projection),
      accuracy: accuracy
    };
  });

  this.rxSubs.geoloc = geolocChanges.subscribe(function (_ref3) {
    var position = _ref3.position,
        accuracy = _ref3.accuracy;

    var changed = void 0;
    if (!(0, _func.isEqual)(position, _this2.currentPosition)) {
      _this2.currentPosition = position;
      changed = true;
    }
    if (accuracy !== _this2.currentAccuracy) {
      _this2.currentAccuracy = accuracy;
      changed = true;
    }

    changed && _this2.$emit('change', { position: position, accuracy: accuracy });
  }, function (err) {
    return (0, _debug.errordbg)(err.stack);
  });
}

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _geom = __webpack_require__(24);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length;
    }
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _vlOl2.default.geom.LineString(_vlOl.coord.lineFromLonLat(this.coordinates, this.view.getProjection()));
  }
};

exports.default = {
  name: 'vl-geom-line-string',
  mixins: [_geom2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _geom = __webpack_require__(24);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length;
    }
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _vlOl2.default.geom.MultiLineString(_vlOl.coord.multiLineFromLonLat(this.coordinates, this.view.getProjection()));
  }
};

exports.default = {
  name: 'vl-geom-multi-line-string',
  mixins: [_geom2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _geom = __webpack_require__(24);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length;
    }
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _vlOl2.default.geom.MultiPoint(_vlOl.coord.multiPointFromLonLat(this.coordinates, this.view.getProjection()));
  }
};

exports.default = {
  name: 'vl-geom-multi-point',
  mixins: [_geom2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _geom = __webpack_require__(24);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length;
    }
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _vlOl2.default.geom.MultiPolygon(_vlOl.coord.multiPolygonFromLonLat(this.coordinates, this.view.getProjection()));
  }
};

exports.default = {
  name: 'vl-geom-multi-polygon',
  mixins: [_geom2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _geom = __webpack_require__(24);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length === 2;
    }
  }
};

var methods = {
  /**
   * @return {ol.geom.Point}
   * @protected
   */
  createGeometry: function createGeometry() {
    return new _vlOl2.default.geom.Point(_vlOl.coord.pointFromLonLat(this.coordinates, this.view.getProjection()));
  }
};

exports.default = {
  name: 'vl-geom-point',
  mixins: [_geom2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _geom = __webpack_require__(24);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length;
    }
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _vlOl2.default.geom.Polygon(_vlOl.coord.polygonFromLonLat(this.coordinates, this.view.getProjection()));
  }
};

exports.default = {
  name: 'vl-geom-polygon',
  mixins: [_geom2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(47);

var _assign2 = _interopRequireDefault(_assign);

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _vlRx = __webpack_require__(93);

var _vlRx2 = _interopRequireDefault(_vlRx);

var _func = __webpack_require__(8);

var _debug = __webpack_require__(14);

var _interaction = __webpack_require__(138);

var _interaction2 = _interopRequireDefault(_interaction);

var _target = __webpack_require__(45);

var _target2 = _interopRequireDefault(_target);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// todo add other options, like event modifiers
var props = {
  multi: {
    type: Boolean,
    default: false
  },
  wrapX: {
    type: Boolean,
    default: true
  },
  selected: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  filter: {
    type: Function,
    default: (0, _func.constant)(true)
  }
};

var computed = {
  selectedIds: function selectedIds() {
    return this.currentSelected.map(function (feature) {
      return feature.id;
    });
  }
};

var _interaction$methods = _interaction2.default.methods,
    interactionRefresh = _interaction$methods.refresh,
    interactionMountInteraction = _interaction$methods.mountInteraction,
    interactionUnmountInteraction = _interaction$methods.unmountInteraction;

var defaultStyles = _vlOl.style.defaultEditStyle();

var methods = {
  /**
   * @protected
   */
  subscribeAll: function subscribeAll() {
    subscribeToInteractionChanges.call(this);
  },

  /**
   * @return {ol.interaction.Select}
   * @protected
   */
  createInteraction: function createInteraction() {
    // define default select style, will be used by styleTarget style function
    this.defaultStyles = function __selectDefaultStyleFunc(feature) {
      if (feature.getGeometry()) {
        return defaultStyles[feature.getGeometry().getType()];
      }
    };
    var style = (0, _target.createStyleFunc)(this);

    var filterFunc = this.filter;
    var filter = function __selectFilter(feature, layer) {
      return filterFunc(feature.plain(), layer && layer.id);
    };

    return new _vlOl2.default.interaction.Select({
      multi: this.multi,
      wrapX: this.wrapX,
      filter: filter,
      style: style
    });
  },
  refresh: function refresh() {
    this.interaction && this.interaction.getFeatures().changed();
    interactionRefresh.call(this);
  },

  /**
   * @param {Object} plainFeature
   * @param {string|number} plainFeature.id
   */
  select: function select(_ref) {
    var id = _ref.id;

    if (!this.map || this.selectedIds.includes(id)) return;

    var selection = this.interaction.getFeatures();
    var feature = void 0;

    if (id) {
      var layers = this.map.getLayers().getArray().filter(function (layer) {
        return layer instanceof _vlOl2.default.layer.Vector;
      });

      (0, _func.forEach)(function (layer) {
        feature = layer.getSource().getFeatureById(id);
        return !feature;
      }, layers);
    }

    feature && selection.push(feature);
  },

  /**
   * @param {Object} plainFeature
   * @param {string|number} plainFeature.id
   */
  unselect: function unselect(_ref2) {
    var id = _ref2.id;

    if (!this.map || !this.selectedIds.includes(id)) return;

    var selection = this.interaction.getFeatures();
    var selectionArray = selection.getArray();
    var idx = selectionArray.findIndex(function (feature) {
      return feature.getId() === id;
    });

    if (idx !== -1) {
      selection.removeAt(idx);
    }
  },
  unselectAll: function unselectAll() {
    this.interaction.getFeatures().clear();
  },
  styleTarget: function styleTarget() {
    return this.interaction;
  },
  setStyle: function setStyle(style) {
    this.styles = style;
    this.refresh();
  },
  mountInteraction: function mountInteraction() {
    interactionMountInteraction.call(this);
    this.currentSelected.forEach(this.select);
  },
  unmountInteraction: function unmountInteraction() {
    this.currentSelected.forEach(this.unselect);
    interactionUnmountInteraction.call(this);
  }
};

var watch = {
  selected: function selected(_selected) {
    var forSelect = (0, _func.diffById)(_selected, this.currentSelected);
    var forUnselect = (0, _func.diffById)(this.currentSelected, _selected);

    forSelect.forEach(this.select);
    forUnselect.forEach(this.unselect);
  }
};

var interactionProvide = _interaction2.default.provide;
var styleTargetProvide = _target2.default.provide;
exports.default = {
  name: 'vl-interaction-select',
  mixins: [_interaction2.default, _target2.default],
  inject: ['map'],
  props: props,
  computed: computed,
  methods: methods,
  watch: watch,
  stubVNode: {
    empty: false,
    attrs: function attrs() {
      return {
        id: this.$options.name
      };
    }
  },
  provide: function provide() {
    return (0, _assign2.default)(interactionProvide.call(this), styleTargetProvide.call(this));
  },
  data: function data() {
    return {
      currentSelected: this.selected.slice()
    };
  }
};


function subscribeToInteractionChanges() {
  var _this = this;

  var selection = this.interaction.getFeatures();

  this.rxSubs.select = _vlRx2.default.fromOlEvent(selection, 'add', function (evt) {
    return evt.element.plain();
  }).subscribe(function (feature) {
    _this.currentSelected.push(feature);
    _this.$emit('select', feature);
  }, function (err) {
    return (0, _debug.errordbg)(err.stack);
  });
  this.rxSubs.unselect = _vlRx2.default.fromOlEvent(selection, 'remove', function (evt) {
    return evt.element.plain();
  }).subscribe(function (feature) {
    _this.currentSelected = _this.currentSelected.filter(function (_ref3) {
      var id = _ref3.id;
      return id !== feature.id;
    });
    _this.$emit('unselect', feature);
  }, function (err) {
    return (0, _debug.errordbg)(err.stack);
  });
}

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tileBase = __webpack_require__(139);

var _tileBase2 = _interopRequireDefault(_tileBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

exports.default = {
  name: 'vl-layer-tile',
  mixins: [_tileBase2.default],
  props: props
};

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vectorBase = __webpack_require__(140);

var _vectorBase2 = _interopRequireDefault(_vectorBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

exports.default = {
  name: 'vl-layer-vector',
  mixins: [_vectorBase2.default],
  props: props
};

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(25);

var _create2 = _interopRequireDefault(_create);

var _defineProperties = __webpack_require__(37);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _openlayers = __webpack_require__(23);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _vmBind = __webpack_require__(16);

var _vmBind2 = _interopRequireDefault(_vmBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//

var props = {
  loadTilesWhileAnimating: {
    type: Boolean,
    default: false
  },
  loadTilesWhileInteracting: {
    type: Boolean,
    default: false
  },
  pixelRatio: {
    type: Number,
    default: 1
  },
  renderer: [String, Array],
  logo: [String, Object],
  keyboardEventTarget: [String, Node],
  tabIndex: {
    type: Number,
    default: 0
  }
};

var methods = {
  /**
   * Updates `ol.Map` view
   */
  refresh: function refresh() {
    if (this.map) {
      this.map.updateSize();
      this.map.render();
    }
  },

  /**
   * Trigger focus on map container.
   */
  focus: function focus() {
    this.$refs.map.focus();
  }
};

exports.default = {
  name: 'vl-map',
  mixins: [_vmBind2.default],
  props: props,
  methods: methods,
  provide: function provide() {
    var _this = this;

    return (0, _defineProperties2.default)((0, _create2.default)(null), {
      map: {
        enumerable: true,
        get: function get() {
          return _this.map;
        }
      },
      view: {
        enumerable: true,
        get: function get() {
          return _this.map.getView();
        }
      }
    });
  },
  created: function created() {
    createMap.call(this);
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.map.setTarget(_this2.$refs.map);
      _this2.refresh();
    });
  },
  destroyed: function destroyed() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3.map.setTarget(undefined);
      _this3.map = undefined;
    });
  }
};

/**
 * @return {ol.Map}
 */

function createMap() {
  /**
   * @type {ol.Map}
   * @protected
   */
  this.map = new _openlayers2.default.Map({
    layers: [],
    // todo disable all default interaction and controls and use custom if defined, wrap all
    //      interactions: [],
    //      controls: [],
    loadTilesWhileAnimating: this.loadTilesWhileAnimating,
    loadTilesWhileInteracting: this.loadTilesWhileInteracting,
    pixelRatio: this.pixelRatio,
    renderer: this.renderer,
    logo: this.logo,
    keyboardEventTarget: this.keyboardEventTarget
  });

  this.bindSelfTo(this.map);

  return this.map;
}

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xyzBase = __webpack_require__(63);

var _xyzBase2 = _interopRequireDefault(_xyzBase);

var _func = __webpack_require__(8);

var _vlOl = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAPBOX_URL_TEMPLATE = 'https://{a-c}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}{tileNameSuffix}.{tileFormat}?access_token={accessToken}';
var MAPBOX_ATTRIBUTIONS = '© <a href="https://www.mapbox.com/">MapBox</a>, ' + new Date().getFullYear();

var props = {
  url: {
    type: String,
    default: MAPBOX_URL_TEMPLATE
  },
  accessToken: {
    type: String,
    required: true
  },
  mapId: {
    type: String,
    required: true
  },
  attributions: {
    type: String,
    default: MAPBOX_ATTRIBUTIONS
  },
  tileFormat: {
    type: String,
    default: 'png'
  }
};

var computed = {
  // bind to constant values: projection and tile size
  currentProjection: (0, _func.constant)(_vlOl.consts.MAP_PROJECTION),
  currentTileSize: (0, _func.constant)([_vlOl.consts.TILE_SIZE, _vlOl.consts.TILE_SIZE]),
  tileNameSuffix: function tileNameSuffix() {
    return _tileNameSuffix(this.tilePixelRatio);
  },
  urlTokens: function urlTokens() {
    return ['mapId', 'accessToken', 'tileNameSuffix', 'tileFormat'];
  }
};

exports.default = {
  name: 'vl-source-mapbox',
  mixins: [_xyzBase2.default],
  props: props,
  computed: computed
};

/**
 * @param {number} [ratio]
 * @returns {number}
 * @private
 */

function tileRatio(ratio) {
  ratio = (0, _func.coalesce)(ratio, 1);

  return ratio > 1 ? 2 : 1;
}

/**
 * @param {number} [ratio]
 * @returns {string}
 * @private
 */
function _tileNameSuffix(ratio) {
  ratio = tileRatio(ratio);

  return ratio > 1 ? ['@', ratio, 'x'].join('') : '';
}

/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _xyzBase = __webpack_require__(63);

var _xyzBase2 = _interopRequireDefault(_xyzBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  attributions: {
    type: String,
    default: _vlOl2.default.source.OSM.ATTRIBUTION.getHTML()
  },
  url: {
    type: String,
    default: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  maxZoom: {
    type: Number,
    default: 19
  }
};

var methods = {
  createSource: function createSource() {
    // always EPSG:3857, size: 256x256, format png
    return new _vlOl2.default.source.OSM({
      url: this.currentUrl,
      attributions: this.currentAttributions,
      crossOrigin: this.crossOrigin,
      maxZoom: this.currentMaxZoom,
      cacheSize: this.cacheSize,
      opaque: this.opaque,
      reprojectionErrorThreshold: this.reprojectionErrorThreshold,
      wrapX: this.wrapX
    });
  }
};

exports.default = {
  name: 'vl-source-osm',
  mixins: [_xyzBase2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vectorBase = __webpack_require__(141);

var _vectorBase2 = _interopRequireDefault(_vectorBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

exports.default = {
  name: 'vl-source-vector',
  mixins: [_vectorBase2.default],
  props: props
};

/***/ }),

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wmsBase = __webpack_require__(142);

var _wmsBase2 = _interopRequireDefault(_wmsBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

exports.default = {
  name: 'vl-source-wms',
  mixins: [_wmsBase2.default],
  props: props
};

/***/ }),

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xyzBase = __webpack_require__(63);

var _xyzBase2 = _interopRequireDefault(_xyzBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

exports.default = {
  name: 'vl-source-xyz',
  mixins: [_xyzBase2.default],
  props: props
};

/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _image = __webpack_require__(92);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  radius: {
    type: Number,
    default: 5
  },
  snapToPixel: {
    type: Boolean,
    default: true
  }
};

var methods = {
  /**
   * @return {ol.style.Circle}
   * @protected
   */
  createStyle: function createStyle() {
    return new _vlOl2.default.style.Circle({
      radius: this.radius,
      snapToPixel: this.snapToPixel,
      fill: this.fill,
      stroke: this.stroke
    });
  }
};

var watch = {
  radius: function radius() {
    this.refresh();
  },
  snapToPixel: function snapToPixel() {
    this.refresh();
  }
};

exports.default = {
  name: 'vl-style-circle',
  mixins: [_image2.default],
  props: props,
  methods: methods,
  watch: watch,
  provide: function provide() {
    return {
      setFill: setFill.bind(this),
      setStroke: setStroke.bind(this)
    };
  }
};
// todo do not recreate if already create and has fill/stroke, use setters instead

function setFill(fill) {
  /**
   * @type {ol.style.Fill}
   * @private
   */
  this.fill = fill;
  this.refresh();
}

function setStroke(stroke) {
  /**
   * @type {ol.style.Stroke}
   * @private
   */
  this.stroke = stroke;
  this.refresh();
}

/***/ }),

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _debug = __webpack_require__(14);

var _func = __webpack_require__(8);

var _style = __webpack_require__(35);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ol.style.Style wrapper.
 * Acts as an style container that will be injected into "style" slot inside layer or feature components.
 */
var props = {
  zIndex: Number,
  condition: {
    type: [Function, Boolean],
    default: true
  }
};

var methods = {
  /**
   * @return {ol.style.Style}
   * @protected
   */
  createStyle: function createStyle() {
    return new _vlOl2.default.style.Style({
      zIndex: this.zIndex,
      fill: this.fill,
      stroke: this.stroke,
      image: this.image
    });
  },
  mountStyle: function mountStyle() {
    var currentStyle = this.getStyle() || [];
    if (currentStyle && !Array.isArray(currentStyle)) {
      if ((0, _func.isFunction)(currentStyle) && "production" !== 'production') {
        (0, _debug.warn)('Avoid combining vl-style-func and vl-style-container components on the same level ' + 'because it can lead to the wrong result');
      }
      currentStyle = [];
    }

    currentStyle.push({
      style: this.style,
      condition: this.condition
    });
    this.setStyle(currentStyle);
  },
  unmountStyle: function unmountStyle() {
    var _this = this;

    var currentStyle = this.getStyle() || [];
    if (currentStyle && !Array.isArray(currentStyle)) {
      if ((0, _func.isFunction)(currentStyle) && "production" !== 'production') {
        (0, _debug.warn)('Style target already has defined style that is not an array. ' + 'Avoid combining vl-style-func and vl-style-container components on the same level ' + 'because it can lead to the wrong result');
      }
      currentStyle = [];
    }

    currentStyle = currentStyle.filter(function (s) {
      return s.style !== _this.style;
    });
    currentStyle.length || (currentStyle = undefined);
    this.setStyle(currentStyle);
  }
};

var watch = {
  zIndex: function zIndex(value) {
    this.style.setZIndex(value);
  },
  geomType: function geomType() {
    this.refresh();
  }
};

exports.default = {
  name: 'vl-style-container',
  mixins: [_style2.default],
  inject: ['setStyle', 'getStyle'],
  props: props,
  methods: methods,
  watch: watch,
  stubVNode: {
    empty: false,
    attrs: function attrs() {
      return {
        id: this.$options.name
      };
    }
  },
  provide: function provide() {
    return {
      setFill: setFill.bind(this),
      setStroke: setStroke.bind(this),
      setImage: setImage.bind(this)
    };
  }
};


function setFill(fill) {
  /**
   * @type {ol.style.Fill}
   * @protected
   */
  this.fill = fill;

  if (this.style) {
    this.style.setFill(this.fill);
    this.refresh();
  }
}

function setStroke(stroke) {
  /**
   * @type {ol.style.Stroke}
   * @protected
   */
  this.stroke = stroke;

  if (this.style) {
    this.style.setStroke(this.stroke);
    this.refresh();
  }
}

function setImage(image) {
  /**
   * @type {ol.style.Image}
   * @protected
   */
  this.image = image;

  if (this.style) {
    this.style.setImage(this.image);
    this.refresh();
  }
}

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _style = __webpack_require__(35);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  color: [String, Array]
};

var methods = {
  /**
   * @return {ol.style.Fill}
   * @protected
   */
  createStyle: function createStyle() {
    return new _vlOl2.default.style.Fill({
      color: this.color
    });
  },

  /**
   * @protected
   */
  mountStyle: function mountStyle() {
    this.setFill(this.style);
  },

  /**
   * @protected
   */
  unmountStyle: function unmountStyle() {
    this.setFill(undefined);
  }
};

var watch = {
  color: function color(value) {
    this.style.setColor(value);
    this.refresh();
  }
};

exports.default = {
  name: 'vl-style-fill',
  mixins: [_style2.default],
  inject: ['setFill'],
  props: props,
  methods: methods,
  watch: watch
};

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(297);

var _typeof3 = _interopRequireDefault(_typeof2);

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _style = __webpack_require__(35);

var _style2 = _interopRequireDefault(_style);

var _target = __webpack_require__(45);

var _target2 = _interopRequireDefault(_target);

var _debug = __webpack_require__(14);

var _func = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  factory: {
    type: Function,
    required: true
  }
};
/**
 * Style function component for advanced styling.
 * Plays the role of both a style that mounts itself to style target (layer, feature & etc.)
 * and style target for inner style containers.
 */


var methods = {
  /**
   * @return {ol.style.Style}
   * @protected
   */
  createStyle: function createStyle() {
    // fallback style function made from inner style containers
    var fallbackStyleFunc = (0, _target.createStyleFunc)(this);
    // user provided style function
    var providedStyleFunc = this.factory(_vlOl2.default, _vlOl.style);
    if (!(0, _func.isFunction)(providedStyleFunc)) {
      if (false) {
        var type = typeof providedStyleFunc === 'undefined' ? 'undefined' : (0, _typeof3.default)(providedStyleFunc);
        (0, _debug.warn)('Style function factory returned value is of type ' + type + ', expected type is Function');
      }
      providedStyleFunc = _func.noop;
    }

    return function __styleFunc(feature, resolution) {
      var plainFeature = feature.plain();
      var layer = feature.layer || {};

      var styles = providedStyleFunc(plainFeature, resolution, layer.id);

      if (styles === null || !(0, _func.isEmpty)(styles)) return styles;

      return fallbackStyleFunc(feature, resolution);
    };
  },
  mountStyle: function mountStyle() {
    var currentStyle = this.stGetStyle();
    if (currentStyle && "production" !== 'production') {
      (0, _debug.warn)('Style target already has defined style. Avoid use of multiple vl-style-func or ' + 'combining vl-style-func and vl-style-container components on the same level');
    }
    this.stSetStyle(this.style);
  },
  unmountStyle: function unmountStyle() {
    this.stSetStyle(undefined);
  },
  setFallbackStyle: function setFallbackStyle(style) {
    // simply save all inner styles and
    // use them later in style function as fallback
    this.styles = style;
  },
  getFallbackStyle: function getFallbackStyle() {
    return this.styles;
  }
};

var watch = {
  factory: function factory() {
    // todo implement
  }
};

exports.default = {
  name: 'vl-style-func',
  mixins: [_style2.default, _target2.default],
  inject: {
    stSetStyle: 'setStyle',
    stGetStyle: 'getStyle'
  },
  provide: false, // reset provide from style target mixin
  stubVNode: {
    empty: false,
    attrs: function attrs() {
      return {
        id: this.$options.name
      };
    }
  },
  props: props,
  methods: methods,
  watch: watch,
  created: function created() {
    // custom provide of setStyle / getStyle methods to mirror style target between
    // real style target (layer, feature) and style container
    // defined here because Vue starts checking of provided key from self instance
    // todo rewrite without using Vue internals
    this._provided = {
      setStyle: this.setFallbackStyle.bind(this),
      getStyle: this.getFallbackStyle.bind(this)
    };
  }
};

/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _image = __webpack_require__(92);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  src: {
    type: String,
    required: true
  },
  size: {
    type: Array,
    validator: function validator(value) {
      return Array.isArray(value) && value.length === 2;
    }
  },
  anchor: {
    type: Array,
    default: function _default() {
      return [0.5, 0.5];
    }
  },
  anchorOrigin: {
    type: String,
    default: 'top-left' // bottom-left, bottom-right, top-left or top-right
  },
  anchorXUnits: {
    type: String,
    default: 'fraction' // pixels, fraction
  },
  anchorYUnits: {
    type: String,
    default: 'fraction' // pixels, fraction
  },
  color: Array,
  crossOrigin: {
    type: String,
    default: 'anonymous'
  },
  offset: {
    type: Array,
    default: function _default() {
      return [0, 0];
    }
  },
  offsetOrigin: {
    type: String,
    default: 'top-left' // bottom-left, bottom-right, top-left or top-right
  },
  opacity: {
    type: Number,
    default: 1
  },
  scale: {
    type: Number,
    default: 1
  },
  snapToPixel: {
    type: Boolean,
    default: true
  },
  rotateWithView: {
    type: Boolean,
    default: false
  },
  rotation: {
    type: Number,
    default: 0
  }
};

var methods = {
  /**
   * @return {ol.style.Icon}
   * @protected
   */
  createStyle: function createStyle() {
    return new _vlOl2.default.style.Icon({
      anchor: this.anchor,
      anchorOrigin: this.anchorOrigin,
      anchorXUnits: this.anchorXUnits,
      anchorYUnits: this.anchorYUnits,
      color: this.color,
      crossOrigin: this.crossOrigin,
      offset: this.offset,
      offsetOrigin: this.offsetOrigin,
      opacity: this.opacity,
      scale: this.scale,
      snapToPixel: this.snapToPixel,
      rotateWithView: this.rotateWithView,
      rotation: this.rotation,
      size: this.size,
      src: this.src
    });
  }
};
// todo other watchers
var watch = {
  src: function src() {
    this.refresh();
  },
  size: function size() {
    this.refresh();
  },
  anchor: function anchor() {
    this.refresh();
  },
  scale: function scale() {
    this.refresh();
  }
};

exports.default = {
  name: 'vl-style-icon',
  mixins: [_image2.default],
  props: props,
  methods: methods,
  watch: watch
};

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _style = __webpack_require__(35);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  color: [Array, String],
  lineCap: {
    type: String,
    default: 'round' // round, butt, square
  },
  lineJoin: {
    type: String,
    default: 'round' // round, bevel, miter
  },
  lineDash: Array,
  lineDashOffset: Number,
  miterLimit: Number,
  width: {
    type: Number,
    default: 1.25
  }
};

var methods = {
  /**
   * @return {ol.style.Stroke}
   * @protected
   */
  createStyle: function createStyle() {
    return new _vlOl2.default.style.Stroke({
      color: this.color,
      lineCap: this.lineCap,
      lineJoin: this.lineJoin,
      lineDash: this.lineDash,
      lineDashOffset: this.lineDashOffset,
      miterLimit: this.miterLimit,
      width: this.width
    });
  },

  /**
   * @protected
   */
  mountStyle: function mountStyle() {
    this.setStroke(this.style);
  },

  /**
   * @protected
   */
  unmountStyle: function unmountStyle() {
    this.setStroke(undefined);
  }
};

var watch = {
  color: function color(value) {
    this.style.setColor(value);
    this.refresh();
  },
  lineCap: function lineCap(value) {
    this.style.setLineCap(value);
    this.refresh();
  },
  lineDash: function lineDash(value) {
    this.style.setLineDash(value);
    this.refresh();
  },
  lineJoin: function lineJoin(value) {
    this.style.setLineJoin(value);
    this.refresh();
  },
  width: function width(value) {
    this.style.setWidth(value);
    this.refresh();
  }
  // todo добавить остальный вотчеры

};

exports.default = {
  name: 'vl-style-stroke',
  mixins: [_style2.default],
  inject: ['setStroke'],
  props: props,
  watch: watch,
  methods: methods
};

/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(145);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = __webpack_require__(48);

var _promise2 = _interopRequireDefault(_promise);

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _vlRx = __webpack_require__(93);

var _vlRx2 = _interopRequireDefault(_vlRx);

var _func = __webpack_require__(8);

var _debug = __webpack_require__(14);

var _rxSubs = __webpack_require__(36);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _vmBind = __webpack_require__(16);

var _vmBind2 = _interopRequireDefault(_vmBind);

var _stubVnode = __webpack_require__(17);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  zoom: {
    type: Number,
    default: _vlOl.consts.MIN_ZOOM
  },
  center: {
    type: Array,
    default: function _default() {
      return [0, 0];
    },
    validator: function validator(value) {
      return value.length === 2;
    }
  },
  rotation: {
    type: Number,
    default: 0
  },
  maxZoom: {
    type: Number,
    default: _vlOl.consts.MAX_ZOOM
  },
  minZoom: {
    type: Number,
    default: _vlOl.consts.MIN_ZOOM
  },
  projection: {
    type: String,
    default: _vlOl.consts.MAP_PROJECTION
  },
  enableRotation: {
    type: Boolean,
    default: true
  },
  extent: {
    type: Array,
    validator: function validator(value) {
      return value.length === 4;
    }
  },
  maxResolution: Number,
  minResolution: Number,
  resolution: Array,
  zoomFactor: {
    type: Number,
    default: _vlOl.consts.ZOOM_FACTOR
  }
};

var methods = {
  /**
   * @see {@link https://openlayers.org/en/latest/apidoc/ol.View.html#fit}
   */
  fit: function fit(geometryOrExtent, options) {
    this.view && this.view.fit(geometryOrExtent, options);
  },

  /**
   * @see {@link https://openlayers.org/en/latest/apidoc/ol.View.html#animate}
   * @param {...Object} args
   * @return {Promise}
   */
  animate: function animate() {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var cb = args.find(_func.isFunction);

    if (!this.view) return _promise2.default.resolve();

    return new _promise2.default(function (resolve) {
      var _view;

      return (_view = _this.view).animate.apply(_view, args.concat([function (complete) {
        cb && cb(complete);
        resolve(complete);
      }]));
    });
  },
  refresh: function refresh() {
    this.view && this.view.changed();
  },
  setCurrentView: function setCurrentView(_ref) {
    var center = _ref.center,
        zoom = _ref.zoom,
        rotation = _ref.rotation;

    if (!this.view) return;

    if (center != null && !(0, _func.isEqual)(center, this.currentCenter)) {
      this.view.setCenter(_vlOl2.default.proj.fromLonLat(center, this.projection));
    }
    if (zoom != null && zoom !== this.currentZoom) {
      this.view.setZoom(zoom);
    }
    if (rotation != null && rotation !== this.currentRotation) {
      this.view.setRotation(rotation);
    }
  },
  subscribeAll: function subscribeAll() {
    subscribeToViewChanges.call(this);
  },
  mountView: function mountView() {
    if (!this.map) {
      (0, _debug.warn)("Invalid usage of view component, should have map component among it's ancestors");
    }

    var view = this.map.getView();

    if (view && view.$vm) {
      if (false) {
        (0, _debug.warn)('Map already has mounted vl-view component. ' + 'It will be replaced with new.');
      }
      view.$vm.unmountView();
    }

    this.map.setView(this.view);
    this.subscribeAll();
  },
  unmountView: function unmountView() {
    this.unsubscribeAll();
    this.map && this.map.setView(undefined);
  }
};
// todo watch other props
var watch = {
  center: function center(_center) {
    this.setCurrentView({ center: _center });
  },
  zoom: function zoom(_zoom) {
    this.setCurrentView({ zoom: _zoom });
  },
  rotation: function rotation(_rotation) {
    this.setCurrentView({ rotation: _rotation });
  }
};

exports.default = {
  name: 'vl-view',
  inject: ['map'],
  mixins: [_rxSubs2.default, _vmBind2.default, _stubVnode2.default],
  props: props,
  methods: methods,
  watch: watch,
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  data: function data() {
    return {
      currentZoom: this.zoom,
      currentCenter: this.center.slice(),
      currentRotation: this.rotation
    };
  },
  created: function created() {
    createView.call(this);
  },
  mounted: function mounted() {
    this.$nextTick(this.mountView);
  },
  destroyed: function destroyed() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.unmountView();
      _this2.view = undefined;
    });
  }
};

/**
 * @return {ol.View}
 */

function createView() {
  /**
   * @type {ol.View}
   * @protected
   */
  this.view = new _vlOl2.default.View({
    center: _vlOl2.default.proj.fromLonLat(this.currentCenter, this.projection),
    zoom: this.currentZoom,
    maxZoom: this.maxZoom,
    minZoom: this.minZoom,
    projection: this.projection
  });

  this.bindSelfTo(this.view);

  return this.view;
}

/**
 * Subscribe to OpenLayers significant events
 */
function subscribeToViewChanges() {
  var _this3 = this;

  var viewChanges = _vlRx2.default.combineLatest(_vlRx2.default.of(this.view.getCenter()).merge(_vlRx2.default.fromOlEvent(this.view, 'change:center', function () {
    return _this3.view.getCenter();
  })), _vlRx2.default.of(this.view.getZoom()).merge(_vlRx2.default.fromOlEvent(this.view, 'change:resolution', function () {
    return _this3.view.getZoom();
  })), _vlRx2.default.of(this.view.getRotation()).merge(_vlRx2.default.fromOlEvent(this.view, 'change:rotation', function () {
    return _this3.view.getRotation();
  }))).throttleTime(1000).distinctUntilChanged(function (a, b) {
    return (0, _func.isEqual)(a, b);
  }).map(function (_ref2) {
    var _ref3 = (0, _slicedToArray3.default)(_ref2, 3),
        center = _ref3[0],
        zoom = _ref3[1],
        rotation = _ref3[2];

    return {
      center: _vlOl2.default.proj.toLonLat(center, _this3.projection),
      zoom: Math.ceil(_this3.view.getZoom()),
      rotation: rotation
    };
  });

  this.rxSubs.viewChanges = viewChanges.subscribe(function (_ref4) {
    var center = _ref4.center,
        zoom = _ref4.zoom,
        rotation = _ref4.rotation;

    var changed = false;
    if (!(0, _func.isEqual)(_this3.currentCenter, center)) {
      _this3.currentCenter = center;
      changed = true;
    }
    if (_this3.currentZoom !== zoom) {
      _this3.currentZoom = zoom;
      changed = true;
    }
    if (_this3.currentRotation !== rotation) {
      _this3.currentRotation = rotation;
      changed = true;
    }

    changed && _this3.$emit('change', { center: center, zoom: zoom, rotation: rotation });
  }, function (err) {
    return (0, _debug.errordbg)(err.stack);
  });
}

/***/ }),

/***/ 347:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/*\nDate: 24 Fev 2015\nAuthor: Pedro Oliveira <kanytu@gmail . com>\n*/\n\n.hljs {\n  color: #a9b7c6;\n  background: #282b2e;\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n}\n\n.hljs-number,\n.hljs-literal,\n.hljs-symbol,\n.hljs-bullet {\n  color: #6897BB;\n}\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-deletion {\n  color: #cc7832;\n}\n\n.hljs-variable,\n.hljs-template-variable,\n.hljs-link {\n  color: #629755;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #808080;\n}\n\n.hljs-meta {\n  color: #bbb529;\n}\n\n.hljs-string,\n.hljs-attribute,\n.hljs-addition {\n  color: #6A8759;\n}\n\n.hljs-section,\n.hljs-title,\n.hljs-type {\n  color: #ffc66d;\n}\n\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class {\n  color: #e8bf6a;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),

/***/ 348:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 349:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vmBind = __webpack_require__(16);

var _vmBind2 = _interopRequireDefault(_vmBind);

var _stubVnode = __webpack_require__(17);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Basic style mixin.
 * Exposes for children inner OpenLayer style object as styleTarget.
 * Injects styleTarget from parent to apply self style.
 */

var methods = {
  /**
   * @protected
   */
  initialize: function initialize() {
    /**
     * @type {ol.style.Style|ol.style.Image|ol.style.Fill|ol.style.Stroke|ol.style.Text}
     * @protected
     */
    this.style = this.createStyle();
    this.bindSelfTo(this.style);
  },

  /**
   * @return {ol.style.Style|ol.style.Image|ol.style.Fill|ol.style.Stroke|ol.style.Text}
   * @protected
   */
  createStyle: function createStyle() {
    throw new Error('Not implemented method');
  },

  /**
   * @protected
   */
  mountStyle: function mountStyle() {
    throw new Error('Not implemented method');
  },

  /**
   * @protected
   */
  unmountStyle: function unmountStyle() {
    throw new Error('Not implemented method');
  },
  refresh: function refresh() {
    var _this = this;

    this.$nextTick(function () {
      _this.unmountStyle();
      _this.mountStyle();
    });
  }
};

exports.default = {
  mixins: [_vmBind2.default, _stubVnode2.default],
  methods: methods,
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  mounted: function mounted() {
    // Create style in  mounted hook because of some ol style classes doesn't have
    // setters for all inner objects. This setters are emulated through method: getStyleTarget
    this.initialize();
    this.$nextTick(this.mountStyle);
  },
  destroyed: function destroyed() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.unmountStyle();
      _this2.style = undefined;
    });
  }
};

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */\n", ""]);

// exports


/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */\n", ""]);

// exports


/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(143);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    subscribeAll: function subscribeAll() {},

    /**
     * @protected
     */
    unsubscribeAll: function unsubscribeAll() {
      var _this = this;

      (0, _keys2.default)(this.rxSubs).forEach(function (name) {
        _this.rxSubs[name].unsubscribe();
        delete _this.rxSubs[name];
      });
    }
  },
  beforeCreate: function beforeCreate() {
    /**
     * @type {Subscription}
     * @protected
     */
    this.rxSubs = {};
  },
  destroyed: function destroyed() {
    this.unsubscribeAll();
  }
};

/***/ }),

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/**\n * VueLayers SCSS mixins.\n * This part of the VueLayers package.\n */\n.ol-control, .ol-scale-line {\n  position: absolute;\n  padding: 2px;\n}\n.ol-box {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border-radius: 2px;\n  border: 2px solid #00f;\n}\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n.ol-scale-line {\n  background: rgba(0, 60, 136, 0.3);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n}\n.ol-scale-line-inner {\n  border: 1px solid #eee;\n  border-top: none;\n  color: #eee;\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents,width;\n}\n.ol-overlay-container {\n  will-change: left,right,top,bottom;\n}\n.ol-unsupported {\n  display: none;\n}\n.ol-viewport .ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.ol-control {\n  background-color: rgba(255, 255, 255, 0.4);\n  border-radius: 4px;\n}\n.ol-control:hover {\n  background-color: rgba(255, 255, 255, 0.6);\n}\n.ol-zoom {\n  top: .5em;\n  left: .5em;\n}\n.ol-rotate {\n  top: .5em;\n  right: .5em;\n  -webkit-transition: opacity .25s linear,visibility 0s linear;\n  transition: opacity .25s linear,visibility 0s linear;\n}\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition: opacity .25s linear,visibility 0s linear .25s;\n  transition: opacity .25s linear,visibility 0s linear .25s;\n}\n.ol-zoom-extent {\n  top: 4.643em;\n  left: .5em;\n}\n.ol-full-screen {\n  right: .5em;\n  top: .5em;\n}\n@media print {\n.ol-control {\n    display: none;\n}\n}\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: #fff;\n  font-size: 1.14em;\n  font-weight: 700;\n  text-decoration: none;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: .4em;\n  background-color: rgba(0, 60, 136, 0.5);\n  border: none;\n  border-radius: 2px;\n}\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n.ol-compass {\n  display: block;\n  font-weight: 400;\n  font-size: 1.2em;\n  will-change: transform;\n}\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n.ol-control button:focus, .ol-control button:hover {\n  text-decoration: none;\n  background-color: rgba(0, 60, 136, 0.7);\n}\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n.ol-attribution {\n  text-align: right;\n  bottom: .5em;\n  right: .5em;\n  max-width: -webkit-calc(100% - 1.3em);\n  max-width: calc(100% - 1.3em);\n}\n.ol-attribution ul {\n  margin: 0;\n  padding: 0 .5em;\n  font-size: .7rem;\n  line-height: 1.375em;\n  color: #000;\n  text-shadow: 0 0 2px #fff;\n}\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n  line-height: inherit;\n}\n.ol-attribution li:not(:last-child):after {\n  content: \" \";\n}\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n.ol-attribution button, .ol-attribution ul {\n  display: inline-block;\n}\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n.ol-attribution.ol-logo-only ul {\n  display: block;\n}\n.ol-attribution:not(.ol-collapsed) {\n  background: rgba(255, 255, 255, 0.8);\n}\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n  height: 1.1em;\n  line-height: 1em;\n}\n.ol-attribution.ol-logo-only {\n  background: 0 0;\n  bottom: .4em;\n  height: 1.1em;\n  line-height: 1em;\n}\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -.2em;\n  max-height: 1.6em;\n}\n.ol-attribution.ol-logo-only button, .ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n.ol-zoomslider {\n  top: 4.5em;\n  left: .5em;\n  height: 200px;\n}\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n.ol-overviewmap {\n  left: .5em;\n  bottom: .5em;\n}\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n.ol-overviewmap .ol-overviewmap-map, .ol-overviewmap button {\n  display: inline-block;\n}\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid #7b98bc;\n  height: 150px;\n  margin: 2px;\n  width: 150px;\n}\n.ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 1px;\n  left: 2px;\n  position: absolute;\n}\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map, .ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n.ol-overviewmap:not(.ol-collapsed) {\n  background: rgba(255, 255, 255, 0.8);\n}\n.ol-overviewmap-box {\n  border: 2px dotted rgba(0, 60, 136, 0.7);\n}\n.vl-map, .vl-map .map {\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports
exports.i(__webpack_require__(347), "");

// module
exports.push([module.i, "\nhtml, body, #app {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-family: Helvetica, Arial, sans-serif;\n  overflow: hidden;\n}\nhtml *, body *, #app * {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n.controls {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n      -ms-transform: translateX(-50%);\n          transform: translateX(-50%);\n  width: 70vw;\n  background: rgba(255, 255, 255, 0.7);\n  -webkit-box-shadow: 0 0 20px rgba(2, 2, 2, 0.1);\n          box-shadow: 0 0 20px rgba(2, 2, 2, 0.1);\n  padding: 5px;\n  text-align: center;\n}\n.controls > button {\n    margin: 5px;\n    padding: 5px 10px;\n    text-transform: uppercase;\n}\n#source-code {\n  overflow: auto;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  padding: 20px;\n  background: #ffffff;\n}\n#source-code .controls {\n    position: relative;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.slide-enter, .slide-leave-to {\n  -webkit-transform: translateY(100%);\n      -ms-transform: translateY(100%);\n          transform: translateY(100%);\n}\n.slide-enter-active, .slide-leave-active {\n  -webkit-transition: all .3s ease-out;\n  transition: all .3s ease-out;\n}\n", ""]);

// exports


/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */\n", ""]);

// exports


/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */\n", ""]);

// exports


/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */\n", ""]);

// exports


/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStyleFunc = createStyleFunc;

var _func = __webpack_require__(8);

exports.default = {
  provide: function provide() {
    return {
      setStyle: this.setStyle.bind(this),
      getStyle: this.getStyle.bind(this)
    };
  },
  beforeCreate: function beforeCreate() {
    /**
     * @type {ol.style.Style[]|ol.StyleFunction|undefined}
     */
    this.styles = this.defaultStyles = undefined;
  },

  methods: {
    /**
     * Returns styleable OpenLayers object
     *
     * @protected
     */
    styleTarget: function styleTarget() {},
    setStyle: function setStyle(style) {
      this.styles = style;
      var styleTarget = this.styleTarget();

      if (styleTarget) {
        if (this.styles === null || this.styles) {
          styleTarget.setStyle(createStyleFunc(this));
        } else {
          styleTarget.setStyle(undefined);
        }
      }
    },
    getStyle: function getStyle() {
      return this.styles;
    }
  }
};
function createStyleFunc(vm) {
  return function __styleTargetStyleFunc(feature, resolution) {
    var plainFeature = feature.plain();
    if (!plainFeature.geometry) return;

    var layer = feature.layer || {};
    var styles = vm.styles;

    if ((0, _func.isFunction)(styles)) {
      styles = styles(feature, resolution);
    } else if (Array.isArray(styles)) {
      styles = (0, _func.flow)((0, _func.filter)(function (_ref) {
        var style = _ref.style,
            condition = _ref.condition;

        return condition == null || (0, _func.isBoolean)(condition) && condition || (0, _func.isFunction)(condition) && condition(plainFeature, resolution, layer.id);
      }), (0, _func.map)(function (_ref2) {
        var style = _ref2.style;
        return style;
      }))(styles);
    }

    // null style
    if (styles === null || !(0, _func.isEmpty)(styles)) return styles;

    if (vm.defaultStyles) {
      return (0, _func.isFunction)(vm.defaultStyles) ? vm.defaultStyles(feature, resolution) : vm.defaultStyles;
    }
  };
}

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GEOMETRY_TYPE = exports.WGS84_SPHERE = exports.EARTH_RADIUS = exports.PIXEL_RATIO = exports.CACHE_SIZE = exports.ZOOM_FACTOR = exports.TILE_SIZE = exports.MIN_ZOOM = exports.MAX_ZOOM = exports.DATA_PROJECTION = exports.MAP_PROJECTION = undefined;

var _openlayers = __webpack_require__(23);

var _openlayers2 = _interopRequireDefault(_openlayers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {string} Default map projection.
 */
var MAP_PROJECTION = exports.MAP_PROJECTION = 'EPSG:3857';
/**
 * @type {string} Default data source projection.
 */
var DATA_PROJECTION = exports.DATA_PROJECTION = 'EPSG:4326';
/**
 * @type {number} Default map max zoom
 */
var MAX_ZOOM = exports.MAX_ZOOM = 28;
/**
 * @type {number} Default map min zoom
 */
var MIN_ZOOM = exports.MIN_ZOOM = 0;
/**
 * @type {number} Default tile size
 */
var TILE_SIZE = exports.TILE_SIZE = 256;
/**
 * @type {number} Default zoom factor
 */
var ZOOM_FACTOR = exports.ZOOM_FACTOR = 2;
/**
 * @type {number}
 */
var CACHE_SIZE = exports.CACHE_SIZE = 2048;
/**
 * @type {number}
 */
var PIXEL_RATIO = exports.PIXEL_RATIO = 1;
/**
 * @type {number} Earth radius in meters
 */
var EARTH_RADIUS = exports.EARTH_RADIUS = 6378137;
var WGS84_SPHERE = exports.WGS84_SPHERE = new _openlayers2.default.Sphere(EARTH_RADIUS);

var GEOMETRY_TYPE = exports.GEOMETRY_TYPE = {
  POINT: 'Point',
  LINE_STRING: 'LineString',
  POLYGON: 'Polygon',
  MULTI_POINT: 'MultiPoint',
  MULTI_LINE_STRING: 'MultiLineString',
  MULTI_POLYGON: 'MultiPolygon',
  GEOMETRY_COLLECTION: 'GeometryCollection',
  CIRCLE: 'Circle'
};

/***/ }),

/***/ 544:
/***/ (function(module, exports) {

module.exports = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"id": "pacman",
			"properties": {},
			"geometry": {
				"coordinates": [
					[
						[
							-119.36662387471965,
							-41.695909853775774
						],
						[
							-127.94244,
							-37.751311
						],
						[
							-138.66337,
							-37.037351
						],
						[
							-147.824999,
							-37.961188
						],
						[
							-154.42546725056079,
							-40.34752707396435
						],
						[
							-159.497091,
							-43.766705
						],
						[
							-164.94328590931863,
							-49.79123584867231
						],
						[
							-165.97818669927116,
							-55.507654307259564
						],
						[
							-164.15987129417792,
							-60.58607221239511
						],
						[
							-156.88931007683288,
							-64.26307739454326
						],
						[
							-146.38011953841647,
							-66.57958701677654
						],
						[
							-135.870929,
							-66.923693
						],
						[
							-124.077324,
							-66.15905
						],
						[
							-116.42965,
							-63.550593
						],
						[
							-139.881975,
							-55.500884
						],
						[
							-129.021801,
							-48.849505
						],
						[
							-119.36662387471965,
							-41.695909853775774
						]
					]
				],
				"type": "Polygon"
			}
		},
		{
			"type": "Feature",
			"id": "pacman-path",
			"properties": {},
			"geometry": {
				"coordinates": [
					[
						-106.86705950421077,
						-55.7032908486452
					],
					[
						-63.16248861520228,
						-55.65897331453094
					],
					[
						-20.008155129472726,
						-55.078263423967456
					],
					[
						22.281519579649057,
						-55.570187523502014
					],
					[
						56.710659956242125,
						-55.61460554958341
					],
					[
						86.26626904665073,
						-55.34734242173761
					],
					[
						115.30780244306703,
						-55.4812005671803
					],
					[
						139.7540642173147,
						-55.347342421737906
					],
					[
						167.03011835128234,
						-55.302622197467514
					],
					[
						176.9343916103021,
						-55.257851502422156
					]
				],
				"type": "LineString"
			}
		},
		{
			"type": "Feature",
			"id": "pacman-eye",
			"properties": {},
			"geometry": {
				"coordinates": [
					-147.3604640117643,
					-49.28908175281041
				],
				"type": "Point"
			}
		}
	]
};

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _tileBase = __webpack_require__(91);

var _tileBase2 = _interopRequireDefault(_tileBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {
  createSource: function createSource() {
    return new _vlOl2.default.source.XYZ({
      attributions: this.currentAttributions,
      tileUrlFunction: this.createTileUrlFunction(),
      crossOrigin: this.crossOrigin,
      projection: this.currentProjection,
      tileGrid: this.tileGrid,
      tilePixelRatio: this.currentTilePixelRatio,
      minZoom: this.currentMinZoom,
      maxZoom: this.currentMaxZoom,
      wrapX: this.wrapX,
      opaque: this.opaque,
      cacheSize: this.cacheSize,
      reprojectionErrorThreshold: this.reprojectionErrorThreshold
    });
  }
};

exports.default = {
  mixins: [_tileBase2.default],
  methods: methods
};

/***/ }),

/***/ 754:
/***/ (function(module, exports) {

module.exports = "<h2>Demo source code</h2>\n\n<h3>HTML</h3>\n\n<pre><code class=\"xml\">&lt;vl-map&gt;\n  &lt;vl-view :center=&quot;center&quot; :zoom=&quot;zoom&quot; :rotation=&quot;rotation&quot; @change=&quot;updateMapView&quot;/&gt;\n  &lt;vl-geoloc @change=&quot;updateGeoloc&quot;/&gt;\n\n  &lt;!-- interactions --&gt;\n  &lt;vl-interaction-select ref=&quot;select&quot; :selected=&quot;selected&quot; @select=&quot;select&quot; @unselect=&quot;unselect&quot;\n                         :filter=&quot;selectFilter&quot;&gt;\n    &lt;vl-style-func :factory=&quot;selectStyleFunc&quot;&gt;\n      &lt;!-- fallback style --&gt;\n      &lt;vl-style-container&gt;\n        &lt;vl-style-stroke color=&quot;#f03b20&quot; :width=&quot;3&quot;/&gt;\n        &lt;vl-style-fill :color=&quot;[254, 178, 76, 0.7]&quot;/&gt;\n      &lt;/vl-style-container&gt;\n      &lt;!--// fallback style --&gt;\n    &lt;/vl-style-func&gt;\n  &lt;/vl-interaction-select&gt;\n  &lt;!--// interactions --&gt;\n\n  &lt;!-- base layers --&gt;\n  &lt;vl-layer-tile id=&quot;osm&quot; :visible=&quot;layers.osm&quot;&gt;\n    &lt;vl-source-osm/&gt;\n  &lt;/vl-layer-tile&gt;\n\n  &lt;vl-layer-tile id=&quot;mapbox&quot; :visible=&quot;layers.mapbox&quot;&gt;\n    &lt;vl-source-mapbox map-id=&quot;ghettovoice.nbm2olb0&quot;\n                      access-token=&quot;pk.eyJ1IjoiZ2hldHRvdm9pY2UiLCJhIjoiMzMxYzMyMWQ3NTgzMTU4Nzk3ZTNmMmI3MmQ1NmVhMjgifQ._erAEzdvdB0jfYXXqzOJCg&quot;/&gt;\n  &lt;/vl-layer-tile&gt;\n  &lt;!--// base layers --&gt;\n\n  &lt;!-- Tile WMS --&gt;\n  &lt;vl-layer-tile id=&quot;wms&quot; :visible=&quot;layers.wms&quot;&gt;\n    &lt;vl-source-wms url=&quot;https://ahocevar.com/geoserver/wms&quot; layers=&quot;topp:states&quot;\n                   :ext-params=&quot;{ TILED: true }&quot; server-type=&quot;geoserver&quot; /&gt;\n  &lt;/vl-layer-tile&gt;\n  &lt;!--// Tile WMS --&gt;\n\n  &lt;!-- countries vector --&gt;\n  &lt;vl-layer-vector id=&quot;countries&quot; v-if=&quot;countries.length&quot; :visible=&quot;layers.countries&quot;&gt;\n    &lt;!-- layer level style defined as style function for complex styling  --&gt;\n    &lt;vl-style-func :factory=&quot;countriesStyleFunc&quot;&gt;\n      &lt;!-- fallback styles --&gt;\n      &lt;vl-style-container&gt;\n        &lt;vl-style-stroke color=&quot;#8856a7&quot; :width=&quot;2&quot;/&gt;\n        &lt;vl-style-fill :color=&quot;[158, 188, 218, 0.5]&quot;/&gt;\n      &lt;/vl-style-container&gt;\n      &lt;!--// fallback styles --&gt;\n    &lt;/vl-style-func&gt;\n    &lt;!--// layer level style --&gt;\n\n    &lt;!-- pass features as array for the huge or server loading datasets --&gt;\n    &lt;vl-source-vector :features=&quot;countries&quot;/&gt;\n  &lt;/vl-layer-vector&gt;\n  &lt;!--// countries vector --&gt;\n\n  &lt;!-- pacman, use vl-style-func for advanced styling --&gt;\n  &lt;vl-layer-vector id=&quot;pacman&quot; v-if=&quot;pacman.length&quot; :visible=&quot;layers.pacman&quot;&gt;\n    &lt;vl-style-func :factory=&quot;pacmanStyleFunc&quot;/&gt;\n\n    &lt;vl-source-vector&gt;\n      &lt;vl-feature v-for=&quot;feature in pacman&quot; :key=&quot;feature.id&quot; :id=&quot;feature.id&quot; :data=&quot;feature.properties&quot;&gt;\n        &lt;component :is=&quot;geometryTypeToCompName(feature.geometry.type)&quot; :coordinates=&quot;feature.geometry.coordinates&quot;/&gt;\n      &lt;/vl-feature&gt;\n    &lt;/vl-source-vector&gt;\n  &lt;/vl-layer-vector&gt;\n  &lt;!--// pacman --&gt;\n\n  &lt;!-- current position overlay --&gt;\n  &lt;vl-layer-vector v-if=&quot;position.length&quot; id=&quot;my-position&quot; :z-index=&quot;100&quot; :overlay=&quot;true&quot;&gt;\n    &lt;vl-style-container&gt;\n      &lt;vl-style-icon src=&quot;static/img/marker.png&quot; :scale=&quot;0.3&quot; :anchor=&quot;[0.5, 1]&quot;/&gt;\n    &lt;/vl-style-container&gt;\n\n    &lt;vl-source-vector&gt;\n      &lt;vl-feature id=&quot;my-position&quot; :z-index=&quot;999&quot;&gt;\n        &lt;vl-geom-point :coordinates=&quot;position&quot;/&gt;\n      &lt;/vl-feature&gt;\n    &lt;/vl-source-vector&gt;\n  &lt;/vl-layer-vector&gt;\n  &lt;!--// current position overlay --&gt;\n&lt;/vl-map&gt;\n\n&lt;div class=&quot;controls&quot;&gt;\n  &lt;button v-for=&quot;layer in [&apos;osm&apos;, &apos;mapbox&apos;, &apos;countries&apos;, &apos;pacman&apos;, &apos;wms&apos;]&quot; :key=&quot;layer&quot; @click=&quot;toggleLayer(layer)&quot;&gt;\n    Toggle layer {{ layer }}\n  &lt;/button&gt;\n\n  &lt;hr /&gt;\n  Center: {{ center.map(x =&gt; parseFloat(x.toPrecision(6))) }} Zoom: {{ zoom }} Rotation {{ rotation }}&lt;br /&gt;\n  My position: {{ position.map(x =&gt; parseFloat(x.toPrecision(6))) }}&lt;br /&gt;\n  Current selection: {{ selectedIds }}\n&lt;/div&gt;</code></pre>\n\n<h3>JavaScript</h3>\n\n<pre><code class=\"javascript jsx\">  import &apos;whatwg-fetch&apos;\nimport { kebabCase, forEach, get, set } from &apos;vl-utils/func&apos;\n\nconst computed = {\n  selectedIds () {\n    return this.selected.map(({ id }) =&gt; id)\n  }\n}\n\nconst methods = {\n  geometryTypeToCompName (type) {\n    return &apos;vl-geom-&apos; + kebabCase(type)\n  },\n  updateMapView ({ center, zoom, rotation }) {\n    this.center = center\n    this.zoom = zoom\n    this.rotation = rotation\n  },\n  updateGeoloc ({ position }) {\n    this.position = position\n  },\n  select (plainFeature) {\n    const i = this.selectedIds.indexOf(plainFeature.id)\n    if (i === -1) {\n      this.selected.push(plainFeature)\n    }\n  },\n  unselect ({ id }) {\n    const i = this.selectedIds.indexOf(id)\n    if (i !== -1) {\n      this.selected.splice(i, 1)\n    }\n  },\n  async loadData () {\n    const res = await fetch(&apos;https://openlayers.org/en/latest/examples/data/geojson/countries.geojson&apos;)\n    const geomCollection = await res.json()\n    this.countries = geomCollection.features.map((feature, i) =&gt; {\n      feature.properties = {\n        ...feature.properties,\n        color: i % 2 === 0 ? [ 49, 163, 84, 0.35 ] : [ 166, 100, 255, 0.35 ],\n        selectColor: (i + 1) % 2 !== 0 ? [ 221, 28, 119, 0.5 ] : undefined\n      }\n\n      return feature\n    })\n\n    return this.countries\n  },\n  selectStyleFunc (ol, styleHelper) {\n    const styleName = &apos;select&apos;\n    const styleByFeature = {}\n    const self = this\n\n    return function __selectStyleFunc ({ id, properties }, resolution, layer) {\n      if (properties.selectColor) {\n        let styles = get([ id, styleName ], styleByFeature)\n        if (!styles) {\n          styles = [\n            new ol.style.Style({\n              stroke: new ol.style.Stroke({\n                color: &apos;#8856a7&apos;,\n                width: 4\n              }),\n              fill: new ol.style.Fill({\n                color: properties.selectColor\n              })\n            })\n          ]\n\n          set([ id, styleName ], styles, styleByFeature)\n\n          return styles\n        }\n      }\n    }\n  },\n  countriesStyleFunc (ol, styleHelper) {\n    const stroke = new ol.style.Stroke({\n      color: &apos;#8856a7&apos;,\n      width: 1\n    })\n    const styleName = &apos;default&apos;\n    const styleByFeature = {}\n    const self = this\n\n    return function __countriesStyleFunc ({ id, properties }) {\n      let styles = get([ id, styleName ], styleByFeature)\n      if (!styles) {\n        styles = [\n          new ol.style.Style({\n            stroke: stroke,\n            fill: new ol.style.Fill({\n              color: properties.color\n            })\n          })\n        ]\n\n        set([ id, styleName ], styles, styleByFeature)\n      }\n\n      return styles\n    }\n  },\n  pacmanStyleFunc (ol, styleHelper) {\n    const pacman = [\n      new ol.style.Style({\n        stroke: new ol.style.Stroke({\n          color: &apos;#DE9147&apos;,\n          width: 3\n        }),\n        fill: new ol.style.Fill({\n          color: [ 222, 189, 36, 0.8 ]\n        })\n      })\n    ]\n    const path = [\n      new ol.style.Style({\n        stroke: new ol.style.Stroke({\n          color: &apos;blue&apos;,\n          width: 1\n        })\n      }),\n      new ol.style.Style({\n        image: new ol.style.Circle({\n          radius: 5,\n          fill: new ol.style.Fill({\n            color: &apos;orange&apos;\n          })\n        }),\n        geometry (feature) {\n          return new ol.geom.MultiPoint(feature.getGeometry().getCoordinates())\n        }\n      })\n    ]\n    const eye = [\n      new ol.style.Style({\n        image: new ol.style.Circle({\n          radius: 6,\n          fill: new ol.style.Fill({\n            color: &apos;#444444&apos;\n          })\n        })\n      })\n    ]\n\n    return function __pacmanStyleFunc (feature) {\n      switch (feature.id) {\n        case &apos;pacman&apos;:\n          return pacman\n        case &apos;pacman-path&apos;:\n          return path\n        case &apos;pacman-eye&apos;:\n          return eye\n      }\n    }\n  },\n  toggleLayer (layer) {\n    this.layers[ layer ] = !this.layers[ layer ]\n  },\n  selectFilter (feature, layer) {\n    return layer &amp;&amp; [ &apos;my-position&apos;, &apos;pacman&apos; ].indexOf(layer) === -1\n  }\n}\n\nconst watch = {\n  sourceCode (value) {\n    if (value) {\n      this.$nextTick(() =&gt; {\n        forEach(::highlight.highlightBlock, this.$refs.sourceCode.querySelectorAll(&apos;pre &gt; code&apos;))\n      })\n    }\n  }\n}\n\nexport default {\n  name: &apos;app&apos;,\n  computed,\n  watch,\n  methods,\n  data () {\n    return {\n      zoom: 2,\n      center: [ 0, 0 ],\n      rotation: 0,\n      selected: [],\n      countries: [],\n      pacman: require(&apos;../static/pacman.geojson&apos;).features,\n      position: [],\n      layers: {\n        osm: false,\n        mapbox: true,\n        countries: true,\n        pacman: false,\n        wms: false\n      }\n    }\n  },\n  created () {\n    this.loadData()\n      .catch(::console.error)\n  }\n}</code></pre>\n"

/***/ }),

/***/ 755:
/***/ (function(module, exports) {

module.exports = "<h2 id=\"install\">Install</h2>\n\n<pre><code class=\"bash\"># install Vue and VueLayers\nnpm install -S vue vuelayers</code></pre>\n\n<h2 id=\"usage\">Usage</h2>\n\n<h4 id=\"fullimport\">Full import</h4>\n\n<p>Import full library code with all components and mixins</p>\n\n<pre><code class=\"javascript jsx\">import Vue from &apos;vue&apos;\nimport VueLayers from &apos;vuelayers&apos;\n\nVue.use(VueLayers)\n// now all components installed and ready to use\nnew Vue({\n  el: &apos;#app&apos;,\n  render: h =&gt; h(App)\n})</code></pre>\n\n<p>\n  <strong>Note</strong>: CSS file needs to be imported separately. <br/>\n  Inside your App.vue\n</p>\n\n<pre><code class=\"vue\">&lt;template&gt;...&lt;/template&gt;\n&lt;script&gt;...&lt;/script&gt;\n&lt;style&gt;\n  @import &apos;~vuelayers/dist/cjs/style.css&apos;;\n&lt;/style&gt;</code></pre>\n\n<h4 id=\"ondemand\">On demand</h4>\n\n<p>First, install <a href=\"https://github.com/QingWei-Li/babel-plugin-component\">babel-plugin-component</a></p>\n\n<pre><code class=\"bash\">npm install babel-plugin-component -D</code></pre>\n\n<p>Then edit your <code>.babelrc</code></p>\n\n<pre><code class=\"json\">{\n  &quot;presets&quot;: [\n    [&quot;es2015&quot;, &quot;latest&quot;]\n  ],\n  &quot;plugins&quot;: [[&quot;component&quot;, [\n    {\n      &quot;libraryName&quot;: &quot;vuelayers&quot;,\n      &quot;style&quot;: true,\n      &quot;libDir&quot;: &quot;dist/cjs&quot;\n    }\n  ]]]\n}</code></pre>\n\n<p>Now you can import only what you need</p>\n\n<pre><code class=\"javascript jsx\">import Vue from &apos;vue&apos;\nimport { Map, MapView, LayerTile, SourceOsm } from &apos;vuelayers&apos;\n\nVue.use(Map)\nVue.use(MapView)\nVue.use(LayerTile)\nVue.use(SourceOsm)\n\nnew Vue({\n  el: &apos;#app&apos;,\n  render: h =&gt; h(App)\n})</code></pre>\n\n<p><strong>Note</strong>: the above library setup automatically imports CSS files</p>\n"

/***/ }),

/***/ 758:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(808)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(268),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/feature/feature.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e8970bb8", Component.options)
  } else {
    hotAPI.reload("data-v-e8970bb8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 759:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(791)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(269),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geoloc/geoloc.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-331d2e16", Component.options)
  } else {
    hotAPI.reload("data-v-331d2e16", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 760:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(790)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(270),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geom/line-string/geom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2fa219ca", Component.options)
  } else {
    hotAPI.reload("data-v-2fa219ca", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 761:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(786)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(271),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geom/multi-line-string/geom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0dfe7ca2", Component.options)
  } else {
    hotAPI.reload("data-v-0dfe7ca2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 762:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(784)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(272),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geom/multi-point/geom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05891369", Component.options)
  } else {
    hotAPI.reload("data-v-05891369", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 763:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(804)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(273),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geom/multi-polygon/geom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71976d7f", Component.options)
  } else {
    hotAPI.reload("data-v-71976d7f", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 764:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(806)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(274),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geom/point/geom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8c387456", Component.options)
  } else {
    hotAPI.reload("data-v-8c387456", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 765:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(805)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(275),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geom/polygon/geom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a0f34eb", Component.options)
  } else {
    hotAPI.reload("data-v-7a0f34eb", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 766:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(794)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(276),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/interaction/select/interaction.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3dd73c25", Component.options)
  } else {
    hotAPI.reload("data-v-3dd73c25", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 767:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(788)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(277),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/layer/tile/layer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20415277", Component.options)
  } else {
    hotAPI.reload("data-v-20415277", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(797)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(278),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/layer/vector/layer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-53ea49e8", Component.options)
  } else {
    hotAPI.reload("data-v-53ea49e8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 769:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(799)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(279),
  /* template */
  __webpack_require__(782),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/map/map.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] map.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61f65070", Component.options)
  } else {
    hotAPI.reload("data-v-61f65070", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 770:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(796)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(280),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/source/mapbox/source.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e3aff90", Component.options)
  } else {
    hotAPI.reload("data-v-4e3aff90", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 771:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(789)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(281),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/source/osm/source.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-23ecb9dc", Component.options)
  } else {
    hotAPI.reload("data-v-23ecb9dc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 772:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(801)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(282),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/source/vector/source.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6475a688", Component.options)
  } else {
    hotAPI.reload("data-v-6475a688", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 773:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(803)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(283),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/source/wms/source.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c1a7ff0", Component.options)
  } else {
    hotAPI.reload("data-v-6c1a7ff0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 774:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(787)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(284),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/source/xyz/source.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0fd05d4c", Component.options)
  } else {
    hotAPI.reload("data-v-0fd05d4c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 775:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(792)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(285),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/style/circle/circle.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-33dfe2d8", Component.options)
  } else {
    hotAPI.reload("data-v-33dfe2d8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(798)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(286),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/style/container/container.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5417799c", Component.options)
  } else {
    hotAPI.reload("data-v-5417799c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(785)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(287),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/style/fill/fill.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b5ed210", Component.options)
  } else {
    hotAPI.reload("data-v-0b5ed210", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 778:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(802)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(288),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/style/func/func.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-678e6798", Component.options)
  } else {
    hotAPI.reload("data-v-678e6798", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 779:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(795)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(289),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/style/icon/icon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e69a0b8", Component.options)
  } else {
    hotAPI.reload("data-v-3e69a0b8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 780:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(807)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(290),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/style/stroke/stroke.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-977b0450", Component.options)
  } else {
    hotAPI.reload("data-v-977b0450", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 781:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(793)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(291),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/view/view.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-35035356", Component.options)
  } else {
    hotAPI.reload("data-v-35035356", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 782:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vl-map"
  }, [_c('div', {
    ref: "map",
    staticClass: "map",
    attrs: {
      "tabindex": _vm.tabIndex
    }
  }), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-61f65070", module.exports)
  }
}

/***/ }),

/***/ 783:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('vl-map', [_c('vl-view', {
    attrs: {
      "center": _vm.center,
      "zoom": _vm.zoom,
      "rotation": _vm.rotation
    },
    on: {
      "change": _vm.updateMapView
    }
  }), _vm._v(" "), _c('vl-geoloc', {
    on: {
      "change": _vm.updateGeoloc
    }
  }), _vm._v(" "), _c('vl-interaction-select', {
    ref: "select",
    attrs: {
      "selected": _vm.selected,
      "filter": _vm.selectFilter
    },
    on: {
      "select": _vm.select,
      "unselect": _vm.unselect
    }
  }, [_c('vl-style-func', {
    attrs: {
      "factory": _vm.selectStyleFunc
    }
  }, [_c('vl-style-container', [_c('vl-style-stroke', {
    attrs: {
      "color": "#f03b20",
      "width": 3
    }
  }), _vm._v(" "), _c('vl-style-fill', {
    attrs: {
      "color": [254, 178, 76, 0.7]
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('vl-layer-tile', {
    attrs: {
      "id": "osm",
      "visible": _vm.layers.osm
    }
  }, [_c('vl-source-osm')], 1), _vm._v(" "), _c('vl-layer-tile', {
    attrs: {
      "id": "mapbox",
      "visible": _vm.layers.mapbox
    }
  }, [_c('vl-source-mapbox', {
    attrs: {
      "map-id": "ghettovoice.nbm2olb0",
      "access-token": "pk.eyJ1IjoiZ2hldHRvdm9pY2UiLCJhIjoiMzMxYzMyMWQ3NTgzMTU4Nzk3ZTNmMmI3MmQ1NmVhMjgifQ._erAEzdvdB0jfYXXqzOJCg"
    }
  })], 1), _vm._v(" "), _c('vl-layer-tile', {
    attrs: {
      "id": "wms",
      "visible": _vm.layers.wms
    }
  }, [_c('vl-source-wms', {
    attrs: {
      "url": "https://ahocevar.com/geoserver/wms",
      "layers": "topp:states",
      "ext-params": {
        TILED: true
      },
      "server-type": "geoserver"
    }
  })], 1), _vm._v(" "), (_vm.countries.length) ? _c('vl-layer-vector', {
    attrs: {
      "id": "countries",
      "visible": _vm.layers.countries
    }
  }, [_c('vl-style-func', {
    attrs: {
      "factory": _vm.countriesStyleFunc
    }
  }, [_c('vl-style-container', [_c('vl-style-stroke', {
    attrs: {
      "color": "#8856a7",
      "width": 2
    }
  }), _vm._v(" "), _c('vl-style-fill', {
    attrs: {
      "color": [158, 188, 218, 0.5]
    }
  })], 1)], 1), _vm._v(" "), _c('vl-source-vector', {
    attrs: {
      "features": _vm.countries
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.pacman.length) ? _c('vl-layer-vector', {
    attrs: {
      "id": "pacman",
      "visible": _vm.layers.pacman
    }
  }, [_c('vl-style-func', {
    attrs: {
      "factory": _vm.pacmanStyleFunc
    }
  }), _vm._v(" "), _c('vl-source-vector', _vm._l((_vm.pacman), function(feature) {
    return _c('vl-feature', {
      key: feature.id,
      attrs: {
        "id": feature.id,
        "data": feature.properties
      }
    }, [_c(_vm.geometryTypeToCompName(feature.geometry.type), {
      tag: "component",
      attrs: {
        "coordinates": feature.geometry.coordinates
      }
    })], 1)
  }))], 1) : _vm._e(), _vm._v(" "), (_vm.position.length) ? _c('vl-layer-vector', {
    attrs: {
      "id": "my-position",
      "z-index": 100,
      "overlay": true
    }
  }, [_c('vl-style-container', [_c('vl-style-icon', {
    attrs: {
      "src": "static/img/marker.png",
      "scale": 0.3,
      "anchor": [0.5, 1]
    }
  })], 1), _vm._v(" "), _c('vl-source-vector', [_c('vl-feature', {
    attrs: {
      "id": "my-position",
      "z-index": 999
    }
  }, [_c('vl-geom-point', {
    attrs: {
      "coordinates": _vm.position
    }
  })], 1)], 1)], 1) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "controls"
  }, [_vm._l((['osm', 'mapbox', 'countries', 'pacman', 'wms']), function(layer) {
    return _c('button', {
      key: layer,
      on: {
        "click": function($event) {
          _vm.toggleLayer(layer)
        }
      }
    }, [_vm._v("\n      Toggle layer " + _vm._s(layer) + "\n    ")])
  }), _vm._v(" "), _c('button', {
    on: {
      "click": _vm.showSourceCode
    }
  }, [_vm._v("Show usage info / example source code")]), _vm._v(" "), _c('hr'), _vm._v("\n    Center: " + _vm._s(_vm.center.map(function (x) { return parseFloat(x.toPrecision(6)); })) + " Zoom: " + _vm._s(_vm.zoom) + " Rotation " + _vm._s(_vm.rotation)), _c('br'), _vm._v("\n    My position: " + _vm._s(_vm.position.map(function (x) { return parseFloat(x.toPrecision(6)); }))), _c('br'), _vm._v("\n    Current selection: " + _vm._s(_vm.selectedIds) + "\n  ")], 2), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "slide"
    }
  }, [(_vm.sourceCode) ? _c('div', {
    ref: "sourceCode",
    attrs: {
      "id": "source-code"
    }
  }, [_c('div', {
    staticClass: "controls"
  }, [_c('button', {
    on: {
      "click": function($event) {
        _vm.sourceCode = false
      }
    }
  }, [_vm._v("Close")])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "install"
    },
    domProps: {
      "innerHTML": _vm._s(_vm.installHTML)
    }
  }), _vm._v(" "), _c('div', {
    attrs: {
      "id": "src"
    },
    domProps: {
      "innerHTML": _vm._s(_vm.demoSrcHTML)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "controls"
  }, [_c('button', {
    on: {
      "click": function($event) {
        _vm.sourceCode = false
      }
    }
  }, [_vm._v("Close")])])]) : _vm._e()])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6474fc42", module.exports)
  }
}

/***/ }),

/***/ 784:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(348);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("95557bf0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-05891369\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-05891369\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(349);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("72f86146", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0b5ed210\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fill.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0b5ed210\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fill.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(350);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("6acaa13a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0dfe7ca2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0dfe7ca2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 787:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(351);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("e97d7558", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0fd05d4c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0fd05d4c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 788:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(352);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("d477d128", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-20415277\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layer.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-20415277\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 789:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(353);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("7dbf7e02", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-23ecb9dc\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-23ecb9dc\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 790:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(354);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("184cafc8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-2fa219ca\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-2fa219ca\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 791:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(355);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("0f4c7116", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-331d2e16\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geoloc.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-331d2e16\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geoloc.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 792:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(356);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("e6d10d88", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-33dfe2d8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./circle.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-33dfe2d8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./circle.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 793:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(357);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("cf82f0ce", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-35035356\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./view.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-35035356\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./view.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(358);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("455bf4ec", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-3dd73c25\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./interaction.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-3dd73c25\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./interaction.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(359);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("b0150148", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-3e69a0b8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./icon.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-3e69a0b8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./icon.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(360);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("e7feb404", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-4e3aff90\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-4e3aff90\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 797:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(361);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("ef88f934", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-53ea49e8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layer.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-53ea49e8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(362);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("f6818f96", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-5417799c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./container.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-5417799c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./container.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 799:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(363);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("2962a994", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-61f65070\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./map.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-61f65070\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./map.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = exports.idMatchFilter = exports.diffById = exports.set = exports.get = exports.random = exports.rangeStep = exports.range = exports.kebabCase = exports.differenceWith = exports.constant = exports.lowerFirst = exports.upperFirst = exports.omit = exports.pick = exports.flow = exports.isEqual = exports.isEmpty = exports.isBoolean = exports.isString = exports.isFunction = exports.merge = exports.filter = exports.map = exports.forEach = exports.reduce = undefined;

var _promise = __webpack_require__(48);

var _promise2 = _interopRequireDefault(_promise);

var _keys = __webpack_require__(143);

var _keys2 = _interopRequireDefault(_keys);

var _set2 = __webpack_require__(692);

var _set3 = _interopRequireDefault(_set2);

var _get2 = __webpack_require__(676);

var _get3 = _interopRequireDefault(_get2);

var _filter2 = __webpack_require__(673);

var _filter3 = _interopRequireDefault(_filter2);

var _map2 = __webpack_require__(684);

var _map3 = _interopRequireDefault(_map2);

var _random2 = __webpack_require__(688);

var _random3 = _interopRequireDefault(_random2);

var _rangeStep2 = __webpack_require__(690);

var _rangeStep3 = _interopRequireDefault(_rangeStep2);

var _range2 = __webpack_require__(689);

var _range3 = _interopRequireDefault(_range2);

var _kebabCase2 = __webpack_require__(682);

var _kebabCase3 = _interopRequireDefault(_kebabCase2);

var _differenceWith2 = __webpack_require__(672);

var _differenceWith3 = _interopRequireDefault(_differenceWith2);

var _constant2 = __webpack_require__(671);

var _constant3 = _interopRequireDefault(_constant2);

var _merge2 = __webpack_require__(685);

var _merge3 = _interopRequireDefault(_merge2);

var _lowerFirst2 = __webpack_require__(683);

var _lowerFirst3 = _interopRequireDefault(_lowerFirst2);

var _upperFirst2 = __webpack_require__(693);

var _upperFirst3 = _interopRequireDefault(_upperFirst2);

var _omit2 = __webpack_require__(686);

var _omit3 = _interopRequireDefault(_omit2);

var _pick2 = __webpack_require__(687);

var _pick3 = _interopRequireDefault(_pick2);

var _flow2 = __webpack_require__(674);

var _flow3 = _interopRequireDefault(_flow2);

var _isEqual2 = __webpack_require__(679);

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _isEmpty2 = __webpack_require__(678);

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isBoolean2 = __webpack_require__(677);

var _isBoolean3 = _interopRequireDefault(_isBoolean2);

var _isString2 = __webpack_require__(681);

var _isString3 = _interopRequireDefault(_isString2);

var _isFunction2 = __webpack_require__(680);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _forEach2 = __webpack_require__(675);

var _forEach3 = _interopRequireDefault(_forEach2);

var _reduce2 = __webpack_require__(691);

var _reduce3 = _interopRequireDefault(_reduce2);

exports.isNumeric = isNumeric;
exports.coalesce = coalesce;
exports.round = round;
exports.replaceTokens = replaceTokens;
exports.timedChunk = timedChunk;
exports.delay = delay;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// lodash re-exports
var reduce = exports.reduce = _reduce3.default.convert({ cap: false });
var forEach = exports.forEach = _forEach3.default.convert({ cap: false });
var map = exports.map = _map3.default.convert({ cap: false });
var filter = exports.filter = _filter3.default.convert({ cap: false });
var merge = exports.merge = _merge3.default.convert({ fixed: false });
exports.isFunction = _isFunction3.default;
exports.isString = _isString3.default;
exports.isBoolean = _isBoolean3.default;
exports.isEmpty = _isEmpty3.default;
exports.isEqual = _isEqual3.default;
exports.flow = _flow3.default;
exports.pick = _pick3.default;
exports.omit = _omit3.default;
exports.upperFirst = _upperFirst3.default;
exports.lowerFirst = _lowerFirst3.default;
exports.constant = _constant3.default;
exports.differenceWith = _differenceWith3.default;
exports.kebabCase = _kebabCase3.default;
exports.range = _range3.default;
exports.rangeStep = _rangeStep3.default;
exports.random = _random3.default;
exports.get = _get3.default;
exports.set = _set3.default;
var diffById = exports.diffById = (0, _differenceWith3.default)(function (a, b) {
  return a.id === b.id;
});
var idMatchFilter = exports.idMatchFilter = function idMatchFilter(id) {
  return function (x) {
    return x.id === id;
  };
};

var noop = exports.noop = function noop() {};

/**
 * @param {*} value
 * @return {boolean} True if value is number or numeric string.
 */
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * @param {...*} [args]
 *
 * @return {*}
 */
function coalesce() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.find(function (val) {
    return val != null;
  });
}

/**
 * @param {number} num
 * @param {number} [precision=0]
 * @return {number}
 */
function round(num) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return Number(Math.round(Number(num + 'e+' + precision)) + 'e-' + precision);
}

/**
 * Replaces `tokens` in the `string` by values from the `replaces`.
 *
 * @param {string} string
 * @param {Object} replaces
 *
 * @returns {string}
 */
function replaceTokens(string, replaces) {
  var regExp = new RegExp((0, _keys2.default)(replaces).map(function (field) {
    return '(\\{' + field + '\\})';
  }).join('|'), 'ig');

  return string.replace(regExp, function (match) {
    return replaces[match.substr(1, match.length - 2)] || '';
  });
}

// Copyright 2009 Nicholas C. Zakas. All rights reserved.
// MIT Licensed
function timedChunk(items, process, processContext, callback, callbackContext) {
  return new _promise2.default(function (resolve) {
    var todo = items.slice(); // create a clone of the original

    var exec = function exec() {
      var start = Date.now();

      do {
        process.call(processContext, todo.shift());
      } while (todo.length > 0 && Date.now() - start < 50);

      if (todo.length > 0) {
        setTimeout(exec, 25);
      } else {
        if (typeof callback === 'function') {
          callback.call(callbackContext, items);
        }
        resolve(items);
      }
    };

    if (todo.length) {
      setTimeout(exec, 25);
    } else {
      resolve(items);
    }
  });
}

function delay(dt) {
  return new _promise2.default(function (resolve) {
    return setTimeout(resolve, dt);
  });
}

/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(364);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("253b3b38", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6474fc42\",\"scoped\":false,\"hasInlineConfig\":true}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6474fc42\",\"scoped\":false,\"hasInlineConfig\":true}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(365);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("afb040ba", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6475a688\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6475a688\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(366);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("6d52be86", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-678e6798\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./func.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-678e6798\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./func.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 803:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(367);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("5c838bfe", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6c1a7ff0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6c1a7ff0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 804:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(368);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("714b867e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-71976d7f\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-71976d7f\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 805:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(369);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("7d2fc415", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7a0f34eb\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7a0f34eb\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(370);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("000af685", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-8c387456\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-8c387456\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 807:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(371);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("721ae84f", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-977b0450\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./stroke.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-977b0450\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./stroke.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 808:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(372);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("4529e1eb", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-e8970bb8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./feature.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-e8970bb8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./feature.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 811:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__app__);




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1__src___default.a)

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  render: h => h(__WEBPACK_IMPORTED_MODULE_2__app___default.a)
})


/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(25);

var _create2 = _interopRequireDefault(_create);

var _defineProperties = __webpack_require__(37);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _v = __webpack_require__(228);

var _v2 = _interopRequireDefault(_v);

var _rxSubs = __webpack_require__(36);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _vmBind = __webpack_require__(16);

var _vmBind2 = _interopRequireDefault(_vmBind);

var _stubVnode = __webpack_require__(17);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

var _debug = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  id: {
    type: [String, Number],
    default: function _default() {
      return (0, _v2.default)();
    }
  },
  opacity: {
    type: Number,
    default: 1
  },
  minResolution: Number,
  maxResolution: Number,
  visible: {
    type: Boolean,
    default: true
  },
  extent: {
    type: Array,
    validator: function validator(value) {
      return value.length === 4;
    }
  },
  zIndex: {
    type: Number,
    default: 0
  },
  overlay: {
    type: Boolean,
    default: false
  }
};

var methods = {
  /**
   * Updates layer state
   */
  refresh: function refresh() {
    this.layer && this.layer.changed();
  },
  initialize: function initialize() {
    var _this = this;

    /**
     * @type {ol.layer.Layer}
     * @protected
     */
    this.layer = this.createLayer();
    this.bindSelfTo(this.layer);
    Object.defineProperty(this.layer, 'id', {
      enumerable: true,
      configurable: true,
      get: function get() {
        return _this.id;
      }
    });
  },

  /**
   * @return {ol.layer.Layer}
   * @protected
   */
  createLayer: function createLayer() {
    throw new Error('Not implemented method');
  },

  /**
   * @protected
   */
  mountLayer: function mountLayer() {
    if (this.map) {
      if (this.overlay) {
        this.layer.setMap(this.map);
      } else {
        this.map.addLayer(this.layer);
      }
      this.subscribeAll();
    } else if (false) {
      (0, _debug.warn)("Invalid usage of map component, should have layer component among it's ancestors");
    }
  },

  /**
   * @protected
   */
  unmountLayer: function unmountLayer() {
    this.unsubscribeAll();
    if (this.map) {
      if (this.overlay) {
        this.layer.setMap(undefined);
      } else {
        this.map.removeLayer(this.layer);
      }
    }
  }
};

var watch = {
  maxResolution: function maxResolution(value) {
    this.layer.setMaxResolution(value);
  },
  minResolution: function minResolution(value) {
    this.layer.setMinResolution(value);
  },
  opacity: function opacity(value) {
    this.layer.setOpacity(value);
  },
  visible: function visible(value) {
    this.layer.setVisible(value);
  },
  zIndex: function zIndex(value) {
    this.layer.setZIndex(value);
  }
};

exports.default = {
  mixins: [_rxSubs2.default, _vmBind2.default, _stubVnode2.default],
  inject: ['map'],
  props: props,
  methods: methods,
  watch: watch,
  stubVNode: {
    attrs: function attrs() {
      return {
        id: [this.$options.name, this.id].join('-')
      };
    }
  },
  provide: function provide() {
    var _this2 = this;

    return (0, _defineProperties2.default)((0, _create2.default)(null), {
      layer: {
        enumerable: true,
        get: function get() {
          return _this2.layer;
        }
      }
    });
  },
  created: function created() {
    this.initialize();
  },
  mounted: function mounted() {
    this.$nextTick(this.mountLayer);
  },
  destroyed: function destroyed() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3.unmountLayer();
      delete _this3.layer.id;
      _this3.layer = undefined;
    });
  }
};

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(25);

var _create2 = _interopRequireDefault(_create);

var _defineProperties = __webpack_require__(37);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _rxSubs = __webpack_require__(36);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _vmBind = __webpack_require__(16);

var _vmBind2 = _interopRequireDefault(_vmBind);

var _stubVnode = __webpack_require__(17);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

var _vlOl = __webpack_require__(0);

var _debug = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  attributions: [String, Array],
  url: String,
  projection: {
    type: String,
    default: _vlOl.consts.MAP_PROJECTION
  },
  wrapX: {
    type: Boolean,
    default: true
  },
  logo: String
};

var computed = {
  currentUrl: function currentUrl() {
    return this.url;
  },
  currentProjection: function currentProjection() {
    return this.projection;
  },
  currentAttributions: function currentAttributions() {
    return this.attributions;
  }
};

var methods = {
  /**
   * @protected
   */
  initialize: function initialize() {
    /**
     * @type {ol.source.Source}
     * @protected
     */
    this.source = this.createSource();
    this.bindSelfTo(this.source);
  },

  /**
   * @return {ol.source.Source}
   * @protected
   */
  createSource: function createSource() {
    throw new Error('Not implemented method');
  },
  mountSource: function mountSource() {
    if (this.layer) {
      this.layer.setSource(this.source);
      this.subscribeAll();
    } else if (false) {
      (0, _debug.warn)("Invalid usage of source component, should have layer component among it's ancestors");
    }
  },
  unmountSource: function unmountSource() {
    this.unsubscribeAll();
    this.layer && this.layer.setSource(undefined);
  },
  refresh: function refresh() {
    this.source && this.source.changed();
  }
};

var watch = {
  attributions: function attributions(value) {
    this.source.setAttributions(value);
  },
  projection: function projection(value) {
    // todo recreate source?
  }
};

exports.default = {
  mixins: [_rxSubs2.default, _vmBind2.default, _stubVnode2.default],
  inject: ['layer'],
  props: props,
  computed: computed,
  methods: methods,
  watch: watch,
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  provide: function provide() {
    var _this = this;

    return (0, _defineProperties2.default)((0, _create2.default)(null), {
      source: {
        enumerable: true,
        get: function get() {
          return _this.source;
        }
      }
    });
  },
  created: function created() {
    this.initialize();
  },
  mounted: function mounted() {
    this.$nextTick(this.mountSource);
  },
  destroyed: function destroyed() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.unmountSource();
      _this2.source = undefined;
    });
  }
};

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vlOl = __webpack_require__(0);

var _vlOl2 = _interopRequireDefault(_vlOl);

var _olTilecache = __webpack_require__(719);

var _func = __webpack_require__(8);

var _source = __webpack_require__(90);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  url: {
    type: String,
    required: true
  },
  tileSize: {
    type: Array,
    default: function _default() {
      return [_vlOl.consts.TILE_SIZE, _vlOl.consts.TILE_SIZE];
    },
    validator: function validator(value) {
      return value.length === 2;
    }
  },
  tilePixelRatio: {
    type: Number,
    default: _vlOl.consts.PIXEL_RATIO
  },
  crossOrigin: {
    type: String,
    default: 'anonymous'
  },
  cacheSize: {
    type: Number,
    default: _vlOl.consts.CACHE_SIZE
  },
  opaque: Boolean,
  minZoom: {
    type: Number,
    default: _vlOl.consts.MIN_ZOOM
  },
  maxZoom: {
    type: Number,
    default: _vlOl.consts.MAX_ZOOM
  },
  reprojectionErrorThreshold: {
    type: Number,
    default: 0.5
  }
};

var computed = {
  currentTileSize: function currentTileSize() {
    return this.tileSize;
  },
  currentTilePixelRatio: function currentTilePixelRatio() {
    return this.tilePixelRatio;
  },
  currentMinZoom: function currentMinZoom() {
    return this.minZoom;
  },
  currentMaxZoom: function currentMaxZoom() {
    return this.maxZoom;
  },
  urlTokens: function urlTokens() {
    return [];
  }
};

var sourceInitialize = _source2.default.methods.initialize;


var methods = {
  initialize: function initialize() {
    // prepare tile grid and tile grid extent to use it in source / url function /... creation
    this.createTileGrid();
    sourceInitialize.call(this);
  },

  /**
   * @return {ol.tilegrid.TileGrid}
   * @protected
   */
  createTileGrid: function createTileGrid() {
    /**
     * @type {ol.Extent}
     * @protected
     */
    this.tileGridExtent = _vlOl2.default.proj.get(this.currentProjection).getExtent();
    /**
     * @type {ol.tileGrid.TileGrid}
     * @protected
     */
    this.tileGrid = _vlOl2.default.tilegrid.createXYZ({
      extent: this.tileGridExtent,
      minZoom: this.currentMinZoom,
      maxZoom: this.currentMaxZoom,
      tileSize: this.currentTileSize
    });

    return this.tileGrid;
  },

  /**
   * @return {ol.TileUrlFunction}
   * @protected
   */
  createTileUrlFunction: function createTileUrlFunction() {
    return (0, _olTilecache.createTileUrlFunction)(this.replaceUrlTokens(), this.tileGrid, this.tileGridExtent);
  },

  /**
   * @return {string}
   * @protected
   */
  replaceUrlTokens: function replaceUrlTokens() {
    return (0, _func.replaceTokens)(this.currentUrl, (0, _func.pick)(this.urlTokens, this));
  }
};

exports.default = {
  mixins: [_source2.default],
  props: props,
  computed: computed,
  methods: methods
};

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = __webpack_require__(35);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleRefresh = _style2.default.methods.refresh;
var methods = {
  /**
   * @protected
   */
  mountStyle: function mountStyle() {
    this.setImage(this.style);
  },

  /**
   * @protected
   */
  unmountStyle: function unmountStyle() {
    this.setImage(undefined);
  },
  refresh: function refresh() {
    var _this = this;

    this.$nextTick(function () {
      _this.initialize();
      styleRefresh.call(_this);
    });
  }
};

exports.default = {
  mixins: [_style2.default],
  inject: ['setImage'],
  methods: methods,
  stubVNode: {
    empty: false,
    attrs: function attrs() {
      return {
        id: this.$options.name
      };
    }
  }
};

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Observable = __webpack_require__(7);

__webpack_require__(727);

__webpack_require__(725);

__webpack_require__(729);

__webpack_require__(732);

__webpack_require__(728);

__webpack_require__(730);

__webpack_require__(731);

__webpack_require__(266);

exports.default = _Observable.Observable; /**
                                           * RxJS extensions.
                                           */

/***/ })

},[811]);
//# sourceMappingURL=app.a6361d9ae4581572a115.js.map