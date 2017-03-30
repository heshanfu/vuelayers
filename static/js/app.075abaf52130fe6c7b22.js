webpackJsonp([1],{

/***/ 1004:
/***/ (function(module, exports) {

module.exports = "<h2>Demo source code</h2>\n\n<h3>HTML</h3>\n\n<pre><code class=\"xml\">&lt;vl-map&gt;\n  &lt;vl-view :center=&quot;center&quot; :zoom=&quot;zoom&quot; :rotation=&quot;rotation&quot; @change=&quot;updateMapView&quot;/&gt;\n  &lt;vl-geoloc @change=&quot;updateGeoloc&quot;/&gt;\n\n  &lt;!-- interactions --&gt;\n  &lt;vl-interaction-select ref=&quot;select&quot; :selected=&quot;selected&quot; @select=&quot;select&quot; @unselect=&quot;unselect&quot;\n                         :filter=&quot;selectFilter&quot;&gt;\n    &lt;vl-style-func :factory=&quot;selectStyleFunc&quot;&gt;\n      &lt;!-- fallback style --&gt;\n      &lt;vl-style-container&gt;\n        &lt;vl-style-stroke color=&quot;#f03b20&quot; :width=&quot;3&quot;/&gt;\n        &lt;vl-style-fill :color=&quot;[254, 178, 76, 0.7]&quot;/&gt;\n      &lt;/vl-style-container&gt;\n      &lt;!--// fallback style --&gt;\n    &lt;/vl-style-func&gt;\n  &lt;/vl-interaction-select&gt;\n  &lt;!--// interactions --&gt;\n\n  &lt;!-- base layers --&gt;\n  &lt;vl-layer-tile id=&quot;osm&quot; :visible=&quot;layers.osm&quot;&gt;\n    &lt;vl-source-osm/&gt;\n  &lt;/vl-layer-tile&gt;\n\n  &lt;vl-layer-tile id=&quot;mapbox&quot; :visible=&quot;layers.mapbox&quot;&gt;\n    &lt;vl-source-mapbox map-id=&quot;ghettovoice.nbm2olb0&quot;\n                      access-token=&quot;pk.eyJ1IjoiZ2hldHRvdm9pY2UiLCJhIjoiMzMxYzMyMWQ3NTgzMTU4Nzk3ZTNmMmI3MmQ1NmVhMjgifQ._erAEzdvdB0jfYXXqzOJCg&quot;/&gt;\n  &lt;/vl-layer-tile&gt;\n  &lt;!--// base layers --&gt;\n\n  &lt;!-- Tile WMS --&gt;\n  &lt;vl-layer-tile id=&quot;wms&quot; :visible=&quot;layers.wms&quot;&gt;\n    &lt;vl-source-wms url=&quot;https://ahocevar.com/geoserver/wms&quot; layers=&quot;topp:states&quot;\n                   :ext-params=&quot;{ TILED: true }&quot; server-type=&quot;geoserver&quot; /&gt;\n  &lt;/vl-layer-tile&gt;\n  &lt;!--// Tile WMS --&gt;\n\n  &lt;!-- countries vector --&gt;\n  &lt;vl-layer-vector id=&quot;countries&quot; v-if=&quot;countries.length&quot; :visible=&quot;layers.countries&quot;&gt;\n    &lt;!-- layer level style defined as style function for complex styling  --&gt;\n    &lt;vl-style-func :factory=&quot;countriesStyleFunc&quot;&gt;\n      &lt;!-- fallback styles --&gt;\n      &lt;vl-style-container&gt;\n        &lt;vl-style-stroke color=&quot;#8856a7&quot; :width=&quot;2&quot;/&gt;\n        &lt;vl-style-fill :color=&quot;[158, 188, 218, 0.5]&quot;/&gt;\n      &lt;/vl-style-container&gt;\n      &lt;!--// fallback styles --&gt;\n    &lt;/vl-style-func&gt;\n    &lt;!--// layer level style --&gt;\n\n    &lt;!-- pass features as array for the huge or server loading datasets --&gt;\n    &lt;vl-source-vector :features=&quot;countries&quot;/&gt;\n  &lt;/vl-layer-vector&gt;\n  &lt;!--// countries vector --&gt;\n\n  &lt;!-- pacman, use vl-style-func for advanced styling --&gt;\n  &lt;vl-layer-vector id=&quot;pacman&quot; v-if=&quot;pacman.length&quot; :visible=&quot;layers.pacman&quot;&gt;\n    &lt;vl-style-func :factory=&quot;pacmanStyleFunc&quot;/&gt;\n\n    &lt;vl-source-vector&gt;\n      &lt;vl-feature v-for=&quot;feature in pacman&quot; :key=&quot;feature.id&quot; :id=&quot;feature.id&quot; :data=&quot;feature.properties&quot;&gt;\n        &lt;component :is=&quot;geometryTypeToCompName(feature.geometry.type)&quot; :coordinates=&quot;feature.geometry.coordinates&quot;/&gt;\n      &lt;/vl-feature&gt;\n    &lt;/vl-source-vector&gt;\n  &lt;/vl-layer-vector&gt;\n  &lt;!--// pacman --&gt;\n\n  &lt;!-- current position overlay --&gt;\n  &lt;vl-layer-vector v-if=&quot;position.length&quot; id=&quot;position-layer&quot; :z-index=&quot;100&quot; :overlay=&quot;true&quot;&gt;\n    &lt;vl-style-container&gt;\n      &lt;vl-style-icon src=&quot;static/img/marker.png&quot; :scale=&quot;0.3&quot; :anchor=&quot;[0.5, 1]&quot;/&gt;\n    &lt;/vl-style-container&gt;\n\n    &lt;vl-source-vector&gt;\n      &lt;vl-feature id=&quot;my-position&quot; :z-index=&quot;999&quot;&gt;\n        &lt;vl-geom-point :coordinates=&quot;position&quot;/&gt;\n      &lt;/vl-feature&gt;\n    &lt;/vl-source-vector&gt;\n  &lt;/vl-layer-vector&gt;\n  &lt;!--// current position overlay --&gt;\n&lt;/vl-map&gt;</code></pre>\n\n<h3>JavaScript</h3>\n\n<pre><code class=\"javascript jsx\">import &apos;whatwg-fetch&apos;\nimport { kebabCase, forEach, get, set } from &apos;lodash/fp&apos;\n\nconst computed = {\n  selectedIds () {\n    return this.selected.map(({ id }) =&gt; id)\n  }\n}\n\nconst methods = {\n  geometryTypeToCompName (type) {\n    return &apos;vl-geom-&apos; + kebabCase(type)\n  },\n  updateMapView ({ center, zoom, rotation }) {\n    this.center = center\n    this.zoom = zoom\n    this.rotation = rotation\n  },\n  updateGeoloc ({ position }) {\n    this.position = position\n  },\n  select (plainFeature) {\n    const i = this.selectedIds.indexOf(plainFeature.id)\n    if (i === -1) {\n      this.selected.push(plainFeature)\n    }\n  },\n  unselect ({ id }) {\n    const i = this.selectedIds.indexOf(id)\n    if (i !== -1) {\n      this.selected.splice(i, 1)\n    }\n  },\n  async loadData () {\n    const res = await fetch(&apos;https://openlayers.org/en/latest/examples/data/geojson/countries.geojson&apos;)\n    const geomCollection = await res.json()\n    this.countries = geomCollection.features.map((feature, i) =&gt; {\n      feature.properties = {\n        ...feature.properties,\n        color: i % 2 === 0 ? [ 49, 163, 84, 0.35 ] : [ 166, 100, 255, 0.35 ],\n        selectColor: (i + 1) % 2 !== 0 ? [ 221, 28, 119, 0.5 ] : undefined\n      }\n\n      return feature\n    })\n\n    return this.countries\n  },\n  selectStyleFunc (s) {\n    const styleName = &apos;select&apos;\n    const styleByFeature = {}\n    const self = this\n    const stroke = s.stroke({\n      strokeColor: &apos;#8856a7&apos;,\n      strokeWidth: 4\n    })\n\n    return function __selectStyleFunc ({ id, properties }, resolution) {\n      if (properties.selectColor) {\n        let styles = get([ id, styleName ], styleByFeature)\n        if (!styles) {\n          styles = [\n            s.style({\n              stroke,\n              fillColor: properties.selectColor\n            })\n          ]\n\n          set([ id, styleName ], styles, styleByFeature)\n        }\n\n        return styles\n      }\n    }\n  },\n  countriesStyleFunc (s) {\n    const stroke = s.stroke({\n      strokeColor: &apos;#8856a7&apos;,\n      strokeWidth: 1\n    })\n    const styleName = &apos;default&apos;\n    const styleByFeature = {}\n    const self = this\n\n    return function __countriesStyleFunc ({ id, properties }) {\n      let styles = get([ id, styleName ], styleByFeature)\n      if (!styles) {\n        styles = [\n          s.style({\n            stroke,\n            fillColor: properties.color\n          })\n        ]\n\n        set([ id, styleName ], styles, styleByFeature)\n      }\n\n      return styles\n    }\n  },\n  pacmanStyleFunc (s) {\n    const pacman = [\n      s.style({\n        strokeColor: &apos;#DE9147&apos;,\n        strokeWidth: 3,\n        fillColor: [ 222, 189, 36, 0.8 ]\n      })\n    ]\n    const path = [\n      s.style({\n        strokeColor: &apos;blue&apos;,\n        strokeWidth: 1\n      }),\n      s.style({\n        imageRadius: 5,\n        imageFillColor: &apos;orange&apos;,\n        geom ({ geometry }) {\n          // geometry is an LineString, convert it to MultiPoint to style vertex\n          // use turf.js for complex work with geometries\n          return {\n            ...geometry,\n            type: &apos;MultiPoint&apos;\n          }\n        }\n      })\n    ]\n    const eye = [\n      s.style({\n        imageRadius: 6,\n        imageFillColor: &apos;#444444&apos;\n      })\n    ]\n\n    return function __pacmanStyleFunc (feature) {\n      switch (feature.id) {\n        case &apos;pacman&apos;:\n          return pacman\n        case &apos;pacman-path&apos;:\n          return path\n        case &apos;pacman-eye&apos;:\n          return eye\n      }\n    }\n  },\n  toggleLayer (layer) {\n    this.layers[ layer ] = !this.layers[ layer ]\n  },\n  selectFilter (feature, layer) {\n    return layer &amp;&amp; layer.id &amp;&amp; [ &apos;position-layer&apos;, &apos;pacman&apos; ].indexOf(layer.id) === -1\n  }\n}\n\nconst watch = {\n  sourceCode (value) {\n    if (value) {\n      this.$nextTick(() =&gt; {\n        forEach(::highlight.highlightBlock, this.$refs.sourceCode.querySelectorAll(&apos;pre &gt; code&apos;))\n      })\n    }\n  }\n}\n\nexport default {\n  name: &apos;app&apos;,\n  computed,\n  watch,\n  methods,\n  data () {\n    return {\n      zoom: 2,\n      center: [ 0, 0 ],\n      rotation: 0,\n      selected: [],\n      countries: [],\n      pacman: require(&apos;../static/pacman.geojson&apos;).features,\n      position: [],\n      layers: {\n        osm: false,\n        mapbox: true,\n        countries: true,\n        pacman: false,\n        wms: false\n      }\n    }\n  },\n  created () {\n    this.loadData()\n      .catch(::console.error)\n  }\n}</code></pre>\n"

/***/ }),

/***/ 1005:
/***/ (function(module, exports) {

module.exports = "<h2 id=\"install\">Install</h2>\n\n<pre><code class=\"bash\"># install Vue and VueLayers\nnpm install -S vue vuelayers</code></pre>\n\n<h2 id=\"usage\">Usage</h2>\n\n<h4 id=\"fullimport\">Full import</h4>\n\n<p>Import full library code with all components and mixins</p>\n\n<pre><code class=\"javascript jsx\">import Vue from &apos;vue&apos;\nimport VueLayers from &apos;vuelayers&apos;\n\nVue.use(VueLayers)\n// now all components installed and ready to use\nnew Vue({\n  el: &apos;#app&apos;,\n  render: h =&gt; h(App)\n})</code></pre>\n\n<p>\n  <strong>Note</strong>: CSS file needs to be imported separately. <br/>\n  Inside your App.vue\n</p>\n\n<pre><code class=\"vue\">&lt;template&gt;...&lt;/template&gt;\n&lt;script&gt;...&lt;/script&gt;\n&lt;style&gt;\n  @import &apos;~vuelayers/dist/style.css&apos;;\n&lt;/style&gt;</code></pre>\n\n<h4 id=\"ondemand\">On demand</h4>\n\n<p>First, install <a href=\"https://github.com/QingWei-Li/babel-plugin-component\">babel-plugin-component</a></p>\n\n<pre><code class=\"bash\">npm install babel-plugin-component -D</code></pre>\n\n<p>Then edit your <code>.babelrc</code></p>\n\n<pre><code class=\"json\">{\n  &quot;presets&quot;: [\n    [&quot;es2015&quot;, &quot;latest&quot;]\n  ],\n  &quot;plugins&quot;: [[&quot;component&quot;, [\n    {\n      &quot;libraryName&quot;: &quot;vuelayers&quot;,\n      &quot;style&quot;: true,\n      &quot;libDir&quot;: &quot;dist&quot;\n    }\n  ]]]\n}</code></pre>\n\n<p>Now you can import only what you need</p>\n\n<pre><code class=\"javascript jsx\">import Vue from &apos;vue&apos;\nimport { Map, MapView, LayerTile, SourceOsm } from &apos;vuelayers&apos;\n\nVue.use(Map)\nVue.use(MapView)\nVue.use(LayerTile)\nVue.use(SourceOsm)\n\nnew Vue({\n  el: &apos;#app&apos;,\n  render: h =&gt; h(App)\n})</code></pre>\n\n<p><strong>Note</strong>: the above library setup automatically imports CSS files</p>\n"

/***/ }),

/***/ 1008:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1060)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(424),
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

/***/ 1009:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1042)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(425),
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

/***/ 1010:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1041)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(426),
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

/***/ 1011:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1037)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(427),
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

/***/ 1012:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1035)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(428),
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

/***/ 1013:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1056)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(429),
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

/***/ 1014:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1058)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(430),
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

/***/ 1015:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1057)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(431),
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

/***/ 1016:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1045)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(432),
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

/***/ 1017:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1039)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(433),
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

/***/ 1018:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1048)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(434),
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

/***/ 1019:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1051)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(435),
  /* template */
  __webpack_require__(1033),
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

/***/ 1020:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1047)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(436),
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

/***/ 1021:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1040)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(437),
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

/***/ 1022:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1053)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(438),
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

/***/ 1023:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1055)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(439),
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

