'use strict';

//config
var config = require('./config');

var fs = require('fs');
var filename = config.filename;

console.log(filename);

function checkVpn(callback) {
    try {

        var data = fs.readFileSync(filename).toString().split("\n");
        var foundIndex = 0;
        data.forEach(function (line) {
            // line = line.replace("\n", "");
            //console.log(line);
            //console.log(line[0]);
            if (line.startsWith("10.8.0.")) {
                // console.log("FOUND!");
                foundIndex++;
            }
        });
        // console.log(foundIndex);
        //return result
        return callback(null, foundIndex > 0);
    }
    catch (e) {
        console.log(e);
        return callback(e);
    }
}

// module.exports = exports['default'];
/* Public API */
module.exports.checkVpn = checkVpn;