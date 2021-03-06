// Copyright 2014 Reed O'Brien <reed@koansys.com>, Chris Shenton
// <chris@koansys.com>, and Contributors.
// All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

"use strict";

requirejs.config({
  baseUrl: "/lib",

  paths: {
    domReady: "/domReady",
    cesium: "/cesium/Source",
    viewer: "/viewer",
    smd: "/smd",
    tle: "/tle"
  }
});

// Setup a cesium requirejs loader.
// require(["viewer"], function(){});
require(["smd"], function() {});
