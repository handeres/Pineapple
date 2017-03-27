let server = require('./server');
/* Productive Database */
var dbURI = 'mongodb://irvine:irvine123@ds145329.mlab.com:45329/pineapple1';
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