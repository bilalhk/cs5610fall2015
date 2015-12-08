module.exports = function(str1, str2) {
	
	arr1 = str1.split("");
	arr2 = str2.split("");
	
	var result = true;
	
	arr1.forEach(function(val, index, array) {
		result = result && (val === arr2[index]);
	});
	
	return result;
	
}