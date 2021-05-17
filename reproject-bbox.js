const proj4 = require("proj4-fully-loaded");

module.exports = ({ bbox, from, to }) => {
  if (typeof from === "number") from = "EPSG:" + from;
  if (typeof to === "number") to = "EPSG:" + to;

  const fwd = proj4(from, to).forward;
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
