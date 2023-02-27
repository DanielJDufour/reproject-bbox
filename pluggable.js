const bboxArray = require("bbox-fns/bbox-array.js");
const densePolygon = require("bbox-fns/dense-polygon.js");

function reprojectBoundingBoxPluggable({ bbox, density, reproject }) {
  const polygon = densePolygon(bbox, { density });
  const ring = polygon[0];
  return bboxArray(ring.map((pt) => reproject(pt)));
}

if (typeof define === "function" && define.amd)
  define(function () {
    return reprojectBoundingBoxPluggable;
  });
if (typeof module === "object") {
  module.exports = reprojectBoundingBoxPluggable;
  module.exports.default = reprojectBoundingBoxPluggable;
}
if (typeof window === "object") window.reprojectBoundingBoxPluggable = reprojectBoundingBoxPluggable;
if (typeof self === "object") self.reprojectBoundingBoxPluggable = reprojectBoundingBoxPluggable;
