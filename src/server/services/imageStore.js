/**
 * Created by Hannes on 18.03.2017.
 */
var mongoose = require('mongoose');
var response = require('../util/responseUtility');

mongoose.Promise = global.Promise;

var ImageSchema = mongoose.Schema({
    organisationId : { type: mongoose.Schema.Types.ObjectId, ref: 'OrganisationModel' },
    id: {type: String, required: true},
    picture: { data: Buffer, contentType: String},
    modifiedDate: {type: Date, default:Date.now}
});

var Image = mongoose.model('ImageModel', ImageSchema);

function publicCreate(organisationId, id, picture, callback) {
    Image.find({id : new mongoose.mongo.ObjectID(id)}, function(err,docs) {
        if (err == null) {
            if (docs.length === 0) {
                let image = new Image({organisationId: organisationId, id: id, picture: picture});
                image.save(function (err, docs) {
                    Image.findOneAndUpdate({id : id},
                        { $set: {picture: picture}}, function(err, docs){
                            response.default(err, callback);
                        });
                });
            } else {
                Image.findOneAndUpdate({id : id},
                    { $set: {picture: picture}}, function(err, docs){
                        response.default(err, callback);
                    });
            }
        } else {
            response.default(err, callback);
        }
    });

}

function publicGet(id, callback) {
    Image.find({_id : new mongoose.mongo.ObjectID(id)}, function(err,docs) {
        callback(err, docs);
    });
}

function publicAll(callback) {
    Image.find({},function(err, docs){
        callback(err, docs);
    });
}

function publicGetByOrganisation(organisationId, callback) {
    Image.find({organisationId: organisationId},function(err, docs){
        callback(err, docs);
    });
}

function publicRemove(id, callback) {
    Image.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function (err, docs){
        callback(err, docs);
    });
}

function publicRemoveAll(callback) {
    Image.remove({}, function (err, docs){
        callback(err, docs);
    });
}


function publicUpdate(id, picture, callback) {
    Image.findOneAndUpdate({id : id},
        { $set: {picture: picture, modifiedDate: Date.now}}, function(err, docs){
            response.default(err, callback);
        });
}

module.exports = {
    create : publicCreate,
    update: publicUpdate,
    delete: publicRemove,
    deleteAll: publicRemoveAll,
    get: publicGet,
    getByOrganisation: publicGetByOrganisation,
    all : publicAll
};