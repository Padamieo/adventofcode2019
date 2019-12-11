import text from '../resources/8.txt';
import common from '../common';
const c = new common();

export default function init() {
	const rawdata = processData(text);
	const layerData = createLayers(rawdata, 25, 6);
	var index = findleastZeroLayer(layerData);
	const result = calculateFirstAnswer(layerData[index]);
	c.log(result);
}

function calculateFirstAnswer(singleLayerData) {
	const ones = findAmountInLayer(singleLayerData, 1);
	const twos = findAmountInLayer(singleLayerData, 2);
	return ones*twos;
}

function findAmountInLayer(layerData, value){
	return layerData.filter(x => x == value).length;
}

function findleastZeroLayer(layerData){
	var layerZeroCountArray = [];
	for(var i = 0; i < layerData.length; i++) {
		layerZeroCountArray[i] = findAmountInLayer(layerData[i], 0);
	}
	return layerZeroCountArray.indexOf(Math.min(...layerZeroCountArray));
}

function createLayers(imageData, width, height) {
	const total = width * height;
	return chunk(imageData, total);
}

function processData(input) {
	return input.toString().replace(/[^0-9]/g, '').split('').map( Number );
}

const chunk = function(array, size) {
	if (!array.length) {
		return [];
	}
	const head = array.slice(0, size);
	const tail = array.slice(size);
  
	return [head, ...chunk(tail, size)];
};