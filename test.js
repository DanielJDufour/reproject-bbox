const test = require("flug");

const reprojectBoundingBox = require("./reproject-bbox");

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
  eq(bbox, [
    -13637750.817083945,
    5007917.677222896,
    -13618826.503649088,
    5028580.202823918,
  ]);
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
  eq(bbox, [
    -3010997.366626169,
    5447962.517672182,
    -2987728.4090058263,
    5471756.682451112,
  ]);
});
