const merge = require("proj4-merge");
const proj4 = require("proj4-fully-loaded");

module.exports = ({ bbox, from, proj4: _proj4, to }) => {
  if (typeof from === "number") from = "EPSG:" + from;
  if (typeof to === "number") to = "EPSG:" + to;

  const instances = [_proj4, proj4];
  if (typeof window === "object" && window.proj4) instances.push(window.proj4);
  if (typeof self === "object" && self.proj4) instances.push(self.proj4);

  const proj = merge(instances);

  const fwd = proj(from, to).forward;
  const [xmin, ymin, xmax, ymax] = bbox;

  const topleft = fwd([xmin, ymax]);
  const topright = fwd([xmax, ymax]);
  const bottomleft = fwd([xmin, ymin]);
  const bottomright = fwd([xmax, ymin]);

  const corners = [topleft, topright, bottomleft, bottomright];

  const xs = corners.map((corner) => corner[0]);
  const ys = corners.map((corner) => corner[1]);

  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
};