/***/ 1024:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1038)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(440),
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

/***/ 1025:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1043)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(441),
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

/***/ 1026:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1049)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(442),
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

/***/ 1027:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1036)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(443),
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

/***/ 1028:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1054)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(444),
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

/***/ 1029:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1046)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(445),
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

/***/ 1030:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1050)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(446),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/style/reg-shape/reg-shape.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5df181ac", Component.options)
  } else {
    hotAPI.reload("data-v-5df181ac", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 1031:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1059)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(447),
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

/***/ 1032:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1044)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(448),
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

/***/ 1033:
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

/***/ 1034:
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
      "id": "position-layer",
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

/***/ 1035:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(509);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("168c8ef8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-05891369\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-05891369\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1036:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(510);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("05e845d9", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0b5ed210\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fill.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0b5ed210\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fill.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1037:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(511);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("09ff25df", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0dfe7ca2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0dfe7ca2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1038:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(512);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("f93be660", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0fd05d4c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0fd05d4c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1039:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(513);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("42ee7070", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-20415277\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layer.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-20415277\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1040:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(514);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("8d7def0a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-23ecb9dc\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-23ecb9dc\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1041:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(515);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("57b12644", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2fa219ca\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2fa219ca\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1042:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(516);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("6454999a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-331d2e16\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geoloc.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-331d2e16\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geoloc.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1043:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(517);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("f68f7e90", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-33dfe2d8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./circle.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-33dfe2d8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./circle.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1044:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(518);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("8901fdc6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-35035356\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./view.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-35035356\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./view.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1045:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(519);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("612e8b8e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3dd73c25\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./interaction.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3dd73c25\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./interaction.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1046:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(520);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("314c1450", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3e69a0b8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./icon.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3e69a0b8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./icon.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1047:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(521);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("f7bd250c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-4e3aff90\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-4e3aff90\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1048:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(522);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("3565dc6a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-53ea49e8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layer.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-53ea49e8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1049:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(523);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("734d6f39", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-5417799c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./container.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-5417799c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./container.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1050:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(524);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("2bcca194", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-5df181ac\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./reg-shape.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-5df181ac\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./reg-shape.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1051:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(525);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("6f7fa290", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-61f65070\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./map.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-61f65070\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./map.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1052:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(526);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("541b2398", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6474fc42\",\"scoped\":false,\"hasInlineConfig\":true}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6474fc42\",\"scoped\":false,\"hasInlineConfig\":true}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1053:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(527);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("bf6eb1c2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6475a688\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6475a688\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1054:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(528);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("08bb1739", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-678e6798\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./func.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-678e6798\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./func.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1055:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(529);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("54a4537a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6c1a7ff0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6c1a7ff0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1056:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(530);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("9ea0060c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-71976d7f\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-71976d7f\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1057:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(531);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("86d78ade", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7a0f34eb\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7a0f34eb\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1058:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(532);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("3f6f6d01", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-8c387456\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-8c387456\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1059:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(533);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("6a3bafcb", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-977b0450\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./stroke.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-977b0450\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./stroke.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1060:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(534);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("ddb26c32", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-e8970bb8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./feature.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-e8970bb8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./feature.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xyz = __webpack_require__(355);

var _xyz2 = _interopRequireDefault(_xyz);

var _tileBase = __webpack_require__(163);

var _tileBase2 = _interopRequireDefault(_tileBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {
  createSource: function createSource() {
    return new _xyz2.default({
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
module.exports = exports['default'];

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = __webpack_require__(61);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  snapToPixel: {
    type: Boolean,
    default: true
  }
};

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
  inject: _style2.default.inject.concat(['setImage']),
  props: props,
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
module.exports = exports['default'];

/***/ }),

/***/ 118:
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

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPlainObject2 = __webpack_require__(311);

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isBoolean2 = __webpack_require__(832);

var _isBoolean3 = _interopRequireDefault(_isBoolean2);

var _isString2 = __webpack_require__(834);

var _isString3 = _interopRequireDefault(_isString2);

var _isNumber2 = __webpack_require__(833);

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _pickBy2 = __webpack_require__(839);

var _pickBy3 = _interopRequireDefault(_pickBy2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @func
 * @param {Object} value
 * @param {Object} Returns object only with plain properties.
 */
var plainProps = (0, _pickBy3.default)(function (x) {
  return (0, _isNumber3.default)(x) || (0, _isString3.default)(x) || Array.isArray(x) || (0, _isBoolean3.default)(x) || (0, _isPlainObject3.default)(x);
});
exports.default = plainProps;
module.exports = exports['default'];

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LAYER_PROP = exports.WMS_VERSION = exports.GEOMETRY_TYPE = exports.WGS84_SPHERE = exports.EARTH_RADIUS = exports.PIXEL_RATIO = exports.CACHE_SIZE = exports.ZOOM_FACTOR = exports.TILE_SIZE = exports.MIN_ZOOM = exports.MAX_ZOOM = exports.DATA_PROJECTION = exports.MAP_PROJECTION = undefined;

var _sphere = __webpack_require__(214);

var _sphere2 = _interopRequireDefault(_sphere);

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
var WGS84_SPHERE = exports.WGS84_SPHERE = new _sphere2.default(EARTH_RADIUS);

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

/**
 * @type {string} Default WMS version
 */
var WMS_VERSION = exports.WMS_VERSION = '1.3.0';
// todo try with Symbol to prevent conflicts with user provided properties
var LAYER_PROP = exports.LAYER_PROP = 'layer';

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(32);

var _extends3 = _interopRequireDefault(_extends2);

var _create = __webpack_require__(64);

var _create2 = _interopRequireDefault(_create);

var _defineProperties = __webpack_require__(65);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _v = __webpack_require__(382);

var _v2 = _interopRequireDefault(_v);

var _Observable = __webpack_require__(11);

__webpack_require__(159);

__webpack_require__(63);

var _rxSubs = __webpack_require__(39);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _stubVnode = __webpack_require__(40);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

var _coordinate = __webpack_require__(62);

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
      return Array.isArray(value) && value.length === 4;
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

var computed = {
  currentId: function currentId() {
    return this.id;
  },
  currentMinResolution: function currentMinResolution() {
    return this.minResolution;
  },
  currentMaxResolution: function currentMaxResolution() {
    return this.maxResolution;
  },
  currentExtent: function currentExtent() {
    return this.extent;
  },
  currentOpacity: function currentOpacity() {
    return this.opacity;
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
    /**
     * @type {Layer}
     * @protected
     */
    this.layer = this.createLayer();
    this.layer.setProperties({
      id: this.currentId,
      vm: this
    });
  },

  /**
   * @return {Layer}
   * @protected
   */
  createLayer: function createLayer() {
    throw new Error('Not implemented method');
  },

  /**
   * @protected
   */
  mountLayer: function mountLayer() {
    if (!this.map) {
      throw new Error("Invalid usage of layer component, should have map component among it's ancestors");
    }

    if (this.overlay) {
      this.layer.setMap(this.map);
    } else {
      this.map.addLayer(this.layer);
    }
    this.subscribeAll();
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
  },
  subscribeAll: function subscribeAll() {
    subscribeToMapEvents.call(this);
  },
  isAtPixel: function isAtPixel(pixel) {
    var _this = this;

    return this.map.forEachLayerAtPixel(pixel, function (layer) {
      return layer === _this.layer;
    });
  }
};

var watch = {
  currentId: function currentId(value) {
    return this.layer.set('id', value);
  },
  currentMaxResolution: function currentMaxResolution(value) {
    this.layer.setMaxResolution(value);
  },
  currentMinResolution: function currentMinResolution(value) {
    this.layer.setMinResolution(value);
  },
  currentOpacity: function currentOpacity(value) {
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
  mixins: [_rxSubs2.default, _stubVnode2.default],
  inject: ['map', 'view'],
  props: props,
  computed: computed,
  methods: methods,
  watch: watch,
  stubVNode: {
    attrs: function attrs() {
      return {
        id: [this.$options.name, this.currentId].join('-')
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
      _this3.layer = undefined;
    });
  }
};


function subscribeToMapEvents() {
  var _this4 = this;

  var pointerEvents = _Observable.Observable.fromOlEvent(this.map, ['click', 'dblclick', 'singleclick'], function (_ref) {
    var type = _ref.type,
        pixel = _ref.pixel,
        coordinate = _ref.coordinate;
    return { type: type, pixel: pixel, coordinate: coordinate };
  }).map(function (evt) {
    return (0, _extends3.default)({}, evt, {
      coordinate: (0, _coordinate.toLonLat)(evt.coordinate, _this4.view.getProjection())
    });
  });

  this.subscribeTo(pointerEvents, function (evt) {
    if (_this4.isAtPixel(evt.pixel)) {
      _this4.$emit(evt.type, evt);
    }
  });
}
module.exports = exports['default'];

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(64);

var _create2 = _interopRequireDefault(_create);

var _defineProperties = __webpack_require__(65);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _rxSubs = __webpack_require__(39);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _stubVnode = __webpack_require__(40);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

var _consts = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  attributions: [String, Array],
  projection: {
    type: String,
    default: _consts.MAP_PROJECTION
  },
  wrapX: {
    type: Boolean,
    default: true
  },
  logo: String
};

var computed = {
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
     * @type {Source}
     * @protected
     */
    this.source = this.createSource();
    this.source.set('vm', this);
  },

  /**
   * @return {Source}
   * @protected
   */
  createSource: function createSource() {
    throw new Error('Not implemented method');
  },
  mountSource: function mountSource() {
    if (!this.layer) {
      throw new Error("Invalid usage of source component, should have layer component among it's ancestors");
    }

    this.layer.setSource(this.source);
    this.subscribeAll();
  },
  unmountSource: function unmountSource() {
    this.unsubscribeAll();
    this.layer && this.layer.setSource(undefined);
  },
  refresh: function refresh() {
    this.source.changed();
  }
};

var watch = {
  currentAttributions: function currentAttributions(value) {
    this.source.setAttributions(value);
  },
  currentProjection: function currentProjection(value) {
    // todo recreate source?
  }
};

exports.default = {
  mixins: [_rxSubs2.default, _stubVnode2.default],
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
module.exports = exports['default'];

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pick2 = __webpack_require__(314);

var _pick3 = _interopRequireDefault(_pick2);

var _proj = __webpack_require__(16);

var _proj2 = _interopRequireDefault(_proj);

var _tilegrid = __webpack_require__(81);

var _tilegrid2 = _interopRequireDefault(_tilegrid);

var _olTilecache = __webpack_require__(420);

var _consts = __webpack_require__(15);

var _replaceTokens = __webpack_require__(419);

var _replaceTokens2 = _interopRequireDefault(_replaceTokens);

var _source = __webpack_require__(162);

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
      return [_consts.TILE_SIZE, _consts.TILE_SIZE];
    },
    validator: function validator(value) {
      return Array.isArray(value) && value.length === 2;
    }
  },
  tilePixelRatio: {
    type: Number,
    default: _consts.PIXEL_RATIO
  },
  crossOrigin: {
    type: String,
    default: 'anonymous'
  },
  cacheSize: {
    type: Number,
    default: _consts.CACHE_SIZE
  },
  opaque: Boolean,
  minZoom: {
    type: Number,
    default: _consts.MIN_ZOOM
  },
  maxZoom: {
    type: Number,
    default: _consts.MAX_ZOOM
  },
  reprojectionErrorThreshold: {
    type: Number,
    default: 0.5
  }
};

var computed = {
  currentUrl: function currentUrl() {
    return this.url;
  },
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
   * @return {TileGrid}
   * @protected
   */
  createTileGrid: function createTileGrid() {
    /**
     * @type {Extent}
     * @protected
     */
    this.tileGridExtent = _proj2.default.get(this.currentProjection).getExtent();
    /**
     * @type {TileGrid}
     * @protected
     */
    this.tileGrid = _tilegrid2.default.createXYZ({
      extent: this.tileGridExtent,
      minZoom: this.currentMinZoom,
      maxZoom: this.currentMaxZoom,
      tileSize: this.currentTileSize
    });

    return this.tileGrid;
  },

  /**
   * @return {TileUrlFunction}
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
    return (0, _replaceTokens2.default)(this.currentUrl, (0, _pick3.default)(this.urlTokens, this));
  }
};

var watch = {
  currentUrl: function currentUrl() {
    this.source.setTileUrlFunction(this.createTileUrlFunction());
  },
  currentTileSize: function currentTileSize() {
    this.source.setTileUrlFunction(this.createTileUrlFunction());
  },
  currentProjection: function currentProjection() {
    this.source.setTileUrlFunction(this.createTileUrlFunction());
  },
  currentMinZoom: function currentMinZoom() {
    this.source.setTileUrlFunction(this.createTileUrlFunction());
  },
  currentMaxZoom: function currentMaxZoom() {
    this.source.setTileUrlFunction(this.createTileUrlFunction());
  }
};

exports.default = {
  mixins: [_source2.default],
  props: props,
  computed: computed,
  methods: methods,
  watch: watch
};
module.exports = exports['default'];

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(87);

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__(32);

var _extends3 = _interopRequireDefault(_extends2);

var _keys = __webpack_require__(88);

var _keys2 = _interopRequireDefault(_keys);

var _upperFirst2 = __webpack_require__(842);

var _upperFirst3 = _interopRequireDefault(_upperFirst2);

var _pick2 = __webpack_require__(314);

var _pick3 = _interopRequireDefault(_pick2);

var _lowerFirst2 = __webpack_require__(836);

var _lowerFirst3 = _interopRequireDefault(_lowerFirst2);

var _isPlainObject2 = __webpack_require__(311);

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _flow2 = __webpack_require__(308);

var _flow3 = _interopRequireDefault(_flow2);

exports.defaultStyle = defaultStyle;
exports.defaultEditStyle = defaultEditStyle;
exports.style = style;
exports.normalizeColorValue = normalizeColorValue;
exports.fill = fill;
exports.stroke = stroke;
exports.image = image;
exports.text = text;
exports.geom = geom;

var _parseColor = __webpack_require__(969);

var _parseColor2 = _interopRequireDefault(_parseColor);

var _geometry = __webpack_require__(108);

var _geometry2 = _interopRequireDefault(_geometry);

var _style = __webpack_require__(115);

var _style2 = _interopRequireDefault(_style);

var _fill = __webpack_require__(155);

var _fill2 = _interopRequireDefault(_fill);

var _stroke = __webpack_require__(156);

var _stroke2 = _interopRequireDefault(_stroke);

var _circle = __webpack_require__(216);

var _circle2 = _interopRequireDefault(_circle);

var _icon = __webpack_require__(362);

var _icon2 = _interopRequireDefault(_icon);

var _regularshape = __webpack_require__(218);

var _regularshape2 = _interopRequireDefault(_regularshape);

var _text = __webpack_require__(962);

var _text2 = _interopRequireDefault(_text);

var _image = __webpack_require__(217);

var _image2 = _interopRequireDefault(_image);

var _isNumeric = __webpack_require__(418);

var _isNumeric2 = _interopRequireDefault(_isNumeric);

var _consts = __webpack_require__(15);

var _geojson = __webpack_require__(49);

var geoJson = _interopRequireWildcard(_geojson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reduce = __webpack_require__(840).convert({ cap: false });

/**
 * @typedef {Object} VlStyle
 *
 * Shared
 * @property {string|number[]|undefined} fillColor
 * @property {string|number[]|undefined} strokeColor
 * @property {number|undefined} strokeWidth
 * @property {number[]|undefined} strokeDash
 * @property {string|undefined} strokeCap
 * @property {string|undefined} strokeJoin
 * @property {number|undefined} zIndex
 * @property {ol.style.Fill|undefined} fill
 * @protected {ol.style.Stroke|undefined} stroke
 *
 * Text only
 * @property {string|ol.style.Text|undefined} text
 * @property {string|undefined} textFont
 * @property {number|undefined} textFontSize
 * @property {string|number[]|undefined} textFillColor
 * @property {string|number[]|undefined} textStrokeColor
 * @property {number|undefined} textStrokeWidth
 * @property {number[]|undefined} textStrokeDash
 * @property {string|undefined} textStrokeCap
 * @property {string|undefined} textStrokeJoin
 * @property {number|undefined} textScale
 * @property {string|undefined} textAlign
 * @property {number|undefined} textRotation
 * @property {number|undefined} textOffsetX
 * @property {number|undefined} textOffsetY
 * @protected {ol.style.Stroke|undefined} textStroke
 * @protected {ol.style.Fill|undefined} textFill
 *
 * Image only
 * @property {ol.style.Image|Image|undefined} image
 * @property {string|undefined} imageSrc
 * @property {number[]|undefined} imageSize
 * @property {number[]|undefined} imageImgSize
 * @property {number|undefined} imageOffset
 * @property {number[]|undefined} imageAnchor
 * @property {number|undefined} imageScale
 * @property {number|undefined} imageRotation
 * @property {number|undefined} imageRadius
 * @property {number|undefined} imageRadius1
 * @property {number|undefined} imageRadius2
 * @property {number|undefined} imagePoints
 * @property {number|undefined} imageAngle
 * @property {number|undefined} imageOpacity
 * @property {string|number[]|undefined} imageFillColor
 * @property {string|number[]|undefined} imageStrokeColor
 * @property {number|undefined} imageStrokeWidth
 * @property {number[]|undefined} imageStrokeDash
 * @property {string|undefined} imageStrokeCap
 * @property {string|undefined} imageStrokeJoin
 * @property {ol.style.IconOrigin|undefined} imageAnchorOrigin
 * @property {ol.ColorLike|undefined} imageColor
 * @property {ol.style.IconOrigin|undefined} imageOffsetOrigin
 * @protected {ol.style.Stroke|undefined} imageStroke
 * @protected {ol.style.Fill|undefined} imageFill
 */

/**
 * @return {VlStyle[]}
 */
/**
 * Style helpers
 */
function defaultStyle() {
  return [{
    fillColor: [255, 255, 255, 0.4],
    strokeColor: '#3399CC',
    strokeWidth: 1.25,
    imageRadius: 5
  }];
}

/**
 * @return {Object<GEOMETRY_TYPE, Array<VlStyle>>}
 */
function defaultEditStyle() {
  /** @type {Object<GEOMETRY_TYPE, Array<VlStyle>>} */
  var styles = {};
  var white = [255, 255, 255, 1];
  var blue = [0, 153, 255, 1];
  var width = 3;

  styles[_consts.GEOMETRY_TYPE.LINE_STRING] = [{
    strokeColor: white,
    strokeWidth: width + 2
  }, {
    strokeColor: blue,
    strokeWidth: width
  }];
  styles[_consts.GEOMETRY_TYPE.MULTI_LINE_STRING] = styles[_consts.GEOMETRY_TYPE.LINE_STRING];

  styles[_consts.GEOMETRY_TYPE.POLYGON] = [{
    fillColor: [255, 255, 255, 0.5]
  }].concat(styles[_consts.GEOMETRY_TYPE.LINE_STRING]);
  styles[_consts.GEOMETRY_TYPE.MULTI_POLYGON] = styles[_consts.GEOMETRY_TYPE.POLYGON];

  styles[_consts.GEOMETRY_TYPE.CIRCLE] = styles[_consts.GEOMETRY_TYPE.POLYGON].concat(styles[_consts.GEOMETRY_TYPE.LINE_STRING]);

  styles[_consts.GEOMETRY_TYPE.POINT] = [{
    imageRadius: width * 2,
    fillColor: blue,
    strokeColor: white,
    strokeWidth: width / 2,
    zIndex: Infinity
  }];
  styles[_consts.GEOMETRY_TYPE.MULTI_POINT] = styles[_consts.GEOMETRY_TYPE.POINT];

  styles[_consts.GEOMETRY_TYPE.GEOMETRY_COLLECTION] = styles[_consts.GEOMETRY_TYPE.POLYGON].concat(styles[_consts.GEOMETRY_TYPE.LINE_STRING], styles[_consts.GEOMETRY_TYPE.POINT]);

  return styles;
}

var isEmpty = function isEmpty(x) {
  if (x == null) return true;
  if (typeof x === 'number') return false;

  return (typeof x === 'string' || Array.isArray(x)) && !x.length || !(0, _keys2.default)(x).length;
};

/**
 * @param {VlStyle} vlStyle
 * @return {Style|undefined}
 */
function style(vlStyle) {
  if (isEmpty(vlStyle)) return;

  var olStyle = {
    text: text(vlStyle),
    fill: fill(vlStyle),
    stroke: stroke(vlStyle),
    image: image(vlStyle),
    geometry: geom(vlStyle),
    zIndex: vlStyle.zIndex
  };

  if (!isEmpty(olStyle)) {
    return new _style2.default(olStyle);
  }
}

var addPrefix = function addPrefix(prefix) {
  return function (str) {
    return prefix + (prefix ? (0, _upperFirst3.default)(str) : str);
  };
};

function normalizeColorValue(color) {
  var c = color;

  if (typeof color === 'string') {
    c = (0, _parseColor2.default)(color).rgba;
  }

  return c;
}

/**
 * @param {VlStyle} vlStyle
 * @param {string} [prefix]
 * @returns {Fill|undefined}
 */
function fill(vlStyle) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var prefixKey = addPrefix(prefix);
  var keys = ['fillColor'].map(prefixKey);
  var compiledKey = prefixKey('fill');

  // check on already compiled style existence
  if (vlStyle[compiledKey] instanceof _fill2.default) return vlStyle[compiledKey];

  var transform = (0, _flow3.default)((0, _pick3.default)(keys), reduce(function (result, value, name) {
    name = (0, _lowerFirst3.default)(name.replace(new RegExp(prefixKey('fill')), ''));

    if (name === 'color') {
      value = normalizeColorValue(value);
    }

    result[name] = value;

    return result;
  }, {}));

  var fillStyle = transform(vlStyle);

  if (!isEmpty(fillStyle)) {
    return new _fill2.default(fillStyle);
  }
}

/**
 * @param {VlStyle} vlStyle
 * @param {string} [prefix]
 * @returns {Stroke|undefined}
 */
function stroke(vlStyle) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var prefixKey = addPrefix(prefix);
  var keys = ['strokeColor', 'strokeWidth', 'strokeDash', 'strokeCap', 'strokeJoin'].map(prefixKey);
  var compiledKey = prefixKey('stroke');

  if (vlStyle[compiledKey] instanceof _stroke2.default) return vlStyle[compiledKey];

  var transform = (0, _flow3.default)((0, _pick3.default)(keys), reduce(function (result, value, name) {
    switch (name) {
      case prefixKey('strokeColor'):
      case prefixKey('strokeWidth'):
        name = (0, _lowerFirst3.default)(name.replace(new RegExp(prefixKey('stroke')), ''));
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

  var strokeStyle = transform(vlStyle);

  if (!isEmpty(strokeStyle)) {
    return new _stroke2.default(strokeStyle);
  }
}

/**
 * @param {VlStyle} vlStyle
 * @returns {Icon|Circle|RegularShape|undefined}
 * @todo split to separate circle, regShape, Icon
 */
function image(vlStyle) {
  if (isEmpty(vlStyle.imageSrc) && isEmpty(vlStyle.image) && isEmpty(vlStyle.imagePoints) && !(0, _isNumeric2.default)(vlStyle.imageRadius)) {
    return;
  }

  if (vlStyle.image instanceof _image2.default) return vlStyle.image;

  var imageStyle = void 0,
      Ctor = void 0;

  if (!isEmpty(vlStyle.imageSrc) || !isEmpty(vlStyle.image)) {
    // icon construction
    Ctor = _icon2.default;
    // then create ol.style.Icon options
    imageStyle = (0, _extends3.default)({}, vlStyle, {
      anchor: vlStyle.imageAnchor,
      anchorOrigin: vlStyle.imageAnchorOrigin,
      color: vlStyle.imageColor,
      offset: vlStyle.imageOffset,
      offsetOrigin: vlStyle.imageOffsetOrigin,
      opacity: vlStyle.imageOpacity,
      scale: vlStyle.imageScale,
      rotation: vlStyle.imageRotation,
      size: vlStyle.imageSize,
      img: vlStyle.image,
      imgSize: vlStyle.imageImgSize,
      src: vlStyle.imageSrc,
      crossOrigin: 'anonymous'
    });
  } else if (vlStyle.imagePoints != null) {
    // regular shape construction
    Ctor = _regularshape2.default;
    // create ol.style.RegularShape options
    imageStyle = (0, _extends3.default)({}, vlStyle, {
      points: vlStyle.imagePoints,
      radius: vlStyle.imageRadius,
      radius1: vlStyle.imageRadius1,
      radius2: vlStyle.imageRadius2,
      angle: vlStyle.imageAngle,
      rotation: vlStyle.imageRotation
    });
  } else {
    // circle construction
    Ctor = _circle2.default;
    // create ol.style.Circle options
    imageStyle = (0, _extends3.default)({}, vlStyle, {
      radius: vlStyle.imageRadius
    });
  }

  imageStyle = (0, _extends3.default)({}, imageStyle, {
    fill: fill(vlStyle, 'image') || fill(vlStyle),
    stroke: stroke(vlStyle, 'image') || stroke(vlStyle),
    snapToPixel: true
  });

  if (!isEmpty(imageStyle)) {
    return new Ctor(imageStyle);
  }
}

/**
 * @param {VlStyle} vlStyle
 * @returns {Text|undefined}
 */
function text(vlStyle) {
  // noinspection JSValidateTypes
  if (vlStyle.text == null) return;
  if (vlStyle.text instanceof _text2.default) return vlStyle.text;

  var textStyle = {
    text: vlStyle.text
  };

  var fontSize = vlStyle.textFontSize ? vlStyle.textFontSize + 'px' : undefined;
  var font = ['normal', fontSize, vlStyle.textFont].filter(function (x) {
    return !!x;
  }).join(' ');

  (0, _assign2.default)(textStyle, (0, _pick3.default)(['textScale', 'textRotation', 'textOffsetX', 'textOffsetY', 'textAlign'], vlStyle), {
    font: font,
    fill: fill(vlStyle, 'text') || fill(vlStyle),
    stroke: stroke(vlStyle, 'text') || stroke(vlStyle)
  });

  if (!isEmpty(textStyle)) {
    return new _text2.default(textStyle);
  }
}

/**
 * @param {VlStyle} vlStyle
 * @return {ol.geom.Geometry|ol.StyleGeometryFunction|undefined}
 */
function geom(vlStyle) {
  // todo how to transform to current map projection? now is assumed EPSG:3857
  var processGeom = function processGeom(geom) {
    if (geom == null) return;
    if (geom instanceof _geometry2.default) return geom;
    if ((0, _isPlainObject3.default)(geom)) return geoJson.readGeometry(geom);
  };

  if (typeof vlStyle.geom === 'function') {
    return function __styleGeomFunc(feature) {
      var geomFn = vlStyle.geom || function () {};
      var geom = geomFn(geoJson.writeFeature(feature));

      return processGeom(geom);
    };
  }

  return processGeom(vlStyle.geom);
}

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(64);

var _create2 = _interopRequireDefault(_create);

var _defineProperties = __webpack_require__(65);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _rxSubs = __webpack_require__(39);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _stubVnode = __webpack_require__(40);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

var methods = {
  /**
   * @protected
   */
  initialize: function initialize() {
    /**
     * @type {Interaction}
     * @protected
     */
    this.interaction = this.createInteraction();
    this.interaction.set('vm', this);
  },

  /**
   * @return {Interaction}
   * @protected
   */
  createInteraction: function createInteraction() {
    throw new Error('Not implemented method');
  },

  /**
   * @protected
   */
  mountInteraction: function mountInteraction() {
    if (!this.map) {
      throw new Error("Invalid usage of interaction component, should have map component among it's ancestors");
    }

    this.map.addInteraction(this.interaction);
    this.subscribeAll();
  },

  /**
   * @protected
   */
  unmountInteraction: function unmountInteraction() {
    this.unsubscribeAll();
    this.map && this.map.removeInteraction(this.interaction);
  },
  refresh: function refresh() {
    this.interaction.changed();
  }
};

exports.default = {
  mixins: [_rxSubs2.default, _stubVnode2.default],
  inject: ['map', 'view'],
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
module.exports = exports['default'];

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tile = __webpack_require__(907);

var _tile2 = _interopRequireDefault(_tile);

var _layer = __webpack_require__(161);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  preload: Number
};

var methods = {
  /**
   * @return {TileLayer}
   */
  createLayer: function createLayer() {
    return new _tile2.default({
      id: this.currentId,
      minResolution: this.currentMinResolution,
      maxResolution: this.currentMaxResolution,
      opacity: this.currentOpacity,
      visible: this.visible,
      preload: this.preload,
      extent: this.currentExtent,
      zIndex: this.zIndex
    });
  }
};

exports.default = {
  mixins: [_layer2.default],
  props: props,
  methods: methods
};
module.exports = exports['default'];

/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(87);

var _assign2 = _interopRequireDefault(_assign);

var _vector = __webpack_require__(209);

var _vector2 = _interopRequireDefault(_vector);

var _layer = __webpack_require__(161);

var _layer2 = _interopRequireDefault(_layer);

var _target = __webpack_require__(86);

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
  /**
   * @return {VectorLayer}
   */
  createLayer: function createLayer() {
    return new _vector2.default({
      id: this.currentId,
      minResolution: this.currentMinResolution,
      maxResolution: this.currentMaxResolution,
      opacity: this.currentOpacity,
      visible: this.visible,
      preload: this.preload,
      extent: this.currentExtent,
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
module.exports = exports['default'];

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(166);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(236);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = __webpack_require__(165);

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = __webpack_require__(234);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _differenceWith2 = __webpack_require__(307);

var _differenceWith3 = _interopRequireDefault(_differenceWith2);

var _merge2 = __webpack_require__(312);

var _merge3 = _interopRequireDefault(_merge2);

var _vector = __webpack_require__(354);

var _vector2 = _interopRequireDefault(_vector);

var _loadingstrategy = __webpack_require__(333);

var _loadingstrategy2 = _interopRequireDefault(_loadingstrategy);

var _extent = __webpack_require__(232);

var _geojson = __webpack_require__(49);

var geoJson = _interopRequireWildcard(_geojson);

var _consts = __webpack_require__(15);

var _source = __webpack_require__(162);

var _source2 = _interopRequireDefault(_source);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
  },
  currentFeatures: function currentFeatures() {
    return this.features;
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

    var loader = this.currentLoader;
    var self = this;

    return function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(extent, resolution, projection) {
        var features;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                projection = projection.getCode();
                extent = (0, _extent.toLonLat)(extent, projection);

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
    return new _vector2.default({
      attributions: this.currentAttributions,
      projection: this.currentProjection,
      loader: this.sourceLoader(),
      useSpatialIndex: this.useSpatialIndex,
      wrapX: this.wrapX,
      logo: this.logo,
      strategy: _loadingstrategy2.default.bbox
      // url: this.url,
    });
  },
  mountSource: function mountSource() {
    sourceMountSource.call(this);

    if (this.currentFeatures.length) {
      this.source.addFeatures(this.currentFeatures.map(createFeature.bind(this)));
    }
  },
  unmountSource: function unmountSource() {
    sourceUnmountSource.call(this);
    this.clear();
  },
  clear: function clear() {
    this.source.clear();
  }
};

var diffById = (0, _differenceWith3.default)(function (a, b) {
  return a.id === b.id;
});
var watch = {
  currentLoader: function currentLoader() {
    // todo
  },
  currentFeatures: function currentFeatures(value, oldValue) {
    var _this = this;

    var forAdd = diffById(value, oldValue);
    var forRemove = diffById(oldValue, value);

    this.source.addFeatures(forAdd.map(createFeature.bind(this)));
    forRemove.map(function (geoJsonFeature) {
      var feature = _this.source.getFeatureById(geoJsonFeature.id);

      if (feature) {
        _this.source.removeFeature(feature);
        feature.unset(_consts.LAYER_PROP);
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


function createFeature(geoJsonFeature) {
  return geoJson.readFeature((0, _merge3.default)(geoJsonFeature, {
    properties: (0, _defineProperty3.default)({}, _consts.LAYER_PROP, this.layer.get('id'))
  }), this.currentProjection);
}
module.exports = exports['default'];

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(32);

var _extends3 = _interopRequireDefault(_extends2);

var _keys = __webpack_require__(88);

var _keys2 = _interopRequireDefault(_keys);

var _omit2 = __webpack_require__(313);

var _omit3 = _interopRequireDefault(_omit2);

var _tilewms = __webpack_require__(953);

var _tilewms2 = _interopRequireDefault(_tilewms);

var _consts = __webpack_require__(15);

var _coordinate = __webpack_require__(62);

var _tileBase = __webpack_require__(163);

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
  version: {
    type: String,
    default: _consts.WMS_VERSION
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
  currentVersion: function currentVersion() {
    return this.version;
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

var upperCase = function upperCase(x) {
  return x.toUpperCase();
};
var keysToUpperCase = function keysToUpperCase(x) {
  return (0, _keys2.default)(x).map(upperCase);
};
var cleanExtParams = function cleanExtParams(params) {
  return (0, _omit3.default)(['LAYERS', 'VERSION', 'STYLES'], keysToUpperCase(params));
};

var methods = {
  createSource: function createSource() {
    return new _tilewms2.default({
      attributions: this.currentAttributions,
      cacheSize: this.cacheSize,
      params: (0, _extends3.default)({}, cleanExtParams(this.currentExtParams), {
        LAYERS: this.currentLayers,
        STYLES: this.currentStyles,
        VERSION: this.currentVersion
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
  },

  /**
   * @param {number[]} coordinate Coordinate in EPSG:4326
   * @param {number} [resolution]
   * @param {string} [projection]
   * @param {Object} [params] GetFeatureInfo params. `info_format` at least should be provided.
   *                          If `query_layers` is not provided then the layers specified in the `layers` prop will be used.
   *                          `version` should not be specified here (value from `version` prop will be used).
   * @return {string|undefined}
   */
  getGetFeatureInfoUrl: function getGetFeatureInfoUrl(coordinate) {
    var resolution = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.view.getResolution();
    var projection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.currentProjection;
    var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    return this.source.getFeatureInfoUrl((0, _coordinate.toLonLat)(coordinate, projection), resolution, projection, cleanExtParams(params));
  }
};

var watch = {
  currentLayers: function currentLayers(value) {
    this.source.updateParams({
      LAYERS: value
    });
  },
  currentVersion: function currentVersion(value) {
    this.source.updateParams({
      VERSION: value
    });
  },
  currentStyles: function currentStyles(value) {
    this.source.updateParams({
      STYLES: value
    });
  },
  currentExtParams: function currentExtParams(value) {
    this.source.updateParams(cleanExtParams(value));
  }
};

exports.default = {
  mixins: [_tileBase2.default],
  props: props,
  computed: computed,
  methods: methods,
  watch: watch
};
module.exports = exports['default'];

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = undefined;
exports.fromLonLat = fromLonLat;
exports.toLonLat = toLonLat;

var _proj = __webpack_require__(16);

var _proj2 = _interopRequireDefault(_proj);

var _consts = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extent extensions
 */
var transformExtent = _proj2.default.transformExtent;
exports.transform = transformExtent;

/**
 * @param {Extent} extent
 * @param {ProjectionLike} projection
 * @return {Extent}
 */

function fromLonLat(extent) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return transformExtent(extent, _consts.DATA_PROJECTION, projection);
}

/**
 * @param {Extent} extent
 * @param {ProjectionLike} projection
 * @return {Extent}
 */
function toLonLat(extent) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return transformExtent(extent, projection, _consts.DATA_PROJECTION);
}

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(88);

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = __webpack_require__(32);

var _extends3 = _interopRequireDefault(_extends2);

var _merge2 = __webpack_require__(312);

var _merge3 = _interopRequireDefault(_merge2);

var _omit2 = __webpack_require__(313);

var _omit3 = _interopRequireDefault(_omit2);

var _components = __webpack_require__(395);

var components = _interopRequireWildcard(_components);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keys = ['geom', 'layer', 'source', 'style', 'interaction']; /* global PKG_VERSION, PKG_FULLNAME */
/**
 * VueLayers
 * Vue components to work with OpenLayers.
 *
 * @author Vladimir Vershinin <ghettovoice@gmail.com>
 * @license MIT
 * @copyright (c) 2017, Vladimir Vershinin <ghettovoice@gmail.com>
 */


var flatComponents = (0, _extends3.default)({}, (0, _omit3.default)(keys, components), keys.reduce(function (all, key) {
  return (0, _merge3.default)(all, components[key]);
}, {}));

exports.default = (0, _extends3.default)({
  PKG_NAME: "VueLayers",
  VERSION: "0.5.0"
}, flatComponents, {
  install: function install(Vue) {
    (0, _keys2.default)(flatComponents).forEach(function (key) {
      if (flatComponents[key].install) {
        Vue.use(flatComponents[key]);
      }
    });
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1052)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(423),
  /* template */
  __webpack_require__(1034),
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

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__app__);




__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1__src___default.a)

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  render: h => h(__WEBPACK_IMPORTED_MODULE_2__app___default.a)
})


/***/ }),

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feature = __webpack_require__(1008);

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_feature2.default.install = function (Vue) {
  Vue.component(_feature2.default.name, _feature2.default);
};

exports.default = _feature2.default;
module.exports = exports['default'];

/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geoloc = __webpack_require__(1009);

var _geoloc2 = _interopRequireDefault(_geoloc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geoloc2.default.install = function (Vue) {
  Vue.component(_geoloc2.default.name, _geoloc2.default);
};

exports.default = _geoloc2.default;
module.exports = exports['default'];

/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.GeomMultiPolygon = exports.GeomMultiLineString = exports.GeomMultiPoint = exports.GeomPolygon = exports.GeomLineString = exports.GeomPoint = undefined;

var _geom = __webpack_require__(48);

var _geom2 = _interopRequireDefault(_geom);

var _point = __webpack_require__(393);

var _point2 = _interopRequireDefault(_point);

var _lineString = __webpack_require__(389);

var _lineString2 = _interopRequireDefault(_lineString);

var _polygon = __webpack_require__(394);

var _polygon2 = _interopRequireDefault(_polygon);

var _multiPoint = __webpack_require__(391);

var _multiPoint2 = _interopRequireDefault(_multiPoint);

var _multiLineString = __webpack_require__(390);

var _multiLineString2 = _interopRequireDefault(_multiLineString);

var _multiPolygon = __webpack_require__(392);

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

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(1010);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;
module.exports = exports['default'];

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = __webpack_require__(118);

var noop = function noop() {}; /**
                                * RxJS subscriptions manager.
                                */
exports.default = {
  methods: {
    /**
     * @protected
     */
    subscribeAll: function subscribeAll() {},

    /**
     * @protected
     */
    unsubscribeAll: function unsubscribeAll() {
      this.rxSubs.forEach(function (x) {
        return x.unsubscribe();
      });
      this.rxSubs = [];
    },

    /**
     * @param {Observable} observable
     * @param {function} [next] Next handler or Observer object.
     * @param {function} [error] Error handler.
     * @param {function} [complete] Complete handler.
     * @return {Subscription}
     *
     * @protected
     */
    subscribeTo: function subscribeTo(observable) {
      var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      var _error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

      var complete = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

      _error = function error(err) {
        (0, _debug.errordbg)(err.stack);
        _error(err);
      };

      var subs = observable.subscribe(next, _error, complete);
      this.rxSubs.push(subs);

      return subs;
    }
  },
  beforeCreate: function beforeCreate() {
    /**
     * @type {Subscription[]}
     * @protected
     */
    this.rxSubs = [];
  },
  destroyed: function destroyed() {
    this.unsubscribeAll();
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(1011);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;
module.exports = exports['default'];

/***/ }),

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(1012);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;
module.exports = exports['default'];

/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(1013);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;
module.exports = exports['default'];

/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(1014);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;
module.exports = exports['default'];

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(1015);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;
module.exports = exports['default'];

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interaction = exports.style = exports.source = exports.layer = exports.geom = exports.Geoloc = exports.Feature = exports.View = exports.Map = undefined;

var _map = __webpack_require__(401);

var _map2 = _interopRequireDefault(_map);

var _view = __webpack_require__(416);

var _view2 = _interopRequireDefault(_view);

var _feature = __webpack_require__(386);

var _feature2 = _interopRequireDefault(_feature);

var _geoloc = __webpack_require__(387);

var _geoloc2 = _interopRequireDefault(_geoloc);

var _geom2 = __webpack_require__(388);

var _geom = _interopRequireWildcard(_geom2);

var _layer2 = __webpack_require__(398);

var _layer = _interopRequireWildcard(_layer2);

var _source2 = __webpack_require__(402);

var _source = _interopRequireWildcard(_source2);

var _style2 = __webpack_require__(413);

var _style = _interopRequireWildcard(_style2);

var _interaction2 = __webpack_require__(396);

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

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.InteractionSelect = undefined;

var _interaction = __webpack_require__(227);

var _interaction2 = _interopRequireDefault(_interaction);

var _select = __webpack_require__(397);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.InteractionSelect = _select2.default;
var mixins = exports.mixins = {
  interaction: _interaction2.default
};

/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interaction = __webpack_require__(1016);

var _interaction2 = _interopRequireDefault(_interaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_interaction2.default.install = function (Vue) {
  Vue.component(_interaction2.default.name, _interaction2.default);
};

exports.default = _interaction2.default;
module.exports = exports['default'];

/***/ }),

/***/ 398:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.LayerTile = exports.LayerVector = undefined;

var _layer = __webpack_require__(161);

var _layer2 = _interopRequireDefault(_layer);

var _tileBase = __webpack_require__(228);

var _tileBase2 = _interopRequireDefault(_tileBase);

var _vectorBase = __webpack_require__(229);

var _vectorBase2 = _interopRequireDefault(_vectorBase);

var _vector = __webpack_require__(400);

var _vector2 = _interopRequireDefault(_vector);

var _tile = __webpack_require__(399);

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

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layer = __webpack_require__(1017);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_layer2.default.install = function (Vue) {
  Vue.component(_layer2.default.name, _layer2.default);
};

exports.default = _layer2.default;
module.exports = exports['default'];

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(88);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders stub VNode for component.
 */
exports.default = {
  render: function render(h) {
    var options = this.$options.stubVNode || {};
    // render as HTML comment
    if (options.empty) {
      var vnode = h();
      if (typeof options.empty === 'string') {
        vnode.text = options.empty;
      } else if (typeof options.empty === 'function') {
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

    var attrs = typeof options.attrs === 'function' ? options.attrs.call(this) : options.attrs;

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

  return (0, _keys2.default)(slots).reduce(function (all, name) {
    if (!slotNames.length || slotNames.includes(name)) {
      all = all.concat(slots[name]);
    }

    return all;
  }, []);
}
module.exports = exports['default'];

/***/ }),

/***/ 400:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layer = __webpack_require__(1018);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_layer2.default.install = function (Vue) {
  Vue.component(_layer2.default.name, _layer2.default);
};

exports.default = _layer2.default;
module.exports = exports['default'];

/***/ }),

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(1019);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_map2.default.install = function (Vue) {
  Vue.component(_map2.default.name, _map2.default);
}; /**
    * VueLayers map component
    */
exports.default = _map2.default;
module.exports = exports['default'];

/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.SourceWms = exports.SourceMapbox = exports.SourceOsm = exports.SourceXyz = exports.SourceVector = undefined;

var _source = __webpack_require__(162);

var _source2 = _interopRequireDefault(_source);

var _vectorBase = __webpack_require__(230);

var _vectorBase2 = _interopRequireDefault(_vectorBase);

var _tileBase = __webpack_require__(163);

var _tileBase2 = _interopRequireDefault(_tileBase);

var _xyzBase = __webpack_require__(116);

var _xyzBase2 = _interopRequireDefault(_xyzBase);

var _wmsBase = __webpack_require__(231);

var _wmsBase2 = _interopRequireDefault(_wmsBase);

var _vector = __webpack_require__(405);

var _vector2 = _interopRequireDefault(_vector);

var _xyz = __webpack_require__(407);

var _xyz2 = _interopRequireDefault(_xyz);

var _osm = __webpack_require__(404);

var _osm2 = _interopRequireDefault(_osm);

var _mapbox = __webpack_require__(403);

var _mapbox2 = _interopRequireDefault(_mapbox);

var _wms = __webpack_require__(406);

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

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(1020);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;
module.exports = exports['default'];

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(1021);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;
module.exports = exports['default'];

/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(1022);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;
module.exports = exports['default'];

/***/ }),

/***/ 406:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(1023);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;
module.exports = exports['default'];

/***/ }),

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(1024);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;
module.exports = exports['default'];

/***/ }),

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _circle = __webpack_require__(1025);

var _circle2 = _interopRequireDefault(_circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_circle2.default.install = function (Vue) {
  Vue.component(_circle2.default.name, _circle2.default);
};

exports.default = _circle2.default;
module.exports = exports['default'];

/***/ }),

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _container = __webpack_require__(1026);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_container2.default.install = function (Vue) {
  Vue.component(_container2.default.name, _container2.default);
};

exports.default = _container2.default;
module.exports = exports['default'];

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fill = __webpack_require__(1027);

var _fill2 = _interopRequireDefault(_fill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fill2.default.install = function (Vue) {
  Vue.component(_fill2.default.name, _fill2.default);
};

exports.default = _fill2.default;
module.exports = exports['default'];

/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _func = __webpack_require__(1028);

var _func2 = _interopRequireDefault(_func);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_func2.default.install = function (Vue) {
  Vue.component(_func2.default.name, _func2.default);
};
exports.default = _func2.default;
module.exports = exports['default'];

/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = __webpack_require__(1029);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_icon2.default.install = function (Vue) {
  Vue.component(_icon2.default.name, _icon2.default);
};

exports.default = _icon2.default;
module.exports = exports['default'];

/***/ }),

/***/ 413:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.StyleFunc = exports.StyleRegShape = exports.StyleIcon = exports.StyleCircle = exports.StyleStroke = exports.StyleFill = exports.StyleContainer = undefined;

var _style = __webpack_require__(61);

var _style2 = _interopRequireDefault(_style);

var _image = __webpack_require__(117);

var _image2 = _interopRequireDefault(_image);

var _target = __webpack_require__(86);

var _target2 = _interopRequireDefault(_target);

var _container = __webpack_require__(409);

var _container2 = _interopRequireDefault(_container);

var _fill = __webpack_require__(410);

var _fill2 = _interopRequireDefault(_fill);

var _stroke = __webpack_require__(415);

var _stroke2 = _interopRequireDefault(_stroke);

var _circle = __webpack_require__(408);

var _circle2 = _interopRequireDefault(_circle);

var _icon = __webpack_require__(412);

var _icon2 = _interopRequireDefault(_icon);

var _regShape = __webpack_require__(414);

var _regShape2 = _interopRequireDefault(_regShape);

var _func = __webpack_require__(411);

var _func2 = _interopRequireDefault(_func);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.StyleContainer = _container2.default;
exports.StyleFill = _fill2.default;
exports.StyleStroke = _stroke2.default;
exports.StyleCircle = _circle2.default;
exports.StyleIcon = _icon2.default;
exports.StyleRegShape = _regShape2.default;
exports.StyleFunc = _func2.default;
var mixins = exports.mixins = {
  style: _style2.default,
  styleImage: _image2.default,
  styleTarget: _target2.default
};

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regShape = __webpack_require__(1030);

var _regShape2 = _interopRequireDefault(_regShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_regShape2.default.install = function (Vue) {
  Vue.component(_regShape2.default.name, _regShape2.default);
};

exports.default = _regShape2.default;
module.exports = exports['default'];

/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stroke = __webpack_require__(1031);

var _stroke2 = _interopRequireDefault(_stroke);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_stroke2.default.install = function (Vue) {
  Vue.component(_stroke2.default.name, _stroke2.default);
};

exports.default = _stroke2.default;
module.exports = exports['default'];

/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(1032);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_view2.default.install = function (Vue) {
  Vue.component(_view2.default.name, _view2.default);
};

exports.default = _view2.default;
module.exports = exports['default'];

/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = coalesce;
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
module.exports = exports["default"];

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumeric;
/**
 * @param {*} value
 * @return {boolean} True if value is number or numeric string.
 */
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
module.exports = exports["default"];

/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(88);

var _keys2 = _interopRequireDefault(_keys);

exports.default = replaceTokens;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
module.exports = exports['default'];

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(236);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(32);

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = __webpack_require__(234);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _set2 = __webpack_require__(841);

var _set3 = _interopRequireDefault(_set2);

var _get2 = __webpack_require__(831);

var _get3 = _interopRequireDefault(_get2);

var _forEach2 = __webpack_require__(309);

var _forEach3 = _interopRequireDefault(_forEach2);

var _kebabCase2 = __webpack_require__(835);

var _kebabCase3 = _interopRequireDefault(_kebabCase2);

__webpack_require__(1062);

var _highlight = __webpack_require__(536);

var _highlight2 = _interopRequireDefault(_highlight);

var _scss = __webpack_require__(254);

var _scss2 = _interopRequireDefault(_scss);

var _xml = __webpack_require__(255);

var _xml2 = _interopRequireDefault(_xml);

var _javascript = __webpack_require__(252);

var _javascript2 = _interopRequireDefault(_javascript);

var _bash = __webpack_require__(251);

var _bash2 = _interopRequireDefault(_bash);

var _json = __webpack_require__(253);

var _json2 = _interopRequireDefault(_json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_highlight2.default.registerLanguage('scss', _scss2.default); //
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
    return __webpack_require__(1005);
  },
  demoSrcHTML: function demoSrcHTML() {
    return __webpack_require__(1004);
  }
};

var methods = {
  geometryTypeToCompName: function geometryTypeToCompName(type) {
    return 'vl-geom-' + (0, _kebabCase3.default)(type);
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
  selectStyleFunc: function selectStyleFunc(s) {
    var styleName = 'select';
    var styleByFeature = {};
    var self = this;
    var stroke = s.stroke({
      strokeColor: '#8856a7',
      strokeWidth: 4
    });

    return function __selectStyleFunc(_ref5, resolution) {
      var id = _ref5.id,
          properties = _ref5.properties;

      if (properties.selectColor) {
        var styles = (0, _get3.default)([id, styleName], styleByFeature);
        if (!styles) {
          styles = [s.style({
            stroke: stroke,
            fillColor: properties.selectColor
          })];

          (0, _set3.default)([id, styleName], styles, styleByFeature);
        }

        return styles;
      }
    };
  },
  countriesStyleFunc: function countriesStyleFunc(s) {
    var stroke = s.stroke({
      strokeColor: '#8856a7',
      strokeWidth: 1
    });
    var styleName = 'default';
    var styleByFeature = {};
    var self = this;

    return function __countriesStyleFunc(_ref6) {
      var id = _ref6.id,
          properties = _ref6.properties;

      var styles = (0, _get3.default)([id, styleName], styleByFeature);
      if (!styles) {
        styles = [s.style({
          stroke: stroke,
          fillColor: properties.color
        })];

        (0, _set3.default)([id, styleName], styles, styleByFeature);
      }

      return styles;
    };
  },
  pacmanStyleFunc: function pacmanStyleFunc(s) {
    var pacman = [s.style({
      strokeColor: '#DE9147',
      strokeWidth: 3,
      fillColor: [222, 189, 36, 0.8]
    })];
    var path = [s.style({
      strokeColor: 'blue',
      strokeWidth: 1
    }), s.style({
      imageRadius: 5,
      imageFillColor: 'orange',
      geom: function geom(_ref7) {
        var geometry = _ref7.geometry;

        // geometry is an LineString, convert it to MultiPoint to style vertex
        // use turf.js for complex work with geometries
        return (0, _extends3.default)({}, geometry, {
          type: 'MultiPoint'
        });
      }
    })];
    var eye = [s.style({
      imageRadius: 6,
      imageFillColor: '#444444'
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
    return layer && layer.id && ['position-layer', 'pacman'].indexOf(layer.id) === -1;
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
        (0, _forEach3.default)(_highlight2.default.highlightBlock.bind(_highlight2.default), _this2.$refs.sourceCode.querySelectorAll('pre > code'));
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
      pacman: __webpack_require__(706).features,
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
module.exports = exports['default'];

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(32);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperties = __webpack_require__(65);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _assign = __webpack_require__(87);

var _assign2 = _interopRequireDefault(_assign);

var _create = __webpack_require__(64);

var _create2 = _interopRequireDefault(_create);

var _v = __webpack_require__(382);

var _v2 = _interopRequireDefault(_v);

var _Observable = __webpack_require__(11);

__webpack_require__(159);

__webpack_require__(63);

var _rxSubs = __webpack_require__(39);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _stubVnode = __webpack_require__(40);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

var _target = __webpack_require__(86);

var _target2 = _interopRequireDefault(_target);

var _plainProps = __webpack_require__(119);

var _plainProps2 = _interopRequireDefault(_plainProps);

var _geojson = __webpack_require__(49);

var geoJson = _interopRequireWildcard(_geojson);

var _consts = __webpack_require__(15);

var _coordinate = __webpack_require__(62);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
/**
 * Wrapper around ol.Feature.
 */


var methods = {
  refresh: function refresh() {
    this.feature.changed();
  },
  styleTarget: function styleTarget() {
    return this.feature;
  },
  mountFeature: function mountFeature() {
    if (!this.source) {
      throw new Error("Invalid usage of feature component, should have source component among it's ancestors");
    }

    this.source.addFeature(this.feature);
    this.feature.set(_consts.LAYER_PROP, this.layer.get('id'));
    this.subscribeAll();
  },
  unmountFeature: function unmountFeature() {
    this.unsubscribeAll();
    if (this.source && this.source.getFeatureById(this.id)) {
      this.source.removeFeature(this.feature);
      this.feature.unset(_consts.LAYER_PROP);
    }
  },
  subscribeAll: function subscribeAll() {
    subscribeToMapEvents.call(this);
  },
  isAtPixel: function isAtPixel(pixel) {
    var _this = this;

    return this.map.forEachFeatureAtPixel(pixel, function (feature) {
      return feature === _this.feature;
    }, {
      layerFilter: function layerFilter(layer) {
        return layer === _this.layer;
      }
    });
  }
};

var watch = {
  id: function id(value) {
    this.feature.setId(value);
  },
  properties: function properties(value) {
    this.feature.setProperties((0, _plainProps2.default)(value));
  }
};

var styleTargetProvide = _target2.default.provide;
exports.default = {
  name: 'vl-feature',
  mixins: [_rxSubs2.default, _stubVnode2.default, _target2.default],
  inject: ['map', 'view', 'layer', 'source'],
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

    return (0, _assign2.default)((0, _defineProperties2.default)((0, _create2.default)(null), {
      feature: {
        enumerable: true,
        get: function get() {
          return _this2.feature;
        }
      }
    }), styleTargetProvide.call(this));
  },
  created: function created() {
    createFeature.call(this);
  },
  mounted: function mounted() {
    this.$nextTick(this.mountFeature);
  },
  destroyed: function destroyed() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3.unmountFeature();
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
  this.feature = geoJson.readFeature({
    id: this.id,
    properties: this.properties
  }, this.view.getProjection());
  this.feature.set('vm', this);

  return this.feature;
}

function subscribeToMapEvents() {
  var _this4 = this;

  var pointerEvents = _Observable.Observable.fromOlEvent(this.map, ['click', 'dblclick', 'singleclick'], function (_ref) {
    var type = _ref.type,
        pixel = _ref.pixel,
        coordinate = _ref.coordinate;
    return { type: type, pixel: pixel, coordinate: coordinate };
  }).map(function (evt) {
    return (0, _extends3.default)({}, evt, {
      coordinate: (0, _coordinate.toLonLat)(evt.coordinate, _this4.view.getProjection())
    });
  });

  this.subscribeTo(pointerEvents, function (evt) {
    if (_this4.isAtPixel(evt.pixel)) {
      _this4.$emit(evt.type, evt);
    }
  });
}
module.exports = exports['default'];

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(167);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _isEqual2 = __webpack_require__(310);

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _geolocation = __webpack_require__(883);

var _geolocation2 = _interopRequireDefault(_geolocation);

var _Observable = __webpack_require__(11);

__webpack_require__(371);

__webpack_require__(372);

__webpack_require__(375);

__webpack_require__(373);

__webpack_require__(980);

__webpack_require__(374);

__webpack_require__(979);

__webpack_require__(63);

var _consts = __webpack_require__(15);

var _rxSubs = __webpack_require__(39);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _stubVnode = __webpack_require__(40);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  tracking: {
    type: Boolean,
    default: true
  }
};

var methods = {
  refresh: function refresh() {
    this.geoloc.changed();
  },
  subscribeAll: function subscribeAll() {
    subscribeToGeolocation.call(this);
  },
  mountGeoloc: function mountGeoloc() {
    this.subscribeAll();
  },
  unmountGeoloc: function unmountGeoloc() {
    this.unsubscribeAll();
    this.geoloc.setTracking(false);
  }
};

var watch = {
  tracking: function tracking(value) {
    this.geoloc.setTracking(value);
  }
};

exports.default = {
  name: 'vl-geoloc',
  mixins: [_rxSubs2.default, _stubVnode2.default],
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
  },
  mounted: function mounted() {
    this.$nextTick(this.mountGeoloc);
  },
  destroyed: function destroyed() {
    var _this = this;

    this.$nextTick(function () {
      _this.unmountGeoloc();
      _this.geoloc = undefined;
    });
  }
};

/**
 * @return {Geolocation}
 */

function createGeolocApi() {
  /**
   * @type {Geolocation}
   * @protected
   */
  this.geoloc = new _geolocation2.default({
    tracking: this.tracking,
    projection: _consts.DATA_PROJECTION
  });
  this.geoloc.set('vm', this);

  return this.geoloc;
}

function subscribeToGeolocation() {
  var _this2 = this;

  var positionChanges = _Observable.Observable.of(this.geoloc.getPosition()).merge(_Observable.Observable.fromOlEvent(this.geoloc, 'change:position', function () {
    return _this2.geoloc.getPosition();
  })).filter(function (x) {
    return x != null;
  });

  var accuracyChanges = _Observable.Observable.of(this.geoloc.getAccuracy()).merge(_Observable.Observable.fromOlEvent(this.geoloc, 'change:accuracy', function () {
    return _this2.geoloc.getAccuracy();
  })).filter(function (x) {
    return x != null;
  });

  var geolocChanges = _Observable.Observable.combineLatest(positionChanges, accuracyChanges).throttleTime(300).distinctUntilChanged(function (a, b) {
    return (0, _isEqual3.default)(a, b);
  });

  this.subscribeTo(geolocChanges, function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        position = _ref2[0],
        accuracy = _ref2[1];

    var changed = false;
    if (!(0, _isEqual3.default)(position, _this2.currentPosition)) {
      _this2.currentPosition = position;
      changed = true;
    }
    if (accuracy !== _this2.currentAccuracy) {
      _this2.currentAccuracy = accuracy;
      changed = true;
    }

    changed && _this2.$emit('change', { position: position, accuracy: accuracy });
  });
}
module.exports = exports['default'];

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _linestring = __webpack_require__(207);

var _linestring2 = _interopRequireDefault(_linestring);

var _consts = __webpack_require__(15);

var _geom = __webpack_require__(48);

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

var computed = {
  type: function type() {
    return _consts.GEOMETRY_TYPE.LINE_STRING;
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _linestring2.default(this.fromLonLat(this.currentCoordinates));
  }
};

exports.default = {
  name: 'vl-geom-line-string',
  mixins: [_geom2.default],
  props: props,
  computed: computed,
  methods: methods
};
module.exports = exports['default'];

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multilinestring = __webpack_require__(329);

var _multilinestring2 = _interopRequireDefault(_multilinestring);

var _consts = __webpack_require__(15);

var _geom = __webpack_require__(48);

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

var computed = {
  type: function type() {
    return _consts.GEOMETRY_TYPE.MULTI_LINE_STRING;
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _multilinestring2.default(this.fromLonLat(this.currentCoordinates));
  }
};

exports.default = {
  name: 'vl-geom-multi-line-string',
  mixins: [_geom2.default],
  props: props,
  computed: computed,
  methods: methods
};
module.exports = exports['default'];

/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multipoint = __webpack_require__(208);

var _multipoint2 = _interopRequireDefault(_multipoint);

var _consts = __webpack_require__(15);

var _geom = __webpack_require__(48);

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

var computed = {
  type: function type() {
    return _consts.GEOMETRY_TYPE.MULTI_POINT;
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _multipoint2.default(this.fromLonLat(this.currentCoordinates));
  }
};

exports.default = {
  name: 'vl-geom-multi-point',
  mixins: [_geom2.default],
  props: props,
  computed: computed,
  methods: methods
};
module.exports = exports['default'];

/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multipolygon = __webpack_require__(330);

var _multipolygon2 = _interopRequireDefault(_multipolygon);

var _consts = __webpack_require__(15);

var _geom = __webpack_require__(48);

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

var computed = {
  type: function type() {
    return _consts.GEOMETRY_TYPE.MULTI_POLYGON;
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _multipolygon2.default(this.fromLonLat(this.currentCoordinates));
  }
};

exports.default = {
  name: 'vl-geom-multi-polygon',
  mixins: [_geom2.default],
  props: props,
  computed: computed,
  methods: methods
};
module.exports = exports['default'];

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _point = __webpack_require__(148);

var _point2 = _interopRequireDefault(_point);

var _consts = __webpack_require__(15);

var _geom = __webpack_require__(48);

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

var computed = {
  type: function type() {
    return _consts.GEOMETRY_TYPE.POINT;
  }
};

var methods = {
  /**
   * @return {Point}
   * @protected
   */
  createGeometry: function createGeometry() {
    return new _point2.default(this.fromLonLat(this.currentCoordinates));
  }
};

exports.default = {
  name: 'vl-geom-point',
  mixins: [_geom2.default],
  props: props,
  computed: computed,
  methods: methods
};
module.exports = exports['default'];

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _polygon = __webpack_require__(77);

var _polygon2 = _interopRequireDefault(_polygon);

var _consts = __webpack_require__(15);

var _geom = __webpack_require__(48);

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

var computed = {
  type: function type() {
    return _consts.GEOMETRY_TYPE.POLYGON;
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _polygon2.default(this.fromLonLat(this.currentCoordinates));
  }
};

exports.default = {
  name: 'vl-geom-polygon',
  mixins: [_geom2.default],
  props: props,
  computed: computed,
  methods: methods
};
module.exports = exports['default'];

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(87);

var _assign2 = _interopRequireDefault(_assign);

var _differenceWith2 = __webpack_require__(307);

var _differenceWith3 = _interopRequireDefault(_differenceWith2);

var _mapValues2 = __webpack_require__(838);

var _mapValues3 = _interopRequireDefault(_mapValues2);

var _forEach2 = __webpack_require__(309);

var _forEach3 = _interopRequireDefault(_forEach2);

var _select = __webpack_require__(904);

var _select2 = _interopRequireDefault(_select);

var _vector = __webpack_require__(209);

var _vector2 = _interopRequireDefault(_vector);

var _Observable = __webpack_require__(11);

__webpack_require__(63);

var _plainProps = __webpack_require__(119);

var _plainProps2 = _interopRequireDefault(_plainProps);

var _style = __webpack_require__(164);

var _geojson = __webpack_require__(49);

var geoJson = _interopRequireWildcard(_geojson);

var _interaction = __webpack_require__(227);

var _interaction2 = _interopRequireDefault(_interaction);

var _target = __webpack_require__(86);

var _target2 = _interopRequireDefault(_target);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
    default: function _default() {
      return true;
    }
  }
};

var computed = {
  selectedIds: function selectedIds() {
    return this.currentSelected.map(function (x) {
      return x.id;
    });
  }
};

var _interaction$methods = _interaction2.default.methods,
    interactionRefresh = _interaction$methods.refresh,
    interactionMountInteraction = _interaction$methods.mountInteraction,
    interactionUnmountInteraction = _interaction$methods.unmountInteraction;

var defaultStyles = (0, _mapValues3.default)(_style.style, (0, _style.defaultEditStyle)());

var methods = {
  /**
   * @protected
   */
  subscribeAll: function subscribeAll() {
    subscribeToInteractionChanges.call(this);
  },

  /**
   * @return {SelectInteraction}
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
    var view = this.view;
    var filterFunc = this.filter;
    var filter = function __selectFilter(feature, layer) {
      return filterFunc(geoJson.writeFeature(feature, view.getProjection()), layer && (0, _plainProps2.default)(layer.getProperties()));
    };

    return new _select2.default({
      multi: this.multi,
      wrapX: this.wrapX,
      filter: filter,
      style: style
    });
  },
  refresh: function refresh() {
    this.interaction.getFeatures().changed();
    interactionRefresh.call(this);
  },

  /**
   * @param {Object} geoJsonFeature
   * @param {string|number} geoJsonFeature.id
   */
  select: function select(_ref) {
    var id = _ref.id;

    if (!this.map || this.selectedIds.includes(id)) return;

    var selection = this.interaction.getFeatures();
    var feature = void 0;

    if (id) {
      var layers = this.map.getLayers().getArray();

      (0, _forEach3.default)(function (layer) {
        if (layer instanceof _vector2.default) {
          feature = layer.getSource().getFeatureById(id);
        }
        return !feature;
      }, layers);
    }

    feature && selection.push(feature);
  },

  /**
   * @param {Object} geoJsonFeature
   * @param {string|number} geoJsonFeature.id
   */
  unselect: function unselect(_ref2) {
    var id = _ref2.id;

    if (!this.map || !this.selectedIds.includes(id)) return;

    var selection = this.interaction.getFeatures();
    var selectionArray = selection.getArray();
    var idx = selectionArray.findIndex(function (x) {
      return x.id === id;
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
    this.interaction && this.refresh();
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

var diffById = (0, _differenceWith3.default)(function (a, b) {
  return a.id === b.id;
});
var watch = {
  selected: function selected(_selected) {
    var forSelect = diffById(_selected, this.currentSelected);
    var forUnselect = diffById(this.currentSelected, _selected);

    forSelect.forEach(this.select);
    forUnselect.forEach(this.unselect);
  }
};

var interactionProvide = _interaction2.default.provide;
var styleTargetProvide = _target2.default.provide;
exports.default = {
  name: 'vl-interaction-select',
  mixins: [_interaction2.default, _target2.default],
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

  this.subscribeTo(_Observable.Observable.fromOlEvent(selection, 'add', function (_ref3) {
    var element = _ref3.element;
    return geoJson.writeFeature(element, _this.view.getProjection());
  }), function (feature) {
    _this.currentSelected.push(feature);
    _this.$emit('select', feature);
  });
  this.subscribeTo(_Observable.Observable.fromOlEvent(selection, 'remove', function (_ref4) {
    var element = _ref4.element;
    return geoJson.writeFeature(element, _this.view.getProjection());
  }), function (feature) {
    _this.currentSelected = _this.currentSelected.filter(function (_ref5) {
      var id = _ref5.id;
      return id !== feature.id;
    });
    _this.$emit('unselect', feature);
  });
}
module.exports = exports['default'];

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tileBase = __webpack_require__(228);

var _tileBase2 = _interopRequireDefault(_tileBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

exports.default = {
  name: 'vl-layer-tile',
  mixins: [_tileBase2.default],
  props: props
};
module.exports = exports['default'];

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vectorBase = __webpack_require__(229);

var _vectorBase2 = _interopRequireDefault(_vectorBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

exports.default = {
  name: 'vl-layer-vector',
  mixins: [_vectorBase2.default],
  props: props
};
module.exports = exports['default'];

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(32);

var _extends3 = _interopRequireDefault(_extends2);

var _create = __webpack_require__(64);

var _create2 = _interopRequireDefault(_create);

var _defineProperties = __webpack_require__(65);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _constant2 = __webpack_require__(829);

var _constant3 = _interopRequireDefault(_constant2);

var _map = __webpack_require__(909);

var _map2 = _interopRequireDefault(_map);

var _Observable = __webpack_require__(11);

__webpack_require__(159);

__webpack_require__(63);

var _plainProps = __webpack_require__(119);

var _plainProps2 = _interopRequireDefault(_plainProps);

var _coordinate = __webpack_require__(62);

var _geojson = __webpack_require__(49);

var geoJson = _interopRequireWildcard(_geojson);

var _rxSubs = __webpack_require__(39);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//

var noop = function noop() {};

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
    this.map.updateSize();
    this.map.render();
  },

  /**
   * Trigger focus on map container.
   */
  focus: function focus() {
    this.$refs.map.focus();
  },

  /**
   * @protected
   */
  subscribeAll: function subscribeAll() {
    subscribeToMapEvents.call(this);
  },
  forEachFeatureAtPixel: function forEachFeatureAtPixel(pixel, callback) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var cb = function cb(feature, layer) {
      return callback(geoJson.writeFeature(feature), layer && (0, _plainProps2.default)(layer.getProperties()));
    };
    var layerFilter = opts.layerFilter || (0, _constant3.default)(true);
    opts.layerFilter = function (layer) {
      return layerFilter((0, _plainProps2.default)(layer.getProperties()));
    };

    return this.map.forEachFeatureAtPixel(pixel, cb, opts);
  },
  forEachLayerAtPixel: function forEachLayerAtPixel(pixel, callback) {
    var layerFilter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

    var cb = function cb(layer, rgba) {
      return callback((0, _plainProps2.default)(layer.getProperties()), rgba);
    };
    var lf = function lf(layer) {
      return layerFilter((0, _plainProps2.default)(layer.getProperties()));
    };

    return this.map.forEachLayerAtPixel(pixel, cb, undefined, lf);
  },
  getCoordinateFromPixel: function getCoordinateFromPixel(pixel) {
    return (0, _coordinate.toLonLat)(this.map.getCoordinateFromPixel(pixel), this.map.getView().getProjection());
  },
  mountMap: function mountMap() {
    this.map.setTarget(this.$refs.map);
    this.refresh();
    this.subscribeAll();
  },
  unmountMap: function unmountMap() {
    this.unsubscribeAll();
    this.map.setTarget(undefined);
  }
};

exports.default = {
  name: 'vl-map',
  mixins: [_rxSubs2.default],
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
    this.$nextTick(this.mountMap);
  },
  destroyed: function destroyed() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.unmountMap();
      _this2.map = undefined;
    });
  }
};

/**
 * @return {Map}
 */

function createMap() {
  /**
   * @type {Map}
   * @protected
   */
  this.map = new _map2.default({
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
  this.map.set('vm', this);

  return this.map;
}

function subscribeToMapEvents() {
  var _this3 = this;

  var pointerEvents = _Observable.Observable.fromOlEvent(this.map, ['click', 'dblclick', 'singleclick'], function (_ref) {
    var type = _ref.type,
        pixel = _ref.pixel,
        coordinate = _ref.coordinate;
    return { type: type, pixel: pixel, coordinate: coordinate };
  }).map(function (evt) {
    return (0, _extends3.default)({}, evt, {
      coordinate: (0, _coordinate.toLonLat)(evt.coordinate, _this3.map.getView().getProjection())
    });
  });

  this.subscribeTo(pointerEvents, function (evt) {
    return _this3.$emit(evt.type, evt);
  });
}
module.exports = exports['default'];

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _coalesce = __webpack_require__(417);

var _coalesce2 = _interopRequireDefault(_coalesce);

var _consts = __webpack_require__(15);

var _xyzBase = __webpack_require__(116);

var _xyzBase2 = _interopRequireDefault(_xyzBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAPBOX_URL_TEMPLATE = 'https://{a-c}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}{tileNameSuffix}.{tileFormat}?access_token={accessToken}';
var MAPBOX_ATTRIBUTIONS = '&copy; <a href="https://www.mapbox.com/">MapBox</a>, ' + new Date().getFullYear();

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
  currentProjection: function currentProjection() {
    return _consts.MAP_PROJECTION;
  },
  currentTileSize: function currentTileSize() {
    return [_consts.TILE_SIZE, _consts.TILE_SIZE];
  },
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
  ratio = (0, _coalesce2.default)(ratio, 1);

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
module.exports = exports['default'];

/***/ }),

/***/ 437:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _osm = __webpack_require__(950);

var _osm2 = _interopRequireDefault(_osm);

var _xyzBase = __webpack_require__(116);

var _xyzBase2 = _interopRequireDefault(_xyzBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  attributions: {
    type: String,
    default: _osm2.default.ATTRIBUTION.getHTML()
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
    return new _osm2.default({
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
module.exports = exports['default'];

/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vectorBase = __webpack_require__(230);

var _vectorBase2 = _interopRequireDefault(_vectorBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

exports.default = {
  name: 'vl-source-vector',
  mixins: [_vectorBase2.default],
  props: props
};
module.exports = exports['default'];

/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wmsBase = __webpack_require__(231);

var _wmsBase2 = _interopRequireDefault(_wmsBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

exports.default = {
  name: 'vl-source-wms',
  mixins: [_wmsBase2.default],
  props: props
};
module.exports = exports['default'];

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xyzBase = __webpack_require__(116);

var _xyzBase2 = _interopRequireDefault(_xyzBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

exports.default = {
  name: 'vl-source-xyz',
  mixins: [_xyzBase2.default],
  props: props
};
module.exports = exports['default'];

/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _circle = __webpack_require__(216);

var _circle2 = _interopRequireDefault(_circle);

var _image = __webpack_require__(117);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  radius: {
    type: Number,
    default: 5
  }
};

var methods = {
  /**
   * @return {Circle}
   * @protected
   */
  createStyle: function createStyle() {
    return new _circle2.default({
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
   * @type {Fill}
   * @private
   */
  this.fill = fill;
  this.refresh();
}

function setStroke(stroke) {
  /**
   * @type {Stroke}
   * @private
   */
  this.stroke = stroke;
  this.refresh();
}
module.exports = exports['default'];

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = __webpack_require__(115);

var _style2 = _interopRequireDefault(_style);

var _debug = __webpack_require__(118);

var _style3 = __webpack_require__(61);

var _style4 = _interopRequireDefault(_style3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  zIndex: Number,
  condition: {
    type: [Function, Boolean],
    default: true
  }
};
/**
 * Style wrapper.
 * Acts as an style container that will be injected into "style" slot inside layer or feature components.
 */


var methods = {
  /**
   * @return {Style}
   * @protected
   */
  createStyle: function createStyle() {
    return new _style2.default({
      zIndex: this.zIndex,
      fill: this.fill,
      stroke: this.stroke,
      image: this.image
    });
  },
  mountStyle: function mountStyle() {
    var currentStyle = this.getStyle() || [];
    if (currentStyle && !Array.isArray(currentStyle)) {
      if (typeof currentStyle === 'function' && "production" !== 'production') {
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
      if (typeof currentStyle === 'function' && "production" !== 'production') {
        (0, _debug.warn)('Style target already has defined style that is not an array. ' + 'Avoid combining vl-style-func and vl-style-container components on the same level ' + 'because it can lead to the wrong result');
      }
      currentStyle = [];
    }

    currentStyle = currentStyle.filter(function (x) {
      return x.style !== _this.style;
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
  mixins: [_style4.default],
  inject: _style4.default.inject.concat(['setStyle', 'getStyle']),
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
   * @type {Fill}
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
   * @type {Stroke}
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
   * @type {Image}
   * @protected
   */
  this.image = image;

  if (this.style) {
    this.style.setImage(this.image);
    this.refresh();
  }
}
module.exports = exports['default'];

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fill = __webpack_require__(155);

var _fill2 = _interopRequireDefault(_fill);

var _style = __webpack_require__(61);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  color: [String, Array]
};

var methods = {
  /**
   * @return {Fill}
   * @protected
   */
  createStyle: function createStyle() {
    return new _fill2.default({
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
module.exports = exports['default'];

/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(166);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(32);

var _extends4 = _interopRequireDefault(_extends3);

var _typeof2 = __webpack_require__(235);

var _typeof3 = _interopRequireDefault(_typeof2);

var _geojson = __webpack_require__(49);

var geoJson = _interopRequireWildcard(_geojson);

var _style = __webpack_require__(164);

var styleHelper = _interopRequireWildcard(_style);

var _debug = __webpack_require__(118);

var _style2 = __webpack_require__(61);

var _style3 = _interopRequireDefault(_style2);

var _target = __webpack_require__(86);

var _target2 = _interopRequireDefault(_target);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
    var providedStyleFunc = this.factory(styleHelper);
    var type = typeof providedStyleFunc === 'undefined' ? 'undefined' : (0, _typeof3.default)(providedStyleFunc);
    if (type !== 'function') {
      if (false) {
        (0, _debug.warn)('Style function factory returned value is of type ' + type + ', expected type is Function');
      }
      providedStyleFunc = function providedStyleFunc() {};
    }

    var view = this.view;

    return function __styleFunc(feature, resolution, styleHelper) {
      var styles = providedStyleFunc(geoJson.writeFeature(feature, view.getProjection()), resolution, styleHelper);

      if (styles === null || Array.isArray(styles) && styles.length) return styles;

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
  mixins: [_style3.default, _target2.default],
  inject: (0, _extends4.default)({}, _style3.default.inject.reduce(function (all, value) {
    return (0, _extends4.default)({}, all, (0, _defineProperty3.default)({}, value, value));
  }, {}), {
    stSetStyle: 'setStyle',
    stGetStyle: 'getStyle'
  }),
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
module.exports = exports['default'];

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = __webpack_require__(362);

var _icon2 = _interopRequireDefault(_icon);

var _image = __webpack_require__(117);

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
  color: [Array, String],
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
   * @return {Icon}
   * @protected
   */
  createStyle: function createStyle() {
    return new _icon2.default({
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
module.exports = exports['default'];

/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regularshape = __webpack_require__(218);

var _regularshape2 = _interopRequireDefault(_regularshape);

var _image = __webpack_require__(117);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  points: {
    type: Number,
    required: true
  },
  radius: Number,
  radius1: Number,
  radius2: Number,
  angle: {
    type: Number,
    default: 0
  },
  rotation: {
    type: Number,
    default: 0
  },
  rotateWithView: {
    type: Boolean,
    default: false
  }
};

var methods = {
  /**
   * @return {RegularShape}
   * @protected
   */
  createStyle: function createStyle() {
    return new _regularshape2.default({
      points: this.points,
      radius: this.radius,
      radius1: this.radius1,
      radius2: this.radius2,
      angle: this.angle,
      rotation: this.rotation,
      rotateWithView: this.rotateWithView,
      snapToPixel: this.snapToPixel,
      fill: this.fill,
      stroke: this.stroke
    });
  }
};

exports.default = {
  name: 'vl-style-reg-shape',
  mixins: [_image2.default],
  props: props,
  methods: methods,
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
   * @type {Fill}
   * @private
   */
  this.fill = fill;
  this.refresh();
}

function setStroke(stroke) {
  /**
   * @type {Stroke}
   * @private
   */
  this.stroke = stroke;
  this.refresh();
}
module.exports = exports['default'];

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stroke = __webpack_require__(156);

var _stroke2 = _interopRequireDefault(_stroke);

var _style = __webpack_require__(61);

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
   * @return {Stroke}
   * @protected
   */
  createStyle: function createStyle() {
    return new _stroke2.default({
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
  inject: _style2.default.inject.concat(['setStroke']),
  props: props,
  watch: watch,
  methods: methods
};
module.exports = exports['default'];

/***/ }),

/***/ 448:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(167);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = __webpack_require__(165);

var _promise2 = _interopRequireDefault(_promise);

var _isEqual2 = __webpack_require__(310);

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _vue = __webpack_require__(226);

var _vue2 = _interopRequireDefault(_vue);

var _view2 = __webpack_require__(366);

var _view3 = _interopRequireDefault(_view2);

var _Observable = __webpack_require__(11);

__webpack_require__(371);

__webpack_require__(372);

__webpack_require__(374);

__webpack_require__(375);

__webpack_require__(373);

__webpack_require__(159);

__webpack_require__(63);

var _consts = __webpack_require__(15);

var _coordinate = __webpack_require__(62);

var _debug = __webpack_require__(118);

var _rxSubs = __webpack_require__(39);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _stubVnode = __webpack_require__(40);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  zoom: {
    type: Number,
    default: _consts.MIN_ZOOM
  },
  center: {
    type: Array,
    default: function _default() {
      return [0, 0];
    },
    validator: function validator(value) {
      return Array.isArray(value) && value.length === 2;
    }
  },
  rotation: {
    type: Number,
    default: 0
  },
  maxZoom: {
    type: Number,
    default: _consts.MAX_ZOOM
  },
  minZoom: {
    type: Number,
    default: _consts.MIN_ZOOM
  },
  projection: {
    type: String,
    default: _consts.MAP_PROJECTION
  },
  enableRotation: {
    type: Boolean,
    default: true
  },
  extent: {
    type: Array,
    validator: function validator(value) {
      return Array.isArray(value) && value.length === 4;
    }
  },
  maxResolution: Number,
  minResolution: Number,
  resolution: Array,
  zoomFactor: {
    type: Number,
    default: _consts.ZOOM_FACTOR
  }
};

var methods = {
  /**
   * @see {@link https://openlayers.org/en/latest/apidoc/ol.View.html#fit}
   */
  fit: function fit(geometryOrExtent, options) {
    this.view.fit(geometryOrExtent, options);
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

    var cb = args.reverse().find(function (x) {
      return typeof x === 'function';
    });

    return new _promise2.default(function (resolve) {
      var _view;

      return (_view = _this.view).animate.apply(_view, args.concat([function (complete) {
        cb && cb(complete);
        resolve(complete);
      }]));
    });
  },
  refresh: function refresh() {
    this.view.changed();
  },
  setCurrentView: function setCurrentView(_ref) {
    var center = _ref.center,
        zoom = _ref.zoom,
        rotation = _ref.rotation;

    if (center != null && !(0, _isEqual3.default)(center, this.currentCenter)) {
      this.view.setCenter((0, _coordinate.fromLonLat)(center, this.projection));
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
      throw new Error("Invalid usage of view component, should have map component among it's ancestors");
    }

    var view = this.map.getView();

    if (view && view.get('vm') instanceof _vue2.default) {
      if (false) {
        (0, _debug.warn)('Map already has mounted vl-view component. ' + 'It will be replaced with new.');
      }
      view.get('vm').unmountView();
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
  mixins: [_rxSubs2.default, _stubVnode2.default],
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
 * @return {View}
 */

function createView() {
  /**
   * @type {View}
   * @protected
   */
  this.view = new _view3.default({
    center: (0, _coordinate.fromLonLat)(this.currentCenter, this.projection),
    zoom: this.currentZoom,
    maxZoom: this.maxZoom,
    minZoom: this.minZoom,
    projection: this.projection
  });
  this.view.set('vm', this);

  return this.view;
}

/**
 * Subscribe to OpenLayers significant events
 */
function subscribeToViewChanges() {
  var _this3 = this;

  var centerChanges = _Observable.Observable.of(this.view.getCenter()).merge(_Observable.Observable.fromOlEvent(this.view, 'change:center', function () {
    return _this3.view.getCenter();
  }));
  var resolutionChanges = _Observable.Observable.of(this.view.getZoom()).merge(_Observable.Observable.fromOlEvent(this.view, 'change:resolution', function () {
    return _this3.view.getZoom();
  }));
  var rotationChanges = _Observable.Observable.of(this.view.getRotation()).merge(_Observable.Observable.fromOlEvent(this.view, 'change:rotation', function () {
    return _this3.view.getRotation();
  }));

  var viewChanges = _Observable.Observable.combineLatest(centerChanges, resolutionChanges, rotationChanges).throttleTime(300).distinctUntilChanged(function (a, b) {
    return (0, _isEqual3.default)(a, b);
  }).map(function (_ref2) {
    var _ref3 = (0, _slicedToArray3.default)(_ref2, 3),
        center = _ref3[0],
        zoom = _ref3[1],
        rotation = _ref3[2];

    return {
      center: (0, _coordinate.toLonLat)(center, _this3.projection),
      zoom: Math.ceil(_this3.view.getZoom()),
      rotation: rotation
    };
  });

  this.subscribeTo(viewChanges, function (_ref4) {
    var center = _ref4.center,
        zoom = _ref4.zoom,
        rotation = _ref4.rotation;

    var changed = false;
    if (!(0, _isEqual3.default)(_this3.currentCenter, center)) {
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
  });
}
module.exports = exports['default'];

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(64);

var _create2 = _interopRequireDefault(_create);

var _defineProperties = __webpack_require__(65);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _rxSubs = __webpack_require__(39);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _stubVnode = __webpack_require__(40);

var _stubVnode2 = _interopRequireDefault(_stubVnode);

var _coordinate = __webpack_require__(62);

var _extent = __webpack_require__(232);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { isEqual } from 'lodash/fp'
// import { Observable } from 'rxjs/Observable'
// import 'rxjs/add/observable/combineLatest'
// import 'rxjs/add/operator/throttleTime'
// import 'rxjs/add/operator/distinctUntilChanged'
// import 'rxjs/add/operator/map'
// import 'vl-rx/from-ol-event'
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
};

var computed = {
  type: function type() {
    throw new Error('Not implemented computed property');
  }
};

var methods = {
  /**
   * @protected
   */
  initialize: function initialize() {
    var _this = this;

    // define helper methods based on geometry type
    var _transforms$type = _coordinate.transforms[this.type],
        toLonLat = _transforms$type.toLonLat,
        fromLonLat = _transforms$type.fromLonLat;
    /**
     * @param {Array} coordinates
     * @returns {Array}
     * @protected
     */

    this.toLonLat = function (coordinates) {
      return toLonLat(coordinates, _this.view.getProjection());
    };
    /**
     * @param {Array} coordinates
     * @param {Array}
     * @protected
     */
    this.fromLonLat = function (coordinates) {
      return fromLonLat(coordinates, _this.view.getProjection());
    };
    /**
     * @param {Array} extent
     * @returns {Array}
     * @protected
     */
    this.extentToLonLat = function (extent) {
      return (0, _extent.toLonLat)(extent, _this.view.getProjection());
    };
    /**
     * @type {SimpleGeometry}
     * @protected
     */
    this.geometry = this.createGeometry();
    this.geometry.set('vm', this);
    this.currentExtent = this.extentToLonLat(this.geometry.getExtent());
  },

  /**
   * @return {SimpleGeometry}
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
    if (!this.feature) {
      throw new Error("Invalid usage of geometry component, should have feature component among it's ancestors");
    }

    this.feature.setGeometry(this.geometry);
    this.subscribeAll();
  },

  /**
   * @protected
   */
  unmountGeometry: function unmountGeometry() {
    this.unsubscribeAll();
    this.feature && this.feature.setGeometry(undefined);
  },
  refresh: function refresh() {
    this.geometry.changed();
  }
};
// todo use turf.js to optimize geometry compare
var watch = {
  coordinates: function coordinates(value) {
    // this.geometry.setCoordinates(this.fromLonLat(value, this.view.getProjection()))
  }
};

exports.default = {
  mixins: [_rxSubs2.default, _stubVnode2.default],
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
    var _this2 = this;

    return (0, _defineProperties2.default)((0, _create2.default)(null), {
      geometry: {
        enumerable: true,
        get: function get() {
          return _this2.geometry;
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
    var _this3 = this;

    this.$nextTick(function () {
      _this3.unmountGeometry();
      _this3.geometry = undefined;
    });
  }
};

// function subscribeToGeomChanges () {
//   this.subscribeTo(
//     Observable.fromOlEvent(this.geometry, 'change')
//     .throttleTime(1000)
//     .map(() => {
//       return [
//         this.toLonLat(this.geometry.getCoordinates(), this.view.getProjection()),
//         extentHelper.toLonLat(this.geometry.getExtent(), this.view.getProjection())
//       ]
//     })
//     .distinctUntilChanged((a, b) => isEqual(a, b)),
//       ([ coordinates, extent ]) => {
//         this.currentCoordinates = coordinates
//         this.currentExtent = extent
//         this.$emit('change', { coordinates, extent })
//       }
//     )
// }

module.exports = exports['default'];

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(32);

var _extends3 = _interopRequireDefault(_extends2);

exports.writeFeature = writeFeature;
exports.readFeature = readFeature;
exports.writeGeometry = writeGeometry;
exports.readGeometry = readGeometry;

var _geojson = __webpack_require__(881);

var _geojson2 = _interopRequireDefault(_geojson);

var _plainProps = __webpack_require__(119);

var _plainProps2 = _interopRequireDefault(_plainProps);

var _consts = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var geoJson = new _geojson2.default({
  defaultDataProjection: _consts.DATA_PROJECTION
});

/**
 * @param {ol.Feature} feature
 * @param {ol.ProjectionLike|undefined} [featureProjection=EPSG:3857]
 * @return {GeoJSONFeature}
 */
function writeFeature(feature) {
  var featureProjection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return geoJson.writeFeatureObject(feature, { featureProjection: featureProjection });
}

/**
 * @param {GeoJSONFeature} geoJsonFeature
 * @param {ol.ProjectionLike|undefined} [featureProjection=EPSG:3857]
 * @return {ol.Feature}
 */
function readFeature(geoJsonFeature) {
  var featureProjection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return geoJson.readFeature((0, _extends3.default)({}, geoJsonFeature, {
    type: 'Feature',
    properties: (0, _plainProps2.default)(geoJsonFeature.properties)
  }), { featureProjection: featureProjection });
}

/**
 * @param {ol.geom.Geometry} geometry
 * @param {ol.ProjectionLike|undefined} [geometryProjection=EPSG:3857]
 * @return {GeoJSONGeometry|GeoJSONGeometryCollection}
 */
function writeGeometry(geometry) {
  var geometryProjection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return geoJson.writeGeometryObject(geometry, {
    featureProjection: geometryProjection
  });
}

/**
 * @param {GeoJSONGeometry} geoJsonGeometry
 * @param {ol.ProjectionLike|undefined} [geometryProjection=EPSG:3857]
 * @return {ol.geom.Geometry}
 */
function readGeometry(geoJsonGeometry) {
  var geometryProjection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return geoJson.readGeometryFromObject(geoJsonGeometry, {
    featureProjection: geometryProjection
  });
}

/***/ }),

/***/ 507:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\nDate: 24 Fev 2015\nAuthor: Pedro Oliveira <kanytu@gmail . com>\n*/\n\n.hljs {\n  color: #a9b7c6;\n  background: #282b2e;\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n}\n\n.hljs-number,\n.hljs-literal,\n.hljs-symbol,\n.hljs-bullet {\n  color: #6897BB;\n}\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-deletion {\n  color: #cc7832;\n}\n\n.hljs-variable,\n.hljs-template-variable,\n.hljs-link {\n  color: #629755;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #808080;\n}\n\n.hljs-meta {\n  color: #bbb529;\n}\n\n.hljs-string,\n.hljs-attribute,\n.hljs-addition {\n  color: #6A8759;\n}\n\n.hljs-section,\n.hljs-title,\n.hljs-type {\n  color: #ffc66d;\n}\n\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class {\n  color: #e8bf6a;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, ".ol-box {\n  box-sizing: border-box;\n  border-radius: 2px;\n  border: 2px solid blue;\n}\n\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.ol-scale-line {\n  background: rgba(0,60,136,0.3);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n.ol-scale-line-inner {\n  border: 1px solid #eee;\n  border-top: none;\n  color: #eee;\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n}\n.ol-overlay-container {\n  will-change: left,right,top,bottom;\n}\n\n.ol-unsupported {\n  display: none;\n}\n.ol-viewport .ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: rgba(0,0,0,0);\n}\n\n.ol-control {\n  position: absolute;\n  background-color: rgba(255,255,255,0.4);\n  border-radius: 4px;\n  padding: 2px;\n}\n.ol-control:hover {\n  background-color: rgba(255,255,255,0.6);\n}\n.ol-zoom {\n  top: .5em;\n  left: .5em;\n}\n.ol-rotate {\n  top: .5em;\n  right: .5em;\n  transition: opacity .25s linear, visibility 0s linear;\n}\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .25s linear, visibility 0s linear .25s;\n}\n.ol-zoom-extent {\n  top: 4.643em;\n  left: .5em;\n}\n.ol-full-screen {\n  right: .5em;\n  top: .5em;\n}\n@media print {\n  .ol-control {\n    display: none;\n  }\n}\n\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: white;\n  font-size: 1.14em;\n  font-weight: bold;\n  text-decoration: none;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: .4em;\n  background-color: rgba(0,60,136,0.5);\n  border: none;\n  border-radius: 2px;\n}\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n.ol-compass {\n  display: block;\n  font-weight: normal;\n  font-size: 1.2em;\n  will-change: transform;\n}\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n.ol-control button:hover,\n.ol-control button:focus {\n  text-decoration: none;\n  background-color: rgba(0,60,136,0.7);\n}\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n\n.ol-attribution {\n  text-align: right;\n  bottom: .5em;\n  right: .5em;\n  max-width: calc(100% - 1.3em);\n}\n\n.ol-attribution ul {\n  margin: 0;\n  padding: 0 .5em;\n  font-size: .7rem;\n  line-height: 1.375em;\n  color: #000;\n  text-shadow: 0 0 2px #fff;\n}\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n  line-height: inherit;\n}\n.ol-attribution li:not(:last-child):after {\n  content: \" \";\n}\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n.ol-attribution ul, .ol-attribution button {\n  display: inline-block;\n}\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n.ol-attribution.ol-logo-only ul {\n  display: block;\n}\n.ol-attribution:not(.ol-collapsed) {\n  background: rgba(255,255,255,0.8);\n}\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n  height: 1.1em;\n  line-height: 1em;\n}\n.ol-attribution.ol-logo-only {\n  background: transparent;\n  bottom: .4em;\n  height: 1.1em;\n  line-height: 1em;\n}\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -.2em;\n  max-height: 1.6em;\n}\n.ol-attribution.ol-logo-only button,\n.ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-zoomslider {\n  top: 4.5em;\n  left: .5em;\n  height: 200px;\n}\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n.ol-overviewmap .ol-overviewmap-map,\n.ol-overviewmap button {\n  display: inline-block;\n}\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid #7b98bc;\n  height: 150px;\n  margin: 2px;\n  width: 150px;\n}\n.ol-overviewmap:not(.ol-collapsed) button{\n  bottom: 1px;\n  left: 2px;\n  position: absolute;\n}\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n.ol-overviewmap:not(.ol-collapsed) {\n  background: rgba(255,255,255,0.8);\n}\n.ol-overviewmap-box {\n  border: 2px dotted rgba(0,60,136,0.7);\n}\n", ""]);

// exports


/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 510:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 511:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 513:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n/* stub style */", ""]);

// exports


/***/ }),

/***/ 514:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 515:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 517:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 518:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 519:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 520:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 522:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n/* stub style */", ""]);

// exports


/***/ }),

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 524:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style */", ""]);

// exports


/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports
exports.i(__webpack_require__(508), "");

// module
exports.push([module.i, "/**\n * VueLayers SCSS mixins.\n * This part of the VueLayers package.\n */\n.vl-map, .vl-map .map {\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports
exports.i(__webpack_require__(507), "");

// module
exports.push([module.i, "\nhtml, body, #app {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-family: Helvetica, Arial, sans-serif;\n  overflow: hidden;\n}\nhtml *, body *, #app * {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n.controls {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n      -ms-transform: translateX(-50%);\n          transform: translateX(-50%);\n  width: 70vw;\n  background: rgba(255, 255, 255, 0.7);\n  -webkit-box-shadow: 0 0 20px rgba(2, 2, 2, 0.1);\n          box-shadow: 0 0 20px rgba(2, 2, 2, 0.1);\n  padding: 5px;\n  text-align: center;\n}\n.controls > button {\n    margin: 5px;\n    padding: 5px 10px;\n    text-transform: uppercase;\n}\n#source-code {\n  overflow: auto;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  padding: 20px;\n  background: #ffffff;\n}\n#source-code .controls {\n    position: relative;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.slide-enter, .slide-leave-to {\n  -webkit-transform: translateY(100%);\n      -ms-transform: translateY(100%);\n          transform: translateY(100%);\n}\n.slide-enter-active, .slide-leave-active {\n  -webkit-transition: all .3s ease-out;\n  transition: all .3s ease-out;\n}\n", ""]);

// exports


/***/ }),

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 529:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style */", ""]);

// exports


/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stubVnode = __webpack_require__(40);

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
     * @type {Style|Image|Fill|Stroke|Text}
     * @protected
     */
    this.style = this.createStyle();
  },

  /**
   * @return {Style|Image|Fill|Stroke|Text}
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
  mixins: [_stubVnode2.default],
  inject: ['view'],
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
module.exports = exports['default'];

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transforms = exports.toLonLat = exports.fromLonLat = undefined;

var _defineProperty2 = __webpack_require__(166);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _transforms; /**
                  * Coordinate extensions
                  */


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

var _proj = __webpack_require__(16);

var _proj2 = _interopRequireDefault(_proj);

var _consts = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fromLonLat = _proj2.default.fromLonLat,
    toLonLat = _proj2.default.toLonLat;
exports.fromLonLat = fromLonLat;
exports.toLonLat = toLonLat;
function pointToLonLat(coordinate) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return toLonLat(coordinate, projection);
}
function pointFromLonLat(coordinate) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return fromLonLat(coordinate, projection);
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

var transforms = exports.transforms = (_transforms = {}, (0, _defineProperty3.default)(_transforms, _consts.GEOMETRY_TYPE.POINT, {
  toLonLat: pointToLonLat,
  fromLonLat: pointFromLonLat
}), (0, _defineProperty3.default)(_transforms, _consts.GEOMETRY_TYPE.LINE_STRING, {
  toLonLat: lineToLonLat,
  fromLonLat: lineFromLonLat
}), (0, _defineProperty3.default)(_transforms, _consts.GEOMETRY_TYPE.POLYGON, {
  toLonLat: polygonToLonLat,
  fromLonLat: polygonFromLonLat
}), (0, _defineProperty3.default)(_transforms, _consts.GEOMETRY_TYPE.MULTI_POINT, {
  toLonLat: multiPointToLonLat,
  fromLonLat: multiPointFromLonLat
}), (0, _defineProperty3.default)(_transforms, _consts.GEOMETRY_TYPE.MULTI_LINE_STRING, {
  toLonLat: multiLineToLonLat,
  fromLonLat: multiLineFromLonLat
}), (0, _defineProperty3.default)(_transforms, _consts.GEOMETRY_TYPE.MULTI_POLYGON, {
  toLonLat: multiPolygonToLonLat,
  fromLonLat: multiPolygonFromLonLat
}), _transforms);

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(235);

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = __webpack_require__(455);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = fromOlEvent;

var _Observable = __webpack_require__(11);

__webpack_require__(977);

__webpack_require__(978);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates an Observable using OpenLayers event pattern that emits events of a specific type
 * coming from the given event target.
 *
 * @example **Subscribe on view center change events**
 * const map = ol.Map({ ... })
 * const changes = Observable.fromOlEvent(map.getView(), 'change:center')
 *
 * changes.subscribe(coordinate => console.log(coordinate))
 *
 * @param {ol.Object} target OpenLayers event target.
 * @param {string|Object[]} eventName The event name of interest, being emitted by the `target`
 *                          or an array of events/selectors like `[{ event: 'event1', selector?: x => x }, ...]`.
 * @param {function(...*): *} [selector] An optional function to post-process results. It takes the arguments
 *    from the event handler and should return a single value.
 * @return {Observable}
 * @memberOf {Observable}
 */
function fromOlEvent(target, eventName, selector) {
  if (Array.isArray(eventName)) {
    return _Observable.Observable.merge.apply(_Observable.Observable, (0, _toConsumableArray3.default)(eventName.map(function (elem) {
      var eventName = void 0,
          selector = void 0;

      if ((typeof elem === 'undefined' ? 'undefined' : (0, _typeof3.default)(elem)) === 'object') {
        eventName = elem.event;
        selector = elem.selector;
      } else {
        eventName = elem;
      }

      return fromOlEvent(target, eventName, selector);
    })));
  }

  return _Observable.Observable.fromEventPattern(function (handler) {
    return target.on(eventName, handler);
  }, function (handler) {
    return target.un(eventName, handler);
  }, selector);
}

_Observable.Observable.fromOlEvent = fromOlEvent;
module.exports = exports['default'];

/***/ }),

/***/ 706:
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

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map2 = __webpack_require__(837);

var _map3 = _interopRequireDefault(_map2);

var _flow2 = __webpack_require__(308);

var _flow3 = _interopRequireDefault(_flow2);

var _filter2 = __webpack_require__(830);

var _filter3 = _interopRequireDefault(_filter2);

exports.createStyleFunc = createStyleFunc;

var _geojson = __webpack_require__(49);

var geoJson = _interopRequireWildcard(_geojson);

var _style = __webpack_require__(164);

var styleHelper = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  provide: function provide() {
    return {
      setStyle: this.setStyle.bind(this),
      getStyle: this.getStyle.bind(this)
    };
  },
  beforeCreate: function beforeCreate() {
    /**
     * @type {Style[]|StyleFunction|undefined}
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
    if (!feature.getGeometry()) return;

    var styles = vm.styles;
    var geoJsonFeature = geoJson.writeFeature(feature, vm.view.getProjection());

    if (typeof styles === 'function') {
      styles = styles(feature, resolution, styleHelper);
    } else if (Array.isArray(styles)) {
      styles = (0, _flow3.default)((0, _filter3.default)(function (_ref) {
        var style = _ref.style,
            condition = _ref.condition;

        return condition == null || condition === true || typeof condition === 'function' && condition(geoJsonFeature, resolution);
      }), (0, _map3.default)('style'))(styles);
    }
    // null style
    if (styles === null || Array.isArray(styles) && styles.length) return styles;

    if (vm.defaultStyles) {
      return typeof vm.defaultStyles === 'function' ? vm.defaultStyles(feature, resolution, styleHelper) : vm.defaultStyles;
    }
  };
}

/***/ })

},[385]);
//# sourceMappingURL=app.075abaf52130fe6c7b22.js.map