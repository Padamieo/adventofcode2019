import text from '../resources/3.txt';
import common from '../common';
const c = new common();

export default function init() {
	const rawdata = processData(text);
	// var basic = processOpCode(rawdata);
	// c.log(basic);
}

function processData(input) {
	var lines = input.split('/n');
	console.log(lines);
	var line = lines.split(',').map((s) => { return { d:s.replace(/[0-9]/g,''), a: s.replace(/[^0-9]/g,''), }; });
	// var b = [];
	// for(var i = 0; i < line.length; i = i+4) {

	// 	b.push();
	// }
	c.log(line);
	return line;
}

// function processOpCode(data) {

// }