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

test("throw error on 32767", ({ eq }) => {
  let msg;
  try {
    reprojectBoundingBox({
      bbox: [-13637750.817083945, 5007917.677222896, -13618826.503649088, 5028580.202823918],
      from: 32767,
      to: 4326,
    });
  } catch (error) {
    msg = error.message;
  }
  eq(msg.startsWith(`[reproject-bbox] You passed in a value of 32767 for from`), true);
});

test("4326 to web mercator", ({ eq }) => {
  const reprojected = reprojectBoundingBox({
    bbox: [-180, -90, 180, 90],
    density: 100,
    from: "EPSG:4326",
    nan_strategy: "skip",
    split: false,
    to: "EPSG:3857",
  });
  eq(reprojected, [-20037508.342789244, -26555100.29330386, 20037508.342789244, 26555100.293303788]);
});

test("4326 to web mercator (again)", ({ eq }) => {
  const reprojected = reprojectBoundingBox({
    bbox: [-180, -89.99928, 179.99856, 90],
    debug_level: 0,
    density: 100,
    from: "EPSG:4326",
    nan_strategy: "skip",
    split: false,
    to: "EPSG:3857",
  });
  eq(reprojected, [-20037508.342789244, -76394987.3448674, 20037348.0427225, 26555125.810017247]);
});
