/**
 * Created by Hannes on 10.02.2017.
 */
var mongoose = require('mongoose');
var organisationLink = require('./organisationLinkStore');
var absence = require('./absenceStore');
var role = require('./roleStore');
var shortid = require('shortid');
var response = require('../util/responseUtility');

//Use default promise
mongoose.Promise = global.Promise;


var MemberSchema = mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    contractId: { type: String, required: true},
    callingName: {type: String},
    birthday : {type: String},
    organisation : { type: mongoose.Schema.Types.ObjectId, ref: 'OrganisationModel' },
    parent : { type: mongoose.Schema.Types.ObjectId, ref: 'ParentModel' },
    group:  {type: mongoose.Schema.Types.ObjectId, ref: 'GroupModel' },
    adress : {type: mongoose.Schema.Types.ObjectId, ref: 'AdressModel' },
});

MemberSchema.post('find', function(result, next) {
    if (result) {
        if (result.length > 0) {
            let doneCnt = 0;
            result.forEach(member => {
                absence.hasAbsence(member._id, function (err, docs) {
                    doneCnt++;
                    if (docs.hasAbsence) {
                        member._doc.hasAbsence = true;
                    } else {
                        member._doc.hasAbsence = false;
                    }
                    if (doneCnt >= result.length) {
                        next();
                    }
                });
            })
        }
        else {
            next();
        }
    } else {
        next();
    }
});

MemberSchema.post('findOne', function(result, next) {
    if (result) {
        absence.hasAbsence(result._id, function (err, docs) {
            if (docs.hasAbsence) {
                result._doc.hasAbsence = true;
            } else {
                result._doc.hasAbsence = false;
            }
            next();
        });
    } else {
        next();
    }
});

var Member = mongoose.model('MemberModel', MemberSchema);


function publicCreate(name, surname, callingName, birthday, organisationId, groupId, callback) {
    let uniqueId = shortid.generate();
    let member = new Member({name: name,
        surname: surname,
        contractId: uniqueId,
        callingName: callingName,
        birthday: birthday,
        organisation: organisationId,
        group: groupId,
        imageSource: null});

    member.save(function (err, docs) {
        organisationLink.addAddMember(docs.organisation, docs._id, function(err, orgLinkDocs) {
            response.default(err, callback, {id:docs._id, contractId:uniqueId} );
        });
    });
}

function publicAddParent(id, parentId, callback) {
    Member.findOneAndUpdate({_id : new mongoose.mongo.ObjectID(id)}, { $set: {parent: parentId}}, function(err, docs){
        response.default(err, callback);
    });
}

function publicAddAdress(id, adressId, callback) {
    Member.findOneAndUpdate({_id : new mongoose.mongo.ObjectID(id)}, { $set: {adress: adressId}}, function(err, docs){
        response.default(err, callback);
    });
}

function publicRemove(organisationId, id, callback) {
    organisationLink.removeMember(organisationId, id, function(err, orgLinkDocs) {
        absence.removeByMember(id, function (err, absensedocs){
             Member.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function (err, docs){
                response.default(err, callback);
             });
        });
    });
}

function publicRemoveByGroup(organisationId, groupId, callback) {
    Member.find({group : groupId}, function(err, memberdocs){
        if(memberdocs) {
            if (memberdocs.length > 0) {
                let removed = 0;
                memberdocs.forEach(member => {
                    publicRemove(organisationId, member._id, function (err, docs) {
                        removed++;
                        if (removed >= memberdocs.length) {
                            response.default(err, callback);
                        }
                    });
                });
            } else {
                response.default(err, callback);
            }
        } else {
            response.default(err, callback);
        }
    });
}

function publicRemoveAll(callback) {
    Member.remove({},function(err, docs){
        callback(err, docs);
    });
}

function publicGet(id, callback) {
    Member.find({_id : new mongoose.mongo.ObjectID(id)}).populate('group').exec (function(err,docs) {
        callback(err, docs);
    });
}

function publicGetForDetail(organisationId, id, callback) {
    Member.find({_id : new mongoose.mongo.ObjectID(id)}).populate('group').exec (function(err, memberDocs) {
        let allGroups = [];
        organisationLink.getAllGroups(organisationId, function(err, allMemberDocs) {
            allMemberDocs.forEach(member => {
                let data = {_id: member._id,
                    name: member.name,
                }
                allGroups.push(data);
            });
            let absencesForm = [];
            memberDocs.forEach(member => {
                let data = {_id: member._id,
                    name: member.name,
                    surname: member.surname,
                    callingName: member.callingName,
                    birthday: member.birthday,
                    groupId: member.group._id,
                    contractId: member.contractId,
                    parentId: member.parent,
                    groupName: member.group.name};
                absencesForm.push({
                    member: data,
                    groups: allGroups
                })
            });
            callback(err, absencesForm);
        });
    });
}

function privateCreateOverview(memberDocs, callback) {
   let members = [];
    memberDocs.forEach(member => {
        let data = {
            _id: member._id,
            name: member.name,
            surname: member.surname,
            callingName: member.callingName,
            birthday: member.birthday,
            groupId: member.group._id,
            contractId: member.contractId,
            parentId: member.parent,
            groupName: member.group.name
        };
        members.push(data);
    });
    callback(members);
}

function publicGetByGroup(groupId, callback) {
    Member.find({group : new mongoose.mongo.ObjectID(groupId)}).populate('group').exec (function(err, docs) {
        callback(err, docs);
    });

}

function publicGetByOrganisation(organisationId, callback) {
    Member.find({organisation : organisationId}).populate('group').exec (function(err, docs) {
        callback(err, docs);
    });
}

function publicGetByParent(parentId, callback) {
    Member.find({parent : parentId}).populate('group').exec (function(err, docs) {
        callback(err, docs);
    });
}

function publicGetByParentOrOrganisation(roleReq, organisationId, parentId, callback) {
    if (role.ORGANISATION_ROLE == roleReq) {
        publicGetByOrganisation(organisationId, callback);
    } else if (role.PARENT_ROLE == roleReq) {
        publicGetByParent(parentId, callback);
    }
}

function publicGetByContractId(contractId, callback) {
    Member.findOne({contractId : contractId}, function(err, docs){
        callback(err, docs);
    });
}

function publicGetParentGroups(parentId, callback) {
    Member.find({parent : parentId}).populate('group').exec(function(err, docs) {
        let groups = [];
        if (docs) {
            docs.forEach(member => {
                groups.push(member.group);
            });
        }
        callback(err, groups);
    });
}

function publicAll(req, callback) {
    Member.find({},function(err, docs){
        callback(err, docs);
    });
}

function publicUpdate(id, name, surname, callingName, birthday, organisationId, groupId, callback) {
    // workaround wegen formular problem
    if ((groupId !== null) && (groupId !== undefined)) {
        Member.findOneAndUpdate({_id: new mongoose.mongo.ObjectID(id)}, {
            $set: {
                name: name,
                surname: surname,
                callingName: callingName,
                birthday: birthday,
                organisation: organisationId,
                group: groupId
            }
        }, function (err, docs) {
            callback(err, docs);
        });
    } else {
        Member.findOneAndUpdate({_id: new mongoose.mongo.ObjectID(id)}, {
            $set: {
                name: name,
                surname: surname,
                callingName: callingName,
                birthday: birthday,
                organisation: organisationId
            }
        }, function (err, docs) {
            callback(err, docs);
        });
    }
}

module.exports = {
    create : publicCreate,
    update: publicUpdate,
    delete: publicRemove,
    deleteAll: publicRemoveAll,
    deleteByGroup: publicRemoveByGroup,
    get : publicGet,
    getForDetail: publicGetForDetail,
    getParentGroups: publicGetParentGroups,
    all : publicAll,
    getByContractId: publicGetByContractId,
    getByGroup: publicGetByGroup,
    getByOrganisation: publicGetByOrganisation,
    getByParent: publicGetByParent,
    getByParentOrOrganisation: publicGetByParentOrOrganisation,
    addParent: publicAddParent
};