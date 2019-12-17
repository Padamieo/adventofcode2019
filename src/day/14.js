import text from '../resources/14.txt';
import common from '../common';
const c = new common();

export default function init() {
	const stipulations = processData(text);
	c.log(stipulations);
	const oreRequirement = findFuel(stipulations);
	c.log(oreRequirement);
}

function processData(input) {
	var lines = input.split(/\n/);
	var stipulations = Object.fromEntries(lines.map(line => {
		var parts = line.split(/=>/).map(s => s.replace(/\s/g,''));
		var [ outputName, outputValue] = breakdown(parts[1]);
		var requires = parts[0].split(/,/).map(r => breakdown(r));
		return [outputName, {name: outputName, outputAt:outputValue, requires:Object.fromEntries(requires)}];
	}));
	return stipulations;
}

function breakdown(string){
	var name = string.replace(/[0-9]/g,'');
	var value = parseInt(string.replace(/[^0-9]/g,''));
	return [name, value];
}

function findFuel(stipulations){
	var starting = stipulations['FUEL'];
	var requirements = [];
	var bail = false;
	var i = 0;
	recursive(starting, 1, stipulations);
	/*
	console.log(starting);
	while (!bail) {
		var b = starting['requires'];
		Object.keys(b).forEach( r => {
			console.log(r);
		});

		if(i >= 1){
			bail = true;
		}
		i++;
	}
	*/

	return 0;
};

function recursive(sub, amount, stipulations) {
	console.log(sub);
	console.log(amount <=  sub.outputAt, amount);
	if(sub['requires']){
		Object.keys(sub.requires).forEach( r => {
			if(r === 'ORE'){
				var x = amount <=  sub.outputAt ? sub => {
					return sub.outputAt;
				} : () => {
					console.log('times');
					return sub.outputAt;
				};
				if(stipulations['total']){
					var b = stipulations['total'];
					stipulations['total'] = b + x;
				}else{
					stipulations['total'] = x;
				}
				
				console.log('Ore')
			}else{
				var nextSub = stipulations[r];
				console.log(sub.requires[r])
				recursive(nextSub, sub.requires[r], stipulations)
			}
		});
	}
};