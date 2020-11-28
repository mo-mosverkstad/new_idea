Object.prototype.getKey = function(value){
  for(var key in this){
    if(this[key] == value){
      return key;
    }
  }
  return null;
};

function encode(plainText, map){
    var encryptedText = "";
    for (i of plainText){
        encryptedText = encryptedText + map[i];
    }
    return encryptedText;
}

function decode(encryptedText, map){
    var decodedText = "";
    for (i of encryptedText){
        decodedText = decodedText + map.getKey(i);
    }
    return decodedText;
}

function generateMapping(mappingFunc, processFunc){
    var letters = "abcdefghijklmnopqrstuvwxyz";
    var mapping = {};
    var processList = [];
    for (x = 0; x < letters.length; x++){
        processList.push(mappingFunc(x));
    }
    resultList = processFunc(processList);
    for (x = 0; x < letters.length; x++){
        y = resultList[x];
        mapping[letters[x]] = letters[y];
    }
    return mapping;
}

function semiFactorisationMappingFunc(x) {
    n = (x + 1) / 10;
    return n ** (-1 * n + 1);
}

function unequalIntervalProcess(processList) {
    var sortedList = processList.slice(0).sort();
    var resultList = [];
    for (var i of processList) {
        resultList.push(sortedList.getKey(i));
    }
    return resultList;
}

function caesarMappingFunc(x) {
    return x + 3;
}

function equalIntervalProcess(processList) {
    var resultList = [];
    for (var i of processList) {
        resultList.push(i % 26);
    }
    return resultList;
}

console.log(generateMapping(semiFactorisationMappingFunc, unequalIntervalProcess));
console.log(generateMapping(caesarMappingFunc, equalIntervalProcess));