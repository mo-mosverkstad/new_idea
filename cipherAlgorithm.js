Object.prototype.getKey = function(value){
  for(var key in this){
    if(this[key] == value){
      return key;
    }
  }
  return null;
};

// Encoding and decoding

function encode(plainText, map){
    var encryptedText = "";
    for (i of plainText){
        var add = "";
        if (i == " "){
            add = " ";
        }
        else{
            add = map[i];
        }
        encryptedText = encryptedText + add;
    }
    return encryptedText;
}

function decode(encryptedText, map){
    var decodedText = "";
    for (i of encryptedText){
        var add = "";
        if (i == " "){
            add = " ";
        }
        else{
            add = map.getKey(i)
        }
        decodedText = decodedText + add;
    }
    return decodedText;
}

// Generating mapping
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

function unequalIntervalProcess(processList) {
    var sortedList = processList.slice(0).sort();
    var resultList = [];
    for (var i of processList) {
        resultList.push(sortedList.getKey(i));
    }
    return resultList;
}


// Processing types
function equalIntervalProcess(processList) {
    var resultList = [];
    for (var i of processList) {
        resultList.push(i % 26);
    }
    return resultList;
}

// Math functions
function caesarMappingFunc(x) {
    return x + 3;
}

function semiFactorisationMappingFunc(x) {
    n = (x + 1) / 10;
    return n ** (-1 * n + 1);
}

function onClickEncode(){
    algorithm = document.getElementById("Algorithm").value;
    plainTxt = document.getElementById("plainText").value;
    interval = document.getElementById("regularInterval").value;
    sentence = "var func = function(x){ return " +algorithm+";};";
    eval(sentence);
    var processF  = null;
    if (interval == "true"){
        processF = equalIntervalProcess;
    }
    else{
        processF = unequalIntervalProcess;
    }
    result = encode(plainTxt, generateMapping(func, processF));
    document.getElementById("encryptedText").innerHTML = result;
}

function onClickDecode(){
    algorithm = document.getElementById("Algorithm").value;
    encText = document.getElementById("encryptText").value;
    interval = document.getElementById("regularInterval").value;
    sentence = "var func = function(x){ return " +algorithm+";};";
    eval(sentence);
    var processF  = null;
    if (interval == "true"){
        processF = equalIntervalProcess;
    }
    else{
        processF = unequalIntervalProcess;
    }
    result = decode(encText, generateMapping(func, processF));
    document.getElementById("decryptedText").innerHTML = result;
}

console.log(encode("hello world", generateMapping(semiFactorisationMappingFunc, unequalIntervalProcess)));
console.log(decode("vowwr frmwl", generateMapping(semiFactorisationMappingFunc, unequalIntervalProcess)));
console.log(generateMapping(semiFactorisationMappingFunc, unequalIntervalProcess));
console.log(generateMapping(caesarMappingFunc, equalIntervalProcess));