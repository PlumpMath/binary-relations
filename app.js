var n = 5;

function CreateBinaryRelationFromItsIndex(binary_relation, binary_relation_index) {
    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++) {
            binary_relation[i][j] = !!(binary_relation_index & 1);
            binary_relation_index >>>= 1;
        }
}

function isReflexive(br) {
    for (i = 0; i < n; i++)
        if (!br[i][i])
            return false;
    return true
}

function isAntisymm(br) {
    for (i = 1; i < n; i++)
        for (j = 0; j < i; j++)
            if (br[i][j] && br[j][i])
                return false;
    return true
}

function isTransitive(br) {
    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++) {
            if (br[i][j])
                continue;
            for (k = 0; k < n; k++)
                if (br[i][k] && br[k][j])
                    return false;
        }
    return true
}

var i, j, k;
var properties;
var reflexivity  = 0x01;
var antisymmetry = 0x02;
var transitivity = 0x04;
var cardinalities = [];
for (properties = 0; properties < 8; properties++) {
    cardinalities[properties] = 0;
}
var binary_relation = [];
for (i = 0; i < n; i++) {
    binary_relation[i] = [];
    for (j = 0; j < n; j++)
        binary_relation[i][j] = 0;
}
for (var binary_relation_index = 0; binary_relation_index < Math.pow(2, n * n); binary_relation_index++) {
    CreateBinaryRelationFromItsIndex(binary_relation, binary_relation_index);
    properties = 0x00;
    if (isReflexive(binary_relation))
        properties |= reflexivity;
    if (isAntisymm(binary_relation))
        properties |= antisymmetry;
    if (isTransitive(binary_relation))
        properties |= transitivity;
    cardinalities[properties]++;
}
var fs = require('fs');
var filename = 'cardinalities' + n + '.txt';
for (properties = 0; properties < 8; properties++){
    fs.appendFileSync(filename, cardinalities[properties] + ' ');
}
