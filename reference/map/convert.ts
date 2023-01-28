
// Outdated conversion using lookup tables

// convert y/x coordinats from DCS to lat lon
// Port from lua to JS
// Accuracy not that great, as resolution of lookup tables is 50km


// convert mission editor coordinates to lat long
// First argument is .miz Y coordinate, second argument is .miz X coordinate


// look up table
import Caucasus from './caucasus/lookup';
import Syria from './syria/lookup';
import MarianaIslands from './marianas/lookup';
import PersianGulf from './gulf/lookup';
import Nevada from './nevada/lookup';

const lookUpTables = {
	Caucasus,
	Syria,
	MarianaIslands,
	PersianGulf,
	Nevada
}
console.log(lookUpTables);


let lut = lookUpTables.caucasus;

export function activeMap(mapName: string) {
	console.log(mapName);
	
	try {
		lut = lookUpTables[mapName];
	} catch (error) {
		console.log('Lookuptable not found', mapName);
	}
}

// In mission files y is west-east and x is south-north
export function mizToLL(y: number, x: number): { lat: number, lon: number } {
	let yIndex = 0
	let xIndex = 0

	for (let i = 0; i < lut.length; i++) {
		let xCoord = lut[i][0][0][1];
		if (xCoord > x) {
			xIndex = i - 1;
			break;
		}
	}

	for (let i = 0; i < lut[0].length; i++) {
		let yCoord = lut[0][i][0][0];
		if (yCoord > y) {
			yIndex = i - 1;
			break;
		}
	}

	// Bilinear interpolation
	const ll = lut[xIndex][yIndex];
	const lr = lut[xIndex][yIndex + 1];
	const ul = lut[xIndex + 1][yIndex];
	const ur = lut[xIndex + 1][yIndex + 1];

	// console.log('ll', ll, xIndex, yIndex);

	const yFactor = (y - ll[0][0]) / (lr[0][0] - ll[0][0]);
	const xFactor = (x - ll[0][1]) / (ul[0][1] - ll[0][1]);

	const lInterp = [
		lr[1][0] * yFactor + ll[1][0] * (1 - yFactor),
		lr[1][1] * yFactor + ll[1][1] * (1 - yFactor)
	];
	const uInterp = [
		ur[1][0] * yFactor + ul[1][0] * (1 - yFactor),
		ur[1][1] * yFactor + ul[1][1] * (1 - yFactor)
	];

	const interp = [
		uInterp[0] * xFactor + lInterp[0] * (1 - xFactor),
		uInterp[1] * xFactor + lInterp[1] * (1 - xFactor)
	];

	return {
		lat: interp[0],
		lon: interp[1]
	}
}

// First argument in .miz Y coordinate, second argument is .miz X coordinate
// const lat, lon = mizToLL(arg[1] + 0, arg[2] + 0)

// console.log("Latitude: ", lat, "    Longitude: ", lon)