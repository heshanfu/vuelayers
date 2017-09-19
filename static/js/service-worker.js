"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/vuelayers/static/css/app.b872188917245c923314fb42193f0f5e.css","486486fa759840306854166301d41557"],["/vuelayers/static/css/app.b872188917245c923314fb42193f0f5e.css.map","37278f3549d061c38a048d0a7e6f17ca"],["/vuelayers/static/img/android-chrome-144x144.png","d1b1c9573b2b80ce4ae80df6e7255c7b"],["/vuelayers/static/img/android-chrome-192x192.png","12249f5f1842079e29b7b049120abf81"],["/vuelayers/static/img/android-chrome-256x256.png","9bb0d8438dc0d75be8118a4a86154ab4"],["/vuelayers/static/img/android-chrome-36x36.png","b2fce577822efc36fb5b1ab0e3653cd3"],["/vuelayers/static/img/android-chrome-384x384.png","bc28cb1c41fbc1b90ea42183301dc08b"],["/vuelayers/static/img/android-chrome-48x48.png","71745834bd40ec5089969fccf2f6a257"],["/vuelayers/static/img/android-chrome-512x512.png","1e72db37d0b206475256ff826ba8914d"],["/vuelayers/static/img/android-chrome-72x72.png","69d8f7faf96c741cce61c93aec45c62e"],["/vuelayers/static/img/android-chrome-96x96.png","454d820f1364005dc6836bd2ea4fcf90"],["/vuelayers/static/img/apple-touch-icon-114x114.png","8a7ac04e624056a717f2864c2c8fb470"],["/vuelayers/static/img/apple-touch-icon-120x120.png","dc6ce223a315233014f2ede8d5be170f"],["/vuelayers/static/img/apple-touch-icon-144x144.png","c089dfd6c977dcc94e1d39aa7ac2bd3c"],["/vuelayers/static/img/apple-touch-icon-152x152.png","0ce952f08d40bacf855bdb5d7e087008"],["/vuelayers/static/img/apple-touch-icon-167x167.png","c7f1c6d0ceca253031dcbe532ad37498"],["/vuelayers/static/img/apple-touch-icon-180x180.png","cbb3145784563777be4f3624447cb5cb"],["/vuelayers/static/img/apple-touch-icon-57x57.png","b3c10eb482c649f9640798cc9de0b5c8"],["/vuelayers/static/img/apple-touch-icon-60x60.png","b2f27b740036731940637c50be9bf68d"],["/vuelayers/static/img/apple-touch-icon-72x72.png","4b40b5acff8f89c4905820810d41dbec"],["/vuelayers/static/img/apple-touch-icon-76x76.png","2042cfb2e94fde81cd780902929f0fb5"],["/vuelayers/static/img/apple-touch-icon-precomposed.png","cbb3145784563777be4f3624447cb5cb"],["/vuelayers/static/img/apple-touch-icon.png","cbb3145784563777be4f3624447cb5cb"],["/vuelayers/static/img/apple-touch-startup-image-1182x2208.png","40e11864fad9eaa615c71603913faf5d"],["/vuelayers/static/img/apple-touch-startup-image-1242x2148.png","3248ed53e7ede0f7649471dadcf715b4"],["/vuelayers/static/img/apple-touch-startup-image-1496x2048.png","1147168076e065e7ec22c3eb5c30ece3"],["/vuelayers/static/img/apple-touch-startup-image-1536x2008.png","e880583c38fc4b9a7366e38f2af5d3d9"],["/vuelayers/static/img/apple-touch-startup-image-320x460.png","34ea5e935d36b1c55f81a3e442ac3f49"],["/vuelayers/static/img/apple-touch-startup-image-640x1096.png","dd30ff7657af68157a41d8e0becdaff2"],["/vuelayers/static/img/apple-touch-startup-image-640x920.png","a9bf8f05ffda66dc89fca43df8203000"],["/vuelayers/static/img/apple-touch-startup-image-748x1024.png","afed14e14b415be60001bbb299abdb36"],["/vuelayers/static/img/apple-touch-startup-image-750x1294.png","ff5386c3cd86ff3cbfb43ccb55250e16"],["/vuelayers/static/img/apple-touch-startup-image-768x1004.png","c7eb2fe163d9638e0f5c8719c6333f8a"],["/vuelayers/static/img/favicon-16x16.png","e057e09e3ec203ca3a130074300e1c1b"],["/vuelayers/static/img/favicon-32x32.png","e583758181a9c680d69c23d25d61f774"],["/vuelayers/static/img/favicon.ico","25237af51ce3c4789f22cb6ab7bb3d62"],["/vuelayers/static/img/firefox_app_128x128.png","d41da1e81511fa5b995780870c197282"],["/vuelayers/static/img/firefox_app_512x512.png","a6d678801147106f64c2326ec9feddcf"],["/vuelayers/static/img/firefox_app_60x60.png","4d3386f59040d8b684a8845b6f6b5118"],["/vuelayers/static/img/flag.b922504.png","b9225040d2893fdd1e1a50c097ef62e7"],["/vuelayers/static/img/flag.png","b9225040d2893fdd1e1a50c097ef62e7"],["/vuelayers/static/img/logo-black.svg","a93ba831a0c4bb1cc29c60ea817b3eb8"],["/vuelayers/static/img/logo-blue.svg","2b63a3ce7ed8f2a3158cc306f2a2b9c2"],["/vuelayers/static/img/logo-white.svg","cce76806bd2d075643613f33f42bd208"],["/vuelayers/static/img/logo.svg","5518c108739b32bf99f9c147f899a307"],["/vuelayers/static/img/manifest.json","f422387c096d980d5d1facc3cff46078"],["/vuelayers/static/img/manifest.webapp","e00cd59eef073ef6679f63eb57faed30"],["/vuelayers/static/img/marker.png","5a8c57f4b14a34f1c5f5816e70742d7b"],["/vuelayers/static/img/sidebar-bg.png","81bd6cdf3df8d40a7eb2100d60dc1147"],["/vuelayers/static/js/0.326ad97b6c9d95e7225a.js","9a507e13c4bb00c5bfa9b674703fecb3"],["/vuelayers/static/js/0.326ad97b6c9d95e7225a.js.map","aad128474dc16f6be6a31de2d51ee1fd"],["/vuelayers/static/js/1.d01ef3afc620f374458d.js","3729ef6ab855d2e5c3fc2a1644a87b33"],["/vuelayers/static/js/1.d01ef3afc620f374458d.js.map","ede3dccfee71fbd3845944e47d3e0db3"],["/vuelayers/static/js/2.8531e0b6c5ac60235432.js","949ec812cf3e5f936dd5f2f6a1c29967"],["/vuelayers/static/js/2.8531e0b6c5ac60235432.js.map","718ccc612e2fb062f3cb2c6d05d0d390"],["/vuelayers/static/js/3.95b713e6ee250e9ab6b6.js","6df0c3470f4329754d97691f7932a8db"],["/vuelayers/static/js/3.95b713e6ee250e9ab6b6.js.map","a28ceacb160d7dcdb8e76bd4f1c93e88"],["/vuelayers/static/js/4.826011cfcdf63b111b88.js","f2ebb6bc5140d358c85b4ed0e051a9c1"],["/vuelayers/static/js/4.826011cfcdf63b111b88.js.map","9350bd3042218eff650e29fe052ec68e"],["/vuelayers/static/js/app.ea9a9924f434c885ebb2.js","2f85f36493ed91b8d3f3ee3606f01416"],["/vuelayers/static/js/app.ea9a9924f434c885ebb2.js.map","754dae9a7d1ddbf9aee9690a413ee05e"],["/vuelayers/static/js/manifest.7aa65e6a86e2ec315b73.js","dd5580918a643a69deb363b6badfc281"],["/vuelayers/static/js/manifest.7aa65e6a86e2ec315b73.js.map","3d7890297a18c738466ee98a8e7ae194"],["/vuelayers/static/js/vendor.f3f3d2292b60348e9d67.js","54065d41ae8acad75503e524af43a9f3"],["/vuelayers/static/sample-data/pacman.geojson","163816bf998906300a74ed008fee6e75"]],cacheName="sw-precache-v3-vuelayers-docs-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,c,t){var s=new URL(e);return t&&s.pathname.match(t)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,a){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],t=new URL(a,self.location),s=createCacheKey(t,hashParamName,c,!1);return[t.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!a.has(c)){var t=new Request(c,{credentials:"same-origin"});return fetch(t).then(function(a){if(!a.ok)throw new Error("Request for "+c+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(c,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!a.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,"index.html"),a=urlsToCacheKeys.has(c));!a&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(c=new URL("/vuelayers/",self.location).toString(),a=urlsToCacheKeys.has(c)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});