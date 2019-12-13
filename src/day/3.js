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
	for(var i = 0; i < data.length; i++) {
		var directionsVertical = (data[i].filter(x => (x.direction === 'U' || x.direction === 'D')));
		var b = calculateRanges(directionsVertical, 'U');
		console.log(b);

		var directionsHorizontal = (data[i].filter(x => (x.direction === 'L' || x.direction === 'R')));
		var d = calculateRanges(directionsHorizontal, 'R');
		console.log(d);

	}
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

	var minX = (Math.min(...outcomes));
	var maxX = (Math.max(...outcomes));

	return [minX, maxX];
}