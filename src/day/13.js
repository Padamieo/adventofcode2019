import text from '../resources/13.txt';
import common from '../common';
const c = new common();

export default function init() {
	const pixels = processData(text);
	c.log(pixels);
	calculateScreen(pixels);
}

function calculateScreen(pixels) {
	// var screen = [];
	// var minX = (Math.min(...pixels.map(x => x[0])));
	// var maxX = (Math.max(...pixels.map(x => x[0])));

	// var minY = (Math.min(...pixels.map(x => x[1])));
	// var maxY = (Math.max(...pixels.map(x => x[1])));

	var a = (pixels.filter(x => x[2] === 2).length);
	console.log(a);

	// for(var x = 0; x < maxX; x++) {
	// 	screen.push(new Array(maxY).fill(''));
	// }
	// console.log(screen);
}

function processData(input) {
	var b = input.split(',').map( Number );
	return chunk(b, 3);
}

const chunk = function(array, size) {
	if (!array.length) {
		return [];
	}
	const head = array.slice(0, size);
	const tail = array.slice(size);
  
	return [head, ...chunk(tail, size)];
};