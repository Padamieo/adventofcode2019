import text from '../resources/12.txt';
import common from '../common';
const c = new common();

export default function init() {
	const planets = processData(text);
	// const stepedPlanets = simulateSteps(planets, 1000);
	// c.log(stepedPlanets);
	// const energy = totalSystemEnergy(planets);
	// c.log(energy);
	const iterations = b(planets);
	console.log(iterations);
}

function b(planets) {
	var i = 0;
	var z = [];
	var bail = false;
	while (!bail) {
		i++;
		planets = simulateSteps(planets, 1);
		const energy = totalSystemEnergy(planets);
		if(!z.includes(energy)) {
			z.push(energy);
		}else{
			console.log(energy);
			console.log('PANIC');
			bail = true;
		}		
	}
	console.log(z);
	return i;
}

function totalSystemEnergy(planets) {
	var energySubTotal = [];
	for(var i = 0; i < planets.length; i++) {
		const pot = onlyPositive(planets[i].x) + onlyPositive(planets[i].y) + onlyPositive(planets[i].z);
		const kin = onlyPositive(planets[i].velocity.x) + onlyPositive(planets[i].velocity.y) + onlyPositive(planets[i].velocity.z);
		energySubTotal.push(pot * kin);
	}
	return energySubTotal.reduce((a, b) => a + b, 0);
}

function onlyPositive(number) {
	return (number >= 0 ? number : (number * -1));
}

function simulateSteps(planets, steps){
	for(var i = 0; i < steps; i++) {
		SimulatingVelocity(planets);
		SimulatingMotion(planets);
	}
	return planets;
}

function processData(input) {
	var planets = [];
	var lines = input.split(/\n/);
	for(var i = 0; i < lines.length; i++) {
		var coordinates = lines[i].replace(/<|>|\s/g, '').split(',');
		var object = Object.fromEntries(coordinates.map(x => [x.split('=')[0], parseInt(x.split('=')[1])]));
		object['velocity'] = {x:0,y:0,z:0,};
		planets.push(object);
	}
	return planets;
}

function SimulatingMotion(planets) {
	planets.forEach((p) => {
		p.x = p.x + p.velocity.x;
		p.y = p.y + p.velocity.y;
		p.z = p.z + p.velocity.z;
	});
	return planets;
}

function SimulatingVelocity(planets) {
	for(var i = 0; i < planets.length; i++) {
		var planet = planets[i];
		planets.forEach((c, x) => {
			if(x !== i){
				processDirection(planet, c, 'x');
				processDirection(planet, c, 'y');
				processDirection(planet, c, 'z');
			}
		});
	}
	return planets;
}

function processDirection(planet, comparison, axis) {
	if(planet[axis]< comparison[axis]) {
		planet.velocity[axis] = planet.velocity[axis] + 1;
	}
	if(planet[axis] > comparison[axis]) {
		planet.velocity[axis] = planet.velocity[axis] - 1;
	}
}