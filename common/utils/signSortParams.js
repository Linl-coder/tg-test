//ASCII 码从小到大进行排序
// export default function genSignParams(inObject, secretKey) {
// 	var sorter = function(inObject) {
// 		var sortedJson = {};
// 		var sortedKeys = Object.keys(inObject).sort();
// 		for (var i = 0; i < sortedKeys.length; i++) {
// 			sortedJson[sortedKeys[i]] = inObject[sortedKeys[i]]
// 		}
// 		return sortedJson;
// 	}
// 	var sortedParam = sorter(inObject);
// 	var needSignatureStr = "";
// 	for (var key in sortedParam) {
// 		var value = sortedParam[key];
// 		needSignatureStr = needSignatureStr + key + '=' + value + '&';
// 	}
// 	needSignatureStr += 'key=' + secretKey;
// 	return needSignatureStr;
// }


const genSignParams = function(inObject, secretKey) {
	var sorter = function(inObject) {
		var sortedJson = {};
		var sortedKeys = Object.keys(inObject).sort();
		for (var i = 0; i < sortedKeys.length; i++) {
			sortedJson[sortedKeys[i]] = inObject[sortedKeys[i]]
		}
		return sortedJson;
	}
	var sortedParam = sorter(inObject);
	var needSignatureStr = "";
	for (var key in sortedParam) {
		var value = sortedParam[key];
		needSignatureStr = needSignatureStr + key + '=' + value + '&';
	}
	needSignatureStr += 'key=' + secretKey;
	return needSignatureStr;
}

export default genSignParams