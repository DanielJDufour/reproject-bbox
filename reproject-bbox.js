const merge = require("proj4-merge");
const proj4 = require("proj4-fully-loaded");

const reprojectBoundingBoxPluggable = require("./pluggable.js");

if (typeof merge !== "function") {
  console.warn("[reproject-bbox] failed to import proj4-merge");
}

function reprojectBoundingBox({ bbox, from, proj4: _proj4, to }) {
  if (typeof from === "number") from = "EPSG:" + from;
  if (typeof to === "number") to = "EPSG:" + to;

  const instances = [_proj4, proj4];
  if (typeof window === "object" && window.proj4) instances.push(window.proj4);
  if (typeof self === "object" && self.proj4) instances.push(self.proj4);

  const proj = merge(instances);

  const fwd = proj(from, to).forward;

  return reprojectBoundingBoxPluggable({ bbox, reproject: fwd });
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return reprojectBoundingBox;
  });
}

if (typeof module === "object") {
  module.exports = reprojectBoundingBox;
  module.exports.default = reprojectBoundingBox;
}

if (typeof window === "object") {
  window.reprojectBoundingBox = reprojectBoundingBox;
}

if (typeof self === "object") {
  self.reprojectBoundingBox = reprojectBoundingBox;
}
