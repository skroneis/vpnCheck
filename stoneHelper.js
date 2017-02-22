'use strict';
var dateFormat = require('dateformat');

var getDate = function () {
    return dateFormat(new Date(), "dd.mm.yyyy hh:MM:ss");
}

/* Public API */
module.exports.getDate = getDate;