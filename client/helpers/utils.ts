import { Coords } from "@/context/SpotsContext";

export const haversine = (
	pointA: Coords,
	pointB: Coords,
	imperial: boolean
) => {
	const RADIUS_MI = 3958.761316;
	const RADIUS_KM = 6371.0087714;
	const MI_TO_FEET = 5280;
	const KM_TO_METERS = 1000;

	// distance between latitudes
	// and longitudes
	let dLat = ((pointB[1] - pointA[1]) * Math.PI) / 180.0;
	let dLon = ((pointB[0] - pointA[0]) * Math.PI) / 180.0;

	// convert to radians
	let lat1 = (pointA[1] * Math.PI) / 180.0;
	let lat2 = (pointB[1] * Math.PI) / 180.0;

	// apply formulae
	let a =
		Math.pow(Math.sin(dLat / 2), 2) +
		Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
	let rad;

	// radius of earth
	if (imperial) {
		rad = RADIUS_MI;
	} else {
		rad = RADIUS_KM;
	}

	// calculate
	let c = 2 * Math.asin(Math.sqrt(a));
	let dist = rad * c;
	if (imperial) {
		if (dist < 0.095) {
			dist = dist * MI_TO_FEET;
			return `${dist.toFixed(3)}ft`;
		}
		return `${dist.toFixed(3)}mi`;
	} else {
		if (dist < 0.1) {
			dist = dist * KM_TO_METERS;
			return `${dist.toFixed(3)}m`;
		}
		return `${dist.toFixed(3)}km`;
	}
};
