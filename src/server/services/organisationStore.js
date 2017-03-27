/**
 * Created by Hannes on 30.01.2017.
 */
var mongoose = require('mongoose');
var organisationLink = require('./organisationLinkStore');
var adress = require('./adressStore');
var user = require('./userStore');
var shortid = require('shortid');
var mailer = require('./../util/mailer');
var response = require('../util/responseUtility');
//Use default promise
mongoose.Promise = global.Promise;


var OrganisationSchema = mongoose.Schema({
    name: {type: String, required: true},
    contractId: { type: String, required: true},
    adress : { type: mongoose.Schema.Types.ObjectId, ref: 'AdressModel' },
});

var Organisation = mongoose.model('OrganisationModel', OrganisationSchema);


function publicCreate(organisationName, name, surname, street, number, zipCode, city, email, phone, mobile,  callback) {
    adress.add(name, surname, street, number.toString(), zipCode.toString(), city,  email, phone, mobile, function (err, adressDocs) {
        if (null == err) {
            var uniqueId = shortid.generate();
            var organisation = new Organisation({name: organisationName, contractId: uniqueId, adress: adressDocs._id});
            organisation.save(function (err, organisationdocs) {
                if (null == err) {
                    mailer.sendMail(email, organisationdocs.contractId, function (err, mailDocs) {
                        organisationLink.create(organisationdocs._id, function (err, linkDocs) {
                            response.default(err, callback, {uniqueId:uniqueId, id:organisationdocs._id});
                        });
                    });
                } else {
                    response.default(err, callback);
                }
            });
        } else {
            response.default(err, callback);
        }
    });
}

function publicRemove(id, callback) {
    Organisation.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function (err, docs){
        organisationLink.delete(docs._id, function (err, linkDocs) {
            response.default(err, callback);
        });
    });
}

function publicRemoveAll(callback) {
    Organisation.remove(function (err, docs){
        organisationLink.deleteAll(function (err, linkDocs) {
            callback(err, docs);
        });
    });
}

function publicGet(id, callback) {
    Organisation.find({_id : new mongoose.mongo.ObjectID(id)}).populate('adress').exec(function(err,docs){
        adress.decrypt(docs[0].adress);
        callback(err, docs);
    });
}

function publicGetByContractId(contractId, callback) {
    Organisation.findOne({contractId : contractId}, function(err, docs){
        callback(err, docs);
    });
}

function publicAll(callback) {
    Organisation.find({}).populate('adress').exec(function(err, docs){
       docs.forEach(doc => {
          adress.decrypt(doc.adress);
       });
        callback(err, docs);
    });
}

function publicUpdate(id, organisationsName, name, surname, street, number, zipCode, city, email, phone, mobile,  callback) {
    Organisation.findOneAndUpdate({_id : new mongoose.mongo.ObjectID(id)}, { $set: {name: organisationsName }}, function(err, docs){
    adress.update(docs.adress, name, surname, street, number, zipCode, city, email, phone, mobile, function(err, adrDocs){;
            callback(err, { success: true });
        });
    });
}

module.exports = {
    create : publicCreate,
    update: publicUpdate,
    delete: publicRemove,
    deleteAll: publicRemoveAll,
    get : publicGet,
    all : publicAll,
    getByContractId : publicGetByContractId
};