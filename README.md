# VueLayers

> Vue components to work with [OpenLayers 3](https://openlayers.org)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## Install

```
# Install VueJs and OpenLayers if not yet installed
npm install -S vue openlayers
# Library install
npm install -S vuelayers
```

## Build Setup

``` bash
git clone https://gitlab.com/ghettovoice/vuelayers.git
cd vuelayers

# install dependencies
npm install
# Install peer dependencies
npm install vue openlayers 

# serve with hot reload at localhost:8080
npm run dev
npm start

# build UMD packages ( debug and production ready )
npm run build

# build UMD packages ( debug and production ready ) and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### TODO

- [ ] Add webpack configs to build as UMD library (should exclude only openlayers and vue)
- [ ] Try with ES2015 version of the OpenLayers. [https://www.npmjs.com/package/ol/](https://www.npmjs.com/package/ol/)


