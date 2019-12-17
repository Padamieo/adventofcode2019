import text from '../resources/3.txt';
import common from '../common';
const c = new common();

export default function init() {
	const data = processData(text);
	processGridRange(data);
}

function processData(input) {
	var lines = input.split(/\s+/);
	var processedLines = lines.map(
		line => line.split(',').map((direction) => {
			return {
				direction:direction.replace(/[0-9]/g,''),
				value: parseInt(direction.replace(/[^0-9]/g,'')),
			};
		})
	);
	return processedLines;
}

function processGridRange(data) {
	var vertical = [];
	var hortizontal = [];
	for(var i = 0; i < data.length; i++) {
		var directionsVertical = (data[i].filter(x => (x.direction === 'U' || x.direction === 'D')));
		var verticalRange = calculateRanges(directionsVertical, 'U');
		vertical.push(verticalRange);

		var directionsHorizontal = (data[i].filter(x => (x.direction === 'L' || x.direction === 'R')));
		var horizontalRange = calculateRanges(directionsHorizontal, 'R');
		hortizontal.push(horizontalRange);
	}
	var vRange = minMax(vertical.flat());
	var hRange = minMax(hortizontal.flat());
	var n = {
		height: (vRange[0] < 0 ? vRange[0]*-1 : vRange[0]) + vRange[1],
		heightShift: (vRange[0] < 0 ? vRange[0]*-1 : vRange[0]), 
		width: (hRange[0] < 0 ? hRange[0]*-1 : hRange[0]) + hRange[1],
		widthShift: (hRange[0] < 0 ? hRange[0]*-1 : hRange[0]),
	}
	console.log(n, vRange);
	return n;

}

function minMax(input) {
	return [Math.min(...input), Math.max(...input)];
}

function calculateRanges(directionsVertical, postive) {
	var outcome = 0;
	var outcomes = [];
	directionsVertical.map( x => {
		if(x.direction === postive){
			outcome += x.value;
		}else{
			outcome -= x.value;
		}
		outcomes.push(outcome);
	});
	return minMax(outcomes);
}