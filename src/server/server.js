/**
 * Created by Hannes on 26.03.2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var morgan = require('morgan')
var mongoose = require('mongoose');

module.exports = {socket: io, app: app, mongoose: mongoose };

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma, Origin, Authorization, X-Requested-With,**Authorization**');
    next();
};

app.use(allowCrossDomain);
app.use(bodyParser.json({limit: '50mb'}));

/* Würde nich im produktive Betrieb verwendet werden. Nur für Prüfung */
app.use('/static', express.static('../client/documentation'));

function errorHandler(err, req, res, next) {
    res.status(500).end(err.message);
}

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(errorHandler);


//const hostname = '127.0.0.1';
const hostname = '192.168.0.12';
const port = 3333;

app.use('/api*', require('./routes/checkRoutes'));
app.use('/api/parents', require('./routes/parentRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/absences', require('./routes/absenceRoutes'));
app.use('/api/organisation', require('./routes/organisationRoutes.js'));
app.use('/api/sockets', require('./routes/socketRoutes.js'));
app.use('/api/organisationLinks', require('./routes/organisationLinkRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/images', require('./routes/imageRoutes'));
app.use('/api/timetable', require('./routes/timetableRoutes'));


http.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });