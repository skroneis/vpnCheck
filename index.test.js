var async = require('async');
var schedule = require('node-schedule');

var vpnChecker = require('./vpnChecker');
var stoneHelper = require('./stoneHelper');
var config = require('./config');
var delay = config.interval; //2000 == 2 secondy

var actuals = {
	connections: [{
        virtualAddress: "10.8.0.10",
        CN: "ios",
        realAddress: "91.112.9.6:52150",
        LastRef: "Tue Feb 21 16:24:59 2017"
    },
    {
        virtualAddress: "10.8.0.6",
        CN: "client1",
        realAddress: "91.112.9.6:64962",
        LastRef: "Tue Feb 21 16:25:07 2017"
    }]
};

var http = require("./website");
http.init(actuals);

async.forever(
    function (next) {
        vpnChecker.checkVpn(function (err, activeVpnConnection) {
            // console.log(activeVpnConnection);
            if (activeVpnConnection) {
                console.log("VPN connection active! " + stoneHelper.getDate());
                // gpioStone.setOn(gpioStone.LED_GREEN);
            }
            else {
                console.log("NO VPN connection active. " + stoneHelper.getDate());
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
