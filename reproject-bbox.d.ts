export default function reprojectBoundingBox({
  bbox,
  density,
  from,
  proj4: _proj4,
  to
}: {
  bbox: [number, number, number, number] | Readonly<[number, number, number, number]>,
  density?: number | undefined,
  from: number | string,
  proj4?: any,
  to: number | string
}): [number, number, number, number];

