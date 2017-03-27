/**
 * Created by Hannes on 18.03.2017.
 */
var mongoose = require('mongoose');
var response = require('../util/responseUtility');

mongoose.Promise = global.Promise;

const DAY_NAMES = ['Mo','Di', 'Mi', 'Do', 'Fr'];

var TimetableDaySchema = mongoose.Schema({
    _id: {type: String},
    dayName: {type: String},
    timefromMorning: {type: String},
    timeToMorning: {type: String},
    textMorning: {type: String},
    timefromAfternoon: {type: String},
    timeToAfternoon: {type: String},
    textAfternoon: {type: String},
});

var TimetableSchema = mongoose.Schema({
    id: {type: String, required: true},
    days:[TimetableDaySchema]
});

var Timetable = mongoose.model('TimetableModel', TimetableSchema);

function publicCreate(groupId, req,  callback) {
    let timetable = new Timetable({id: groupId,days: req.body.days});
    timetable.save(function (err, docs) {
        response.default(err, callback);
    });
}

function publicGet(id, callback) {
    Timetable.find({_id : new mongoose.mongo.ObjectID(id)}, function(err,docs) {
        callback(err, docs);
    });
}

function publicGetByGroupId(groupId, callback) {
    Timetable.findOne({id : groupId}, function(err,doc) {
        if (doc) {
           for(let i = 0; i < 5 && i < doc.days.length; i++) {
               doc.days[i].dayName = DAY_NAMES[i];
               if(doc.days[i].textAfternoon.length == 0) {
                   doc.days[i].textAfternoon = 'Frei';
               }
               if(doc.days[i].textMorning.length == 0) {
                   doc.days[i].textMorning = 'Frei';
               }
           }
        }
        if (doc === null) {
            doc = {};
        }
        callback(err, doc);
    });
}

function publicAll(callback) {
    Timetable.find({},function(err, docs){
        callback(err, docs);
    });
}

function publicRemove(id, callback) {
    Timetable.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function (err, docs){
        callback(err, docs);
    });
}

function publicRemoveAll(callback) {
    Timetable.remove({}, function (err, docs){
        callback(err, docs);
    });
}


function publicUpdate(id, req, callback) {
    Timetable.findOneAndUpdate({id : id},
        { $set: {days: req.body.days }}, function(err, docs){
            response.default(err, callback);
        });
}

module.exports = {
    create : publicCreate,
    update: publicUpdate,
    delete: publicRemove,
    deleteAll: publicRemoveAll,
    get: publicGet,
    getByGroupId: publicGetByGroupId,
    all : publicAll
};