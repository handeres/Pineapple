/**
 * Created by Hannes on 10.02.2017.
 */

var mongoose = require('mongoose');
var role = require('./roleStore');
var organisationLink = require('./organisationLinkStore');
var response = require('../util/responseUtility');
var socket = require('./socketStore');

const REASONS = ['Krankheit','Jokertag', 'Anderer Grund'];

//Use default promise
mongoose.Promise = global.Promise;


var AbsenceSchema = mongoose.Schema({
    memberId : { type: mongoose.Schema.Types.ObjectId, ref: 'MemberModel'},
    fromDate: {type: Date, default:Date.now, required: true },
    untilDate: {type: Date, default:Date.now },
    reason: {type: String},
    otherReason: {type: String},
    hasOtherReason: {type: Boolean},
    organisationId : { type: mongoose.Schema.Types.ObjectId, ref: 'OrganisationModel' },
    parentId : { type: mongoose.Schema.Types.ObjectId, ref: 'ParentModel' },
});

var Absence = mongoose.model('AbsenceModel', AbsenceSchema);


function publicCreate(organisationId, userId, parentId, memberId, fromDate, untilDate, reason, otherReason, hasOtherReason, callback) {
    var absence = new Absence({organisationId:organisationId,
        parentId: parentId,
        memberId : memberId,
        fromDate : fromDate,
        untilDate : untilDate,
        reason : reason,
        otherReason: otherReason,
        hasOtherReason: hasOtherReason});
    absence.save(function (err, docs) {
        // damit keine Abhängigkeit zum memberStore ensteht
        Absence.find({_id : new mongoose.mongo.ObjectID(docs._id)}).populate('memberId').exec(function(err, newdocs) {
            if (err) {
                response.default(err, callback);
                return;
            }
            socket.sendMessageToOrganisation(organisationId,
                "Abwesenheit",
                newdocs[0].memberId.name + ' ' + newdocs[0].memberId.surname,
                new mongoose.mongo.ObjectID(docs._id).toString());
        });
        response.default(err, callback, docs._id);
    });
}

function publicHasAbsences(memberId, callback) {
    let toDay = new Date();
    toDay.setHours(0, 0, 0, 0);
    let hasAbsence = false;
    Absence.find({memberId : memberId}, function (err, docs) {
        if (err) {
            callback(err, { hasAbsence: false});
            return;
        }
        if (docs !== null) {
            docs.forEach(absence => {
                absence.fromDate.setHours(0, 0, 0, 0);
                absence.untilDate.setHours(0, 0, 0, 0);
                if (     (toDay >= absence.fromDate)
                      && (toDay <= absence.untilDate)) {
                    hasAbsence = true;
                }
            });
        }
        callback(err, { hasAbsence: hasAbsence});
    });
}

function publicRemove(id, callback) {
    Absence.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function (err, docs){
        callback(err, docs);
    });
}

function publicRemoveAll(callback) {
    Absence.remove({}, function (err, docs){
        callback(err, docs);
    });
}

function publicRemoveByMember(memberId, callback) {
    Absence.remove({memberId: memberId}, function (err, docs){
        callback(err, docs);
    });
}

function publicGet(organisationId, parentId, id, callback) {
    Absence.find({_id : new mongoose.mongo.ObjectID(id)}).populate('memberId').exec(function(err, docs) {
        if (err || docs === null) {
            response.default(err, callback);
            return;
        }
        if (docs.length > 0) {
            //privateOverviewData(docs, function (err, absence){
            privateDetailData(organisationId, parentId, docs, function (err, absence) {
                if (err) {
                    response.default(err, callback);
                } else {
                    callback(err, absence);
                }
            });
        } else {
            callback(err, { success: false, message: "Der Eintrag wurde bereits gelöscht!" });
        }
    });
}

