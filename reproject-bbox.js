const merge = require("proj4-merge");
const proj4 = require("proj4-fully-loaded");
const reproject = require("bbox-fns/reproject.js");

if (typeof merge !== "function") {
  console.warn("[reproject-bbox] failed to import proj4-merge");
}

const CUSTOM_PROJECTION_ERROR =
  "[reproject-bbox] You passed in a value of 32767 for {{%s}}, which means a custom non-standard projection.  Please pass in a Well-Known Text or PROJ4JS String instead.";

function reprojectBoundingBox({ bbox, density, from, proj4: _proj4, to }) {
  if (from === 32767) throw new Error(CUSTOM_PROJECTION_ERROR.replace("{{%s}}", "from"));
  if (to === 32767) throw new Error(CUSTOM_PROJECTION_ERROR.replace("{{%s}}", "to"));

  if (typeof from === "number") from = "EPSG:" + from;
  if (typeof to === "number") to = "EPSG:" + to;

  const instances = [_proj4, proj4];
  if (typeof window === "object" && window.proj4) instances.push(window.proj4);
  if (typeof self === "object" && self.proj4) instances.push(self.proj4);

  const proj = merge(instances);

  const fwd = proj(from, to).forward;

  return reproject(bbox, fwd, { density });
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
