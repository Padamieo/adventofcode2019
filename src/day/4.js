import text from '../resources/4.txt';
import common from '../common';
const c = new common();

export default function init() {
	const rawdata = processData(text);
	var codeCount = findPossiblePasscode(rawdata);
	c.log(codeCount + ' number of possible codes');
}

function processData(input) {
	return input.split('-').map( Number );
}

function findPossiblePasscode(data) {
	const duplicateNumbers = Array.from({length: 9}, (v, k) => (k+1).toString()+(k+1).toString());
	var count = 0;
	for(var i = data[0]; i < data[1]; i++) {
		var ix = i.toString(10).split('').map( Number );
		if(ascendingNumber(ix)){
			if(duplicateNumbers.some(s => i.toString().includes(s))){
				count++;
			}
		}
	}
	return count;
}

function ascendingNumber(data){
	var array = [];
	for(var i = 0; i < data.length-1; i++) {
		var n = i+1;
		array.push(data[i] <= data[n]);
	}
	return array.every(x => x === true);

}
