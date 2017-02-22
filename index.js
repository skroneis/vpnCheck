var fs = require('fs');
var async = require('async');
var schedule = require('node-schedule');
// var GpioStone = require('./gpio_stone_wp');
// var gpioStone = new GpioStone();
//var filename = "/var/log/openvpn-status.log";
var filename = "./samples/1.txt"
var delay = 2000; //2 seonds

/*****************************************************/
var checkVpn = function (callback) {
    try {
        var data = fs.readFileSync(filename).toString().split("\r");
        var foundIndex = 0;
        data.forEach(function (line) {
            line = line.replace("\n", "");
            // console.log(line);
            if (line.startsWith("10.8.0")) {
                // console.log("FOUND!");
                foundIndex++;
            }
        });

        //return result
        return callback(null, foundIndex > 0);
    }
    catch (e) {
        console.log(e);
        return callback(e);
    }
}
/*****************************************************/

/*checkVpn(function (err, activeVpnConnection) {
    // console.log(activeVpnConnection);
    if (activeVpnConnection) {
        console.log("YES");
        gpioStone.setOn(gpioStone.LED_GREEN);
    }
    else {
        console.log("NO");
        gpioStone.setOff(gpioStone.LED_GREEN);
    }
});*/
async.forever(
    function (next) {
        checkVpn(function (err, activeVpnConnection) {
            // console.log(activeVpnConnection);
            if (activeVpnConnection) {
                console.log("YES");
                // gpioStone.setOn(gpioStone.LED_GREEN);
            }
            else {
                console.log("NO");
                // gpioStone.setOff(gpioStone.LED_GREEN);
            }
        });
        //Repeat after the delay
        setTimeout(function () {
            next();
        }, delay)
    },
    function (err) {
        console.log(err);
    }
);
