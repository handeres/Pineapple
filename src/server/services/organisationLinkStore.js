/**
 * Created by Hannes on 13.03.2017.
 */
var mongoose = require('mongoose');
var response = require('../util/responseUtility');
//Use default promise
mongoose.Promise = global.Promise;


var OrganisationLinkSchema = mongoose.Schema({
    organisationId : { type: mongoose.Schema.Types.ObjectId, ref: 'OrganisationModel' },
    parentId : [{ type: mongoose.Schema.Types.ObjectId, ref: 'ParentModel' }],
    groupId:  [{type: mongoose.Schema.Types.ObjectId, ref: 'GroupModel' }],
    memberId : [{type: mongoose.Schema.Types.ObjectId, ref: 'MemberModel'}],
});

var Organisationlink = mongoose.model('OrganisationLinkModel', OrganisationLinkSchema);

function publicCreate(organisationId, callback) {
    var organisationLink = new Organisationlink({organisationId: organisationId});
    organisationLink.save(function (err, docs) {
        response.default(err, callback);
    });
}

function publicAll(callback) {
    Organisationlink.find({}, function(err, docs){
        callback(err, docs);
    });
}

function publicAddMember(organisationId, memberId, callback) {
    Organisationlink.findOneAndUpdate({organisationId : new mongoose.mongo.ObjectID(organisationId)},  {$push: {memberId: memberId}}, function(err, docs){
        response.default(err, callback);
    });
}

function publicRemoveMember(organisationId, memberId, callback) {
    Organisationlink.findOneAndUpdate({organisationId : new mongoose.mongo.ObjectID(organisationId)},  {$pop: {memberId: memberId}}, function(err, docs){
        response.default(err, callback);
    });
}

function publicAddParent(organisationId, parentId, callback) {
    Organisationlink.findOneAndUpdate({organisationId : new mongoose.mongo.ObjectID(organisationId)},  {$push: {parentId: parentId}}, function(err, docs){
        response.default(err, callback);
    });
}

function publicRemoveParent(organisationId, parentId, callback) {
    Organisationlink.findOneAndUpdate({organisationId : new mongoose.mongo.ObjectID(organisationId)},  {$pull : {parentId: parentId}}, function(err, docs){
        response.default(err, callback);
    });
}

function publicGetAllMember(organisationId, callback) {
    Organisationlink.find({organisationId : organisationId}).populate('memberId').exec (function(err, docs){
        callback(err, docs[0].memberId);
    });
}

function publicAddGroup(organisationId, groupId, callback) {
    Organisationlink.findOneAndUpdate({organisationId : new mongoose.mongo.ObjectID(organisationId)},  {$push: {groupId: groupId}}, function(err, docs){
        response.default(err, callback);
    });
}

function publicRemoveGroup(organisationId, groupId, callback) {
    Organisationlink.findOneAndUpdate({organisationId : new mongoose.mongo.ObjectID(organisationId)},  {$pull : {groupId: groupId}}, function(err, docs){
        response.default(err, callback);
    });
}

function publicGetAllGroups(organisationId, callback) {
    Organisationlink.find({organisationId : organisationId}).populate('groupId').exec (function(err, docs){
        //callback(err, docs[0].groupId);
        callback(err, docs[0].groupId);
    });
}

function publicRemoveAllGroups(organisationId, callback) {
    Organisationlink.find({organisationId : organisationId},function(err, orgDocs){
        Organisationlink.findOneAndUpdate({organisationId : new mongoose.mongo.ObjectID(organisationId)}, {$pullAll: {groupId: orgDocs.groupId}}, function(err, docs){
            response.default(err, callback);
        });
    });

}

function publicGetParent(organisationId, parentId, callback) {
    Organisationlink.findOne({organisationId : organisationId}).populate('parentId').exec (function(err, docs){
        docs.parentId.forEach( parent => {
            let id = new mongoose.mongo.ObjectID(parent._id).toString();
            if (id === parentId) {
                callback(err, parent);
                return;
            }
        });
    });
}

function publicGetParentMembers(organisationId, parentId, callback) {
    Organisationlink.findOne({organisationId : organisationId}).populate('memberId').exec (function(err, docs){
        let members = [];
        docs.memberId.forEach(member => {
            let id = new mongoose.mongo.ObjectID(member.parent).toString();
            if (id === parentId) {
                members.push(member);
            }
        });
        callback(err, members);
    });
}



function publicRemove(id, callback) {
    Organisationlink.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function (err){
        response.default(err, callback);
    });
}

function publicRemoveAll(callback) {
    Organisationlink.remove(function (err, docs){
        callback(err, docs);
    });
}

module.exports = {
    create : publicCreate,
    all : publicAll,
    addAddMember: publicAddMember,
    removeMember: publicRemoveMember,
    addAddParent: publicAddParent,
    removeParent: publicRemoveParent,
    addAddGroup: publicAddGroup,
    removeGroup: publicRemoveGroup,
    removeAllGroups: publicRemoveAllGroups,
    getAllMember: publicGetAllMember,
    getAllGroups: publicGetAllGroups,
    getParent: publicGetParent,
    getParentMembers: publicGetParentMembers,
    delete: publicRemove,
    deleteAll: publicRemoveAll,

};