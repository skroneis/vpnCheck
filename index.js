var fs = require('fs');
var async = require('async');
var schedule = require('node-schedule');
var GpioStone = require('./gpio_stone_wp');
var gpioStone = new GpioStone();
var filename = "/var/log/openvpn-status.log";
//var filename = "./samples/1.txt"
var delay = 2000; //2 seonds

console.log(filename);
/*****************************************************/
var checkVpn = function (callback) {
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
/*****************************************************/

/*checkVpn(function (err, activeVpnConnection) {
    // console.log(activeVpnConnection);
    if (activeVpnConnection) {
        console.log("VPN connection active!");
        gpioStone.setOn(gpioStone.LED_GREEN);
    }
    else {
        console.log("NO VPN connection active.");
        gpioStone.setOff(gpioStone.LED_GREEN);
    }
});*/

async.forever(
    function (next) {
        checkVpn(function (err, activeVpnConnection) {
            // console.log(activeVpnConnection);
            if (activeVpnConnection) {
                console.log("VPN connection active! " + new Date().toISOString());
                gpioStone.setOn(gpioStone.LED_GREEN);
            }
            else {
                console.log("NO VPN connection active. " + new Date().toISOString());
                gpioStone.setOff(gpioStone.LED_GREEN);
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