function publicRegister(organisationId, parentId, callback) {
    organisationLink.getParentMembers(organisationId, parentId, function(err, memberDocs) {
        let absencesForm = [];
        let members = [];
        if (err === null) {
            members = memberDocs;
        }
        let data = {
            member: '',
            name: '',
            surname: '',
            reason: '',
            fromDate: new Date(),
            untilDate: new Date(),
            picture: '',
        };
        absencesForm.push({
            absence: data,
            reasons: REASONS,
            members: members,

        })
        callback(null, absencesForm);
    });
}

function publicGetMemberOverview(memberId, callback) {
    Absence.find({memberId : new mongoose.mongo.ObjectID(memberId)}).populate('memberId').exec(function(err, docs) {
        if (err) {
            response.default(err, callback);
            return;
        }
        privateOverviewData(docs, function (err, absence){
            if (err) {
                response.default(err, callback);
            } else {
                callback(err, absence);
            }
        });
    });
}

function publicGetForOverview(reqRole, parentId, organisationId, callback) {
    if (reqRole === role.PARENT_ROLE) {
        Absence.find({parentId: new mongoose.mongo.ObjectID(parentId)}).populate('memberId').exec(function (err, docs) {
            if (err) {
                response.default(err, callback);
                return;
            }
            privateOverviewData(docs, function (err, absence){
                if (err) {
                    response.default(err, callback);
                } else {
                    callback(err, absence);
                }
            });
        });
    } else if (reqRole === role.ORGANISATION_ROLE) {
        Absence.find({organisationId: new mongoose.mongo.ObjectID(organisationId)}).populate('memberId').exec(function (err, docs) {
            if (err) {
                response.default(err, callback);
                return;
            }
            privateOverviewData(docs, function (err, absence){
                if (err) {
                    response.default(err, callback);
                } else {
                    callback(err, absence);
                }
            });
        });
    }
}


function privateOverviewData(absenceDoc, callback) {
    let absences = [];
    absenceDoc.forEach(absence => {
        absences.push({
            _id: absence._id,
            memberId: absence.memberId._id,
            member: absence.memberId.name + ' ' + absence.memberId.surname,
            name: absence.memberId.name,
            surname: absence.memberId.surname,
            reason: absence.reason,
            fromDate: absence.fromDate,
            untilDate: absence.untilDate,
            picture: absence.memberId.picture,
        })
    });
    callback(null, absences);
}


function privateDetailData(organisationId, parentId, absenceDoc, callback) {
    let absencesForm = [];
    let members = [];
    organisationLink.getParentMembers(organisationId, parentId, function(err, memberDocs) {
        if (err === null) {
            members = memberDocs;
        }
        absenceDoc.forEach(absence => {
            let data = {
                _id: absence._id,
                memberId: absence.memberId._id,
                member: absence.memberId.name + ' ' + absence.memberId.surname,
                name: absence.memberId.name,
                surname: absence.memberId.surname,
                reason: absence.reason,
                fromDate: absence.fromDate,
                untilDate: absence.untilDate,
                picture: absence.memberId.picture,
            };
            absencesForm.push({
                absence: data,
                reasons: REASONS,
                members: members,
            })
        });
        callback(null, absencesForm);
    });
}

function publicAll(callback) {
    Absence.find({},function(err, docs){
        callback(err, docs);
    });
}

function publicUpdate(id, userId, memberId, fromDate, untilDate, reason, callback) {
    Absence.findOneAndUpdate({_id : new mongoose.mongo.ObjectID(id)},
        { $set: {fromDate: fromDate, untilDate: untilDate, reason : reason }}, function(err, docs){
        response.default(err, callback);
    });
}

function publicAllReasons(callback) {
    callback({reasons: REASONS});
}

module.exports = {
    create : publicCreate,
    update: publicUpdate,
    delete: publicRemove,
    deleteAll: publicRemoveAll,
    removeByMember: publicRemoveByMember,
    hasAbsence: publicHasAbsences,
    register: publicRegister,
    get : publicGet,
    getForOverview: publicGetForOverview,
    getMemberOverview: publicGetMemberOverview,
    all : publicAll,
    allReasons : publicAllReasons
};