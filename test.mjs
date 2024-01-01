import test from "flug";

import reprojectBoundingBox from "./reproject-bbox.js";

test("geographic to web mercator", ({ eq }) => {
  const bbox = reprojectBoundingBox({
    bbox: [-122.51, 40.97, -122.34, 41.11],

    // set debug to true to turn on console logging
    debug: false,

    // spatial reference system of input bounding box
    from: 4326,

    // convert bounding box to this spatial reference system
    to: 3857,
  });
  eq(bbox, [-13637750.817083945, 5007917.677222896, -13618826.503649088, 5028580.202823918]);
});

test("utm conversion", ({ eq }) => {
  const bbox = reprojectBoundingBox({
    bbox: [-122.51, 40.97, -122.34, 41.11],

    // set debug to true to turn on console logging
    debug: false,

    // spatial reference system of input bounding box
    from: 4326,

    // convert bounding box to this spatial reference system
    to: 32617,
  });
  eq(bbox, [-3010997.366626169, 5447962.517672182, -2987728.4090058263, 5471756.682451112]);
});

test("reproject box with northern bend", ({ eq }) => {
  const bbox = [-2316545, -1971615, 1015455, 1512385];
  const srs = 6623;

  const xmin = -104.15783650020958;
  const ymin = 22.33428366410961;
  const xmax = -51.769705847928805;

  eq(reprojectBoundingBox({ bbox, from: srs, split: false, to: 4326 }), [xmin, ymin, xmax, 56.48158793780131]);
  eq(reprojectBoundingBox({ bbox, density: 0, from: srs, split: false, to: 4326 }), [xmin, ymin, xmax, 56.48158793780131]);
  eq(reprojectBoundingBox({ bbox, density: 1, from: srs, split: false, to: 4326 }), [xmin, ymin, xmax, 57.099578714450445]);
  eq(reprojectBoundingBox({ bbox, density: 10, from: srs, split: false, to: 4326 }), [xmin, ymin, xmax, 57.52407399197629]);
  eq(reprojectBoundingBox({ bbox, density: 100, from: srs, split: false, to: 4326 }), [xmin, ymin, xmax, 57.53583071204875]);
  eq(reprojectBoundingBox({ bbox, density: 1000, from: srs, split: false, to: 4326 }), [xmin, ymin, xmax, 57.53588499736936]);

  eq(reprojectBoundingBox({ bbox, from: srs, split: true, to: 4326 }), [xmin, ymin, xmax, 57.53588504321043]);
});
