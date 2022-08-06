function reprojectBoundingBoxPluggable({ bbox, reproject }) {
  const [xmin, ymin, xmax, ymax] = bbox;

  const topleft = reproject([xmin, ymax]);
  const topright = reproject([xmax, ymax]);
  const bottomleft = reproject([xmin, ymin]);
  const bottomright = reproject([xmax, ymin]);

  const corners = [topleft, topright, bottomleft, bottomright];

  const xs = corners.map((corner) => corner[0]);
  const ys = corners.map((corner) => corner[1]);

  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
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
