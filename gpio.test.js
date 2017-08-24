var async = require('async');
var GpioStone = require('./gpio_stone_node');
var gpioStone = new GpioStone();


gpioStone.setOn(gpioStone.LED_GREEN);

gpioStone.read(gpioStone.LED_GREEN, function (err, pin_value) {
    console.log(pin_value);
});

gpioStone.setOff(gpioStone.LED_GREEN);

gpioStone.read(gpioStone.LED_GREEN, function (err, pin_value) {
    console.log(pin_value);
});