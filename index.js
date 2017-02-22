var async = require('async');
var schedule = require('node-schedule');

var GpioStone = require('./gpio_stone_wp');
var gpioStone = new GpioStone();

var vpnChecker = require('./vpnChecker');
var stoneHelper = require('./stoneHelper');
var config = require('./config');
var delay = config.interval; //2000 == 2 secondy

var actuals = {connections: [], raw: []};
var http = require("./website");
http.init(actuals);

async.forever(
    function (next) {
        vpnChecker.checkVpn(function (err, activeVpnConnection) {
            // console.log(activeVpnConnection);
            if (activeVpnConnection) {
                console.log("VPN connection active! " + stoneHelper.getDate());
                gpioStone.setOn(gpioStone.LED_GREEN);
            }
            else {
                console.log("NO VPN connection active. " + stoneHelper.getDate());
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