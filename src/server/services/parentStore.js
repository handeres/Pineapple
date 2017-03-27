/**
 * Created by Hannes on 10.02.2017.
 */
var mongoose = require('mongoose');
var adress = require('./adressStore');
var member = require('./memberStore');
var user = require('./userStore');
var organisationLink = require('./organisationLinkStore');
var shortid = require('shortid');
var response = require('../util/responseUtility');

//Use default promise
mongoose.Promise = global.Promise;


var ParentSchema = mongoose.Schema({
    contractId: { type: String, required: true},
    adress : { type: mongoose.Schema.Types.ObjectId, ref: 'AdressModel' },
    members : [{ type: mongoose.Schema.Types.ObjectId, ref: 'MemberModel' }],
});

var Parent = mongoose.model('ParentModel', ParentSchema);


function publicCreate(userid, name, surname, street, number, zipCode, city, email, phone, mobile, childContractId,  callback) {
    adress.add(name, surname, street, number.toString(), zipCode.toString(), city,  email, phone, mobile, function (err, adressDocs) {
        if (null == err) {
            member.getByContractId(childContractId, function(memberErr, memberDoc) {
                if (memberErr) {
                    callback(err, { success: false });
                }
                var uniqueId = shortid.generate();
                var parent = new Parent({contractId: uniqueId, adress: adressDocs._id, $push: { members: memberDoc._id }});
                parent.save(function (err, parentDoc) {
                    if (null == err) {
                        user.firstLoginDone(userid, parentDoc._id,  function(err) {
                            if (err) {
                                callback(err, { success: false });
                            } else {
                                member.addParent(memberDoc._id, parentDoc._id, function(err) {
                                    if (err) {
                                        callback(err, { success: false });
                                    } else {
                                        organisationLink.addAddParent(memberDoc.organisation, parentDoc._id, function(err,linkDoc) {
                                            if (err) {
                                                callback(err, { success: false });
                                            } else {
                                                callback(err, {
                                                    success: true,
                                                    memberId: memberDoc._id,
                                                    parentId: parentDoc._id
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    } else {
                        callback(err, { success: false });
                    }
                });
            });

        } else {
            callback(err, { success: false });
        }
    });
}

function publicAddNewMember(parentId, childContractId,  callback) {
    member.getByContractId(childContractId, function(memberErr, memberDoc) {
        if (memberErr || (null === memberDoc)) {
            callback(memberErr, {success: false, message: 'Keine gültige Vertrags ID'});
            return;
        }
        member.addParent(memberDoc._id, parentId, function (err) {
            if (err) {
                response.default(err, callback);
            } else {
                Parent.findOneAndUpdate({_id: new mongoose.mongo.ObjectID(parentId)}, {$push: {members: memberDoc._id}}, function (err, parentDoc) {
                    if (err) {
                        response.default(err, callback);
                    } else {
                        callback(err, {
                            success: true,
                            memberId: memberDoc._id,
                            parentId: parentDoc._id
                        });
                    }
                });
            }
        });
    });
}

function publicAddAdress(id, adressId) {
    Parent.findOneAndUpdate({_id : new mongoose.mongo.ObjectID(id)}, { $set: {adress: adress}}, function(err){
        response.default(err, callback);
    });
}

function publicRemove(id, callback) {
    Parent.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function (err){
        response.default(err, callback);
    });
}

function publicRemoveAll(callback) {
    Parent.remove(function (err, docs){
        callback(err, docs);
    });
}

function publicGet(id, callback) {
    Parent.find({_id : new mongoose.mongo.ObjectID(id)}).populate('adress').exec (function(err,docs) {
        adress.decrypt(docs[0].adress);
        callback(err, docs);
    });
}

function publicAll(callback) {
    Parent.find({},function(err, docs){
        callback(err, docs);
    });
}

function publicGetMembers(id,  callback) {
    Parent.find({_id : new mongoose.mongo.ObjectID(id)}).populate('members').exec, (function(err,docs) {
        callback(err, docs);
    });
}

function publicUpdate(id, name, surname, street, number, zipCode, city, email, phone, mobile,  callback) {
    Parent.find({_id : new mongoose.mongo.ObjectID(id)}, function(err, docs){
        adress.update(docs[0].adress, name, surname, street, number, zipCode, city, email, phone, mobile, function(err, adrDocs){;
            callback(err, { success: true });
        });
    });
}

module.exports = {
    create : publicCreate,
    addNewMember: publicAddNewMember,
    update: publicUpdate,
    delete: publicRemove,
    deleteAll: publicRemoveAll,
    get : publicGet,
    all : publicAll
};