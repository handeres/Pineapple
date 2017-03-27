/**
 * Created by Hannes on 10.02.2017.
 */
var mongoose = require('mongoose');
var role = require('./roleStore');
var member = require('./memberStore');
var organisationLink = require('./organisationLinkStore');
var response = require('../util/responseUtility');

//Use default promise
mongoose.Promise = global.Promise;


var GroupSchema = mongoose.Schema({
    name: {type: String, required: true},
    level: {type: String, required: true},
    organisation : { type: mongoose.Schema.Types.ObjectId, ref: 'OrganisationModel', required: true},
});

var Group = mongoose.model('GroupModel', GroupSchema);

function publicCreate(name, level, organisationId, callback) {
    var group = new Group({name: name,
        level: level,
        organisation: organisationId});
    group.save(function (err, docs) {
        organisationLink.addAddGroup(organisationId, docs._id, function (err, orgLink) {
            response.default(err, callback, docs._id);
        });
    });
}

function publicAddMember(id, memberId, callback) {
    Group.findOneAndUpdate({_id : new mongoose.mongo.ObjectID(id)}, { $push: {memberId: memberId}}, function(err, docs){
        response.default(err, callback);
    });
}

function publicRemoveMember(id, memberId, callback) {
    Group.findOneAndUpdate({_id : new mongoose.mongo.ObjectID(id)}, { $pull: {memberId: memberId}}, function(err, docs){
        response.default(err, callback);
    });
}

function publicGetMembers(id, callback) {
    Group.find({_id : new mongoose.mongo.ObjectID(id)}).populate('members').exec(function(err,docs){
        callback(err, docs);
    });
}

function publicRemove(organisationId, id, callback) {
    organisationLink.removeGroup(organisationId, id, function (err, orgLink) {
        member.deleteByGroup(organisationId, id, function (err, memberDoc) {
            Group.findOneAndRemove({_id: new mongoose.mongo.ObjectID(id)}, function (err, docs) {
                response.default(err, callback);
            });
        });
    });
}

function publicRemoveAll(callback) {
    Group.remove({},function(err, docs){
        callback(err, docs);
    });
}

function publicGet(id, callback) {
    Group.find({_id : new mongoose.mongo.ObjectID(id)}, function(err,docs) {
        member.getByGroup(id, function(err, memberdocs) {
            docs[0]._doc.memberNbr = memberdocs.length;
            callback(err, docs);
        });
    });
}

function publicGetForOverview(reqRole, parentId, organisationId, callback) {
    if (reqRole === role.PARENT_ROLE) {
        member.getParentGroups(parentId ,function (err, docs) {
            if (err) {
                response.default(err, callback);
                return;
            }
            callback(err, docs);
        });
    } else if (reqRole === role.ORGANISATION_ROLE) {
        Group.find({organisation: new mongoose.mongo.ObjectID(organisationId)}, function (err, docs) {
            if (err) {
                response.default(err, callback);
                return;
            }
            if (docs) {
                if  (docs.length === 0) {
                    callback(err, docs);
                    return;
                }
                let doneCnt = 0;
                docs.forEach(group => {
                    let memberCnt = 0;
                    let presentNbr = 0;
                    let absencesNbr = 0;
                    member.getByGroup(group._id, function (err, memberDocs) {
                        if (err) {
                            response.default(err, callback);
                            return;
                        }
                        if (memberDocs) {
                            memberDocs.forEach(member => {
                                if (member._doc.hasAbsence) {
                                    absencesNbr++;
                                } else {
                                    presentNbr++;
                                }
                                memberCnt++;
                            });
                        }
                        group._doc.presentNbr = presentNbr;
                        group._doc.absencesNbr = absencesNbr;
                        doneCnt++
                        if ((doneCnt >=  docs.length) && (memberCnt >= memberDocs.length)) {
                            callback(err, docs);
                            return;
                        }
                    });

                });

            } else {
                callback(err, docs);
            }
        });
    }
}

function publicAll(callback) {
    Group.find({},function(err, docs){
        callback(err, docs);
    });
}

function publicGetByContractId(contractId, callback) {
    Group.findOne({contractId : contractId}, function(err, docs){
        callback(err, docs);
    });
}

function publicGetByOrganisationId(organisationId, callback) {
    Group.find({organisation : organisationId}, function(err, docs){
        callback(err, docs);
    });
}

function publicGetNamesByOrganisationId(organisationId, callback) {
    Group.find({organisation : organisationId}, function(err, docs) {
        if (err) {
            response.default(err, callback);
            return;
        }
        var groups = [];
        docs.forEach(group => {
            groups.push({
                _id: group._id,
                name: group.name,
            });
        });
        callback(err, groups);
    });
}

function publicUpdate(id, name, level, callback) {
    Group.findOneAndUpdate({_id : new mongoose.mongo.ObjectID(id)}, { $set: {name: name, level: level } }, function(err, docs){
        response.default(err, callback);
    });
}

module.exports = {
    create : publicCreate,
    addMember : publicAddMember,
    removeMember : publicRemoveMember,
    getMembers: publicGetMembers,
    update: publicUpdate,
    delete: publicRemove,
    deleteAll: publicRemoveAll,
    get: publicGet,
    getForOverview: publicGetForOverview,
    getByOrganisationId: publicGetByOrganisationId,
    getNamesByOrganisationId: publicGetNamesByOrganisationId,
    all : publicAll
};