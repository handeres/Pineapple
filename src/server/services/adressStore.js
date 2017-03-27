/**
 * Created by Hannes on 01.02.2017.
 */
var mongoose = require('mongoose');
var crypto = require('../util/cryptoUtil');

var AdressSchema = mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    street: {type: String, required: true},
    number: {type: String, required: true},
    zipCode: {type: String, required: true},
    city: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String},
    mobile: {type: String},
    createDate: {type: Date, default:Date.now},
    modifiedDate: {type: Date, default:Date.now},
});



var decrpytAdress = function(adress) {
    var decryptedValue;

    decryptedValue =  crypto.decrypt(adress.name);
    adress.name = decryptedValue;

    decryptedValue =  crypto.decrypt(adress.surname);
    adress.surname = decryptedValue;

    decryptedValue =  crypto.decrypt(adress.street);
    adress.street = decryptedValue;

    decryptedValue =  crypto.decrypt(adress.number);
    adress.number = decryptedValue;

    decryptedValue =  crypto.decrypt(adress.zipCode);
    adress.zipCode = decryptedValue;

    decryptedValue =  crypto.decrypt(adress.city);
    adress.city = decryptedValue;

    decryptedValue =  crypto.decrypt(adress.email);
    adress.email = decryptedValue;

    if (null != adress.phone) {
        decryptedValue = crypto.decrypt(adress.phone);
        adress.phone = decryptedValue;
    }

    if (null != adress.mobile) {
        decryptedValue = crypto.decrypt(adress.mobile);
        adress.mobile = decryptedValue;
    }
    return;
};

var encrpytAdress = function(adress) {
    if (adress.isModified('name')) {
        encryptedValue =  crypto.encrypt(adress.name);
        adress.name = encryptedValue;
    }
    if (adress.isModified('surname')) {
        encryptedValue =  crypto.encrypt(adress.surname);
        adress.surname = encryptedValue;
    }
    if (adress.isModified('street')) {
        encryptedValue = crypto.encrypt(adress.street);
        adress.street = encryptedValue;
    }
    if (adress.isModified('number')) {
        encryptedValue =  crypto.encrypt(adress.number.toString());
        adress.number = encryptedValue;
    }
    if (adress.isModified('zipCode')) {
        encryptedValue =  crypto.encrypt(adress.zipCode);
        adress.zipCode = encryptedValue;
    }
    if (adress.isModified('city')) {
        encryptedValue =  crypto.encrypt(adress.city);
        adress.city = encryptedValue;
    }
    if (adress.isModified('email')) {
        encryptedValue =  crypto.encrypt(adress.email);
        adress.email = encryptedValue;
    }
    if (adress.isModified('phone')) {
        encryptedValue =  crypto.encrypt(adress.phone);
        adress.phone = encryptedValue;
    }
    if (adress.isModified('mobile')) {
        encryptedValue =  crypto.encrypt(adress.mobile);
        adress.mobile = encryptedValue;
    }
}

AdressSchema.pre('save', function(next){
    encrpytAdress(this);
    return next();
});

var Adress = mongoose.model('AdressModel', AdressSchema);

function publicAdd(name, surname, street, number, zipCode, city, email, phone, mobile,  callback) {
    var adress = new Adress({name : name, surname : surname, street: street, number: number, zipCode: zipCode, city: city, email : email, phone : phone, mobile : mobile});
    adress.save(function (err, docs) {
        callback(err, docs);
    });
}

function publicRemove(id, callback) {
    Adress.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function (err, docs){
        callback(err, docs);
    });
}

function publicUpdate(id, name, surname, street, number, zipCode, city, email, phone, mobile,  callback) {
    Adress.findOne({_id : new mongoose.mongo.ObjectID(id)}, function (err, doc){
        doc.name = name;
        doc.surname = surname;
        doc.street = street;
        doc.number = number;
        doc.city = city;
        doc.zipCode = zipCode;
        doc.email = email;
        doc.phone = phone;
        doc.mobile = mobile;
        doc.modifiedDate = new Date();
        /* Notwendig wegen encrypting. Die Pre Funktion wird nur beim Save durchgeführt und nicht beim update */
        doc.save(function (err, docs) {
            callback(err, docs);
        });
    });
}

function publicGet(id, callback) {
    Adress.findOne({_id : new mongoose.mongo.ObjectID(id)}, function (err, docs){
        callback(err, docs);
    });
}

function publicAll(callback) {
    Adress.find(function (err, docs) {
        callback(err, docs);
    });
}

module.exports = {
    add : publicAdd,
    delete: publicRemove,
    update : publicUpdate,
    get : publicGet,
    all : publicAll,
    decrypt : decrpytAdress
};