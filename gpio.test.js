var async = require('async');
var GpioStone = require('./gpio_stone_node');
var gpioStone = new GpioStone();


gpioStone.setOn(gpioStone.LED_GREEN);