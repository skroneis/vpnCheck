var fs = require('fs');
var GpioStone = require('./gpio_stone_wp');
var gpioStone = new GpioStone();

var filename = "./samples/0.txt";
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

console.log(foundIndex);
if (foundIndex > 0) {
    //TODO: turn LED ON...
    gpioStone.setOn(gpioStone.LED_GREEN);
}
else
    gpioStone.setOff(gpioStone.LED_GREEN);
