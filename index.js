var fs = require('fs');
var GpioStone = require('./gpio_stone_wp');
var gpioStone = new GpioStone();
var filename = "./samples/1.txt";

/*****************************************************/
var test = function (callback) {
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

test(function (err, activeVpnConnection) {
    // console.log(activeVpnConnection);
    if (activeVpnConnection) {
        console.log("YES");
        gpioStone.setOn(gpioStone.LED_GREEN);
    }
    else {
        console.log("NO");
        gpioStone.setOff(gpioStone.LED_GREEN);
    }
});
