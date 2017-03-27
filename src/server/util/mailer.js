/**
 * Created by Hannes on 14.02.2017.
 */
var nodemailer = require('nodemailer');
var response = require('../util/responseUtility');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'pineapplecas@gmail.com',
        pass: 'Nicolas2011'
    }
});

function publicSendMail(email, contractID, callback) {
    // setup email data with unicode symbols
    var mailOptions = {
        from: 'pineapplecas@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔ from Pineapple', // Subject line
        //text: 'Hello world ?', // plain text body
        html: '<b>Vielen Dank für Ihre Anmeldung bei Pineapple</b></br><p>Ihre VertragsID: ' + contractID + '</p>' // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        response.default(error, callback);
    });
}

module.exports = {
    sendMail : publicSendMail,
};