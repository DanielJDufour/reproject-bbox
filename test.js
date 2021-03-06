const test = require("flug");
const proj4 = require("proj4-fully-loaded");

const reprojectBoundingBox = require("./reproject-bbox");
const reprojectBoundingBoxPluggable = require("./pluggable");

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

test("geographic to web mercator (pluggable)", ({ eq }) => {
  const bbox = reprojectBoundingBoxPluggable({
    bbox: [-122.51, 40.97, -122.34, 41.11],
    reproject: proj4("EPSG:4326", "EPSG:3857").forward,
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

test("right edge lies on -180", ({ eq }) => {
  const bbox = reprojectBoundingBox({
    bbox: [-185, 10, -180, 20],
    from: 4326,
    to: 3857,
  });
  // console.log("rep bbox", bbox);
  const bbox2 = reprojectBoundingBox({
    bbox: [175, 10, 180, 20],
    from: 4326,
    to: 3857,
  });
  // console.log("rep bbox", bbox2);
});

test("conversion from wkt srs", ({ eq }) => {
  const bbox = reprojectBoundingBox({
    bbox: [-13637750.817083945, 5007917.677222896, -13618826.503649088, 5028580.202823918],
    from: `PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",0.0],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]`,
    to: 4326,
  });
  eq(bbox, [-122.51000000000002, 40.969999999999985, -122.34, 41.109999999999985]);
});
