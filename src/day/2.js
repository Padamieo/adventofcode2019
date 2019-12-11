import text from '../resources/2.txt';
import common from '../common';
const c = new common();

export default function init() {
	const rawdata = processData(text);
	var basic = processOpCode(rawdata);
	c.log(basic);
}

function processData(input) {
	return input.split(',').map( Number );
}

function processOpCode(data) {
	// var datacopy = data;
	var end = false;
	// c.log(data);
	for(var i = 0; i < data.length; i = i+4){
		if(end){
			break;
		}
		if(data[i] === undefined || data[i] === 0 || data[i] === 99){
			end = true;
		}

		var a = data[i+1];
		var b = data[i+2];
		var c = data[i+3];

		if(data[i] === 1){
			data[c] = (data[a] + data[b]);
		}

		if(data[i] === 2){
			data[c] = (data[a] * data[b]);
		}

		// console.log('potaot', data[i], data[i+1], data[i+2], data[i+3]);
		// if(end != true && data[i] != 99){
			
		// }else{
		// 	end = true;
		// 	break;
		// }
		
	}
	return data;
}