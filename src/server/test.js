/**
 * Created by Hannes on 26.03.2017.
 */
let server = require('./server');
/* Unit Test Database */
var dbURI = 'mongodb://irvine:test123@ds060009.mlab.com:60009/pineapple2';
server.mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
server.mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
server.mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
server.mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    server.mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
