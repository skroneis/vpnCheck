var fs = require("fs");
var wpi = require('wiring-pi');
wpi.setup('wpi');

exports = module.exports = GPIOStone;
var self = null;

function GPIOStone() {
    console.log("constructor - GPIOStoneWP");
    self = this;
    this.LED_GREEN = 11;
    // this.LED_RED = 1;
    // this.LED_BLUE = 2;
    // this.LED_WHITE = 3;

    wpi.pinMode(sanitizePinNumberWiringPi(13), wpi.OUTPUT);
    wpi.pinMode(sanitizePinNumberWiringPi(11), wpi.OUTPUT);
    wpi.pinMode(sanitizePinNumberWiringPi(15), wpi.OUTPUT);

    //wpi.pinMode(this.LED_GREEN, wpi.OUTPUT);
    //wpi.pinMode(this.LED_RED, wpi.OUTPUT);
    //wpi.pinMode(this.LED_BLUE, wpi.OUTPUT);    
    //wpi.pinMode(this.LED_WHITE, wpi.OUTPUT);
}

GPIOStone.prototype.setOn = function (pin) {
    pin = sanitizePinNumberWiringPi(parseInt(pin));
    // console.log("ON: ....: " + pin);
    wpi.digitalWrite(pin, 1);
};

GPIOStone.prototype.setOff = function (pin) {
    pin = sanitizePinNumberWiringPi(parseInt(pin));
    // console.log("OFF: ....: " + pin);
    // wpi.pinMode(pin, wpi.OUTPUT);
    wpi.digitalWrite(pin, 0);
};

GPIOStone.prototype.flash = function (pin) {
    this.setOff(pin);
    this.setOn(pin);
    setTimeout(this.setOff, 50, pin);

    /*setTimeout(this.setOff, 200, pin);
    setTimeout(this.setOn, 400, pin);
    // this.setOn(pin);
    setTimeout(this.setOff, 600, pin);*/
};

// var pin = 0;
// wpi.pinMode(pin, wpi.OUTPUT);
// var value = 1;
// setInterval(function() {
//   wpi.digitalWrite(pin, value);
//   value = +!value;
// }, 500);

GPIOStone.prototype.read = function (pin, callback) {
    console.log("read: ....: " + pin);
    pin = sanitizePinNumberWiringPi(parseInt(pin));
    console.log("read: ....: " + pin);
    var val = wpi.digitalRead(pin);
    console.log("val: ....: " + val);
    (callback || noop)(null, parseInt(val, 10));
};


GPIOStone.prototype.read2 = function (pin, callback) {
    console.log("read: ....: " + pin);
    pin = sanitizePinNumber(pin);
    //const value = fs.readFileSync('/sys/class/gpio/gpio23/value').toString();
    // var contents = fs.readFileSync('/sys/class/gpio/gpio17/value').toString();
    // console.log(contents);
    var path = '/sys/class/gpio/gpio' + pinMapping[pin] + '/value';
    console.log ("path --> " + path);

    fs.readFile('/sys/class/gpio/gpio' + pinMapping[pin] + '/value', function (err, data) {
        console.log("err --> " + err);
        if (err) return (callback || noop)(err);
        if (data.toString() == "undefined")
            data = 0; //TODO: geht nicht....
        console.log("-----------> " + data.toString());
        (callback || noop)(null, parseInt(data, 10));
    });

    // var buffer = fs.readFile('/sys/class/gpio/gpio7/value', function (err, data) {
    //     console.log (buffer.toString());
    // });
    //console.log(value);
    /*gpio.setup(pin, gpio.DIR_IN, readInput);
    function readInput() {
        gpio.read(pin, function (err, value) {
            console.log('The value is ' + value);
        });
    }*/
};


var rev = fs.readFileSync("/proc/cpuinfo").toString().split("\n").filter(function (line) {
    return line.indexOf("Revision") == 0;
})[0].split(":")[1].trim();
rev = parseInt(rev, 16) < 3 ? 1 : 2;

//wird nicht umgerechnet (!!!!!) --> BUG!?
var pinMapping = {
    "3": 0,
    "5": 1,
    "7": 4,
    "8": 14,
    "10": 15,
    "11": 17,
    "12": 18,
    "13": 21,
    "15": 22,
    "16": 23,
    "18": 24,
    "19": 10,
    "21": 9,
    "22": 25,
    "23": 11,
    "24": 8,
    "26": 7,

    // Model A+ and Model B+ pins
    "29": 5,
    "31": 6,
    "32": 12,
    "33": 13,
    "35": 19,
    "36": 16,
    "37": 26,
    "38": 20,
    "40": 21
};

if (rev == 2) {
    pinMapping["3"] = 2;
    pinMapping["5"] = 3;
    pinMapping["13"] = 27;
}

var pinMappingWiringPi = {
    "3": 8,
    "5": 9,
    "7": 7,
    "11": 0,
    "13": 2,
    "15": 3,
    "19": 12,
    "21": 13,
    "29": 21,
    "31": 22,
    "33": 23,
    "35": 24,
    "37": 25,
    "8": 15,
    "10": 16,
    "12": 1,
    "16": 4,
    "18": 5,
    "22": 6,
    "24": 10,
    "26": 11,
    "32": 26,
    "36": 27,
    "38": 28,
    "40": 29,
    "23": 14
};

//revision
//console.log (rev);

function isNumber(number) {
    return !isNaN(parseInt(number, 10));
}

function sanitizePinNumber(pinNumber) {
    if (!isNumber(pinNumber) || !isNumber(pinMapping[pinNumber])) {
        throw new Error("Pin number isn't valid");
    }

    return parseInt(pinNumber, 10);
}

function sanitizePinNumberWiringPi(pinNumber) {
    if (!isNumber(pinNumber) || !isNumber(pinMappingWiringPi[pinNumber])) {
        throw new Error("Pin number isn't valid");
    }
    return parseInt(pinMappingWiringPi[pinNumber], 10);
}

function noop() { }


