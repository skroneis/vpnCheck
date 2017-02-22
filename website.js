// =======================
// WEB-Pages ================
// =======================
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8002;
var actuals = null;

//app.use(express.compress());
app.use('/', express.static(__dirname + '/public'));
//4 post
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


// =======================
// start the server ======
// =======================
var server = http.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('listening on %s:%s', host, port);
    // console.log(config.secret);
});

function errorHandler(err, req, res, next) {
    var code = err.code;
    var message = err.message;
    res.writeHead(code, message, { 'content-type': 'text/plain' });
    res.end(message);
}


//init values (actual)
var modules = module.exports = {
    init: function (values) {
        //console.log("init (http)...");
        //console.log(values.temp);
        actuals = values;
    }
};

// =======================
// REST-API ================
// =======================
app.use(function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log('Client IP:', ip);
    next();
});

// API ROUTES -------------------
var apiRoutes = express.Router();

apiRoutes.get('/getData', function (req, res, next) {
    //if(err) res.send(err);
    try {
        res.json(actuals);
    }
    catch (e) {
        console.log(e);
        return next(e);
    }
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);