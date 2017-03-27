/**
 * Created by Hannes on 10.02.2017.
 */

var mongoose = require('mongoose');
var role = require('./roleStore');
var response = require('../util/responseUtility');
var moment = require('moment');
var socket = require('./socketStore');


//Use default promise
mongoose.Promise = global.Promise;


var EventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    from: {type: Date, default:Date.now, required: true },
    timeFrom: {type: String, default: '', required: true},
    to: {type: Date, default:Date.now, required: true },
    timeTo: {type: String, default: '', required: true},
    organisationId: { type: mongoose.Schema.Types.ObjectId, ref: 'OrganisationModel' },
    createUserId: { type: String, required: true },
    createDateTime: { type: Date, default:Date.now, required: true }
});

var Event = mongoose.model('EventModel', EventSchema);


function publicCreate(title, description, from, timeFrom, to, timeTo, organisationId, createUserId, callback) {
    var event = new Event({
        title: title,
        description: description,
        from: from,
        timeFrom: timeFrom,
        to: to,
        timeTo: timeTo,
        organisationId: organisationId,
        createUserId: createUserId
    });
    event.save(function (err, docs) {
        socket.sendMessageToAllParents(new mongoose.mongo.ObjectID(docs.organisationId), 'Event', docs.title, new mongoose.mongo.ObjectID(docs._id).toString());
        response.default(err, callback, docs._id);
    });
}

function publicRemove(id, callback) {
    Event.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function (err, docs){
        callback(err, docs);
    });
}

function publicRemoveAll(callback) {
    Event.remove({}, function (err, docs){
        callback(err, docs);
    });
}

function publicGet(id, callback) {
    Event.find({_id : new mongoose.mongo.ObjectID(id)}, function(err, docs) {
        if (err || docs === null) {
            response.default(err, callback);
            return;
        }
        if (docs.length > 0) {
            callback(err, docs);
        } else {
            callback(err, { success: false, message: "Der Eintrag wurde bereits gelöscht!" });
        }
    });
}

function publicAll(callback) {
    Event.find({},function(err, docs){
        callback(err, docs);
    });
}

function publicGetNextEventByOrganisation(organisationId, callback) {
    Event.find({organisationId : organisationId}, function (err, docs){

    });
}

var date_sort_desc = function (date1, date2) {
    // This is a comparison function that will result in dates being sorted in
    // DESCENDING order.
    if (date1 > date2) return -1;
    if (date1 < date2) return 1;
    return 0;
};

// Finally, we are now able to call the sort method on our array of dates.
// More info about array sorting: http://w3schools.com/jsref/jsref_sort.asp

// First let's sort the array in ascending order.


function publicUpdate(id, title, description, from, timeFrom, to, timeTo, organisationId, callback) {
    Event.findOneAndUpdate({
        _id : new mongoose.mongo.ObjectID(id)},
        { $set: {title:title, description: description, from: from , timeFrom: timeFrom, to: to, timeTo: timeTo, organisationId: organisationId }}, function(err, docs){
        response.default(err, callback);
    });
}

module.exports = {
    create : publicCreate,
    update: publicUpdate,
    delete: publicRemove,
    deleteAll: publicRemoveAll,
    get : publicGet,
    all : publicAll,
};