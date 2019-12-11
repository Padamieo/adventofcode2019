import text from '../resources/1.txt';
import common from '../common';
const c = new common();

export default function init() {
	const rawdata = processData(text);
	var basicFuel = findFuel(rawdata);
	c.log(basicFuel, 'PARt-1');
	var RecursiveFuel = findRecursiveFuel(rawdata);
	c.log(RecursiveFuel, 'PARt-2');
}

function processData(input) {
	return input.split('\n').map( Number );
}

function findFuel(data) {
	var fuel = 0;
	for(var i = 0; i < data.length; i++){
		fuel = fuel + (Math.floor(data[i] / 3) - 2);
	}
	return fuel;
}

// PART-2
function findRecursiveFuel(data) {
	var fuel = 0;
	for(var i = 0; i < data.length; i++){
		var x = data[i];
		var array = [];
		while(x > 0){
			x = (Math.floor(x / 3) - 2);
			if(x > 0){
				array.push(x);
			}
		}
		fuel = fuel + array.reduce((a, b) => a + b, 0);
	}
	return fuel;
}