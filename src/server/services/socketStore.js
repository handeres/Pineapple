/**
 * Created by Hannes on 06.03.2017.
 */
var mongoose = require('mongoose');
var organisationLink = require('./organisationLinkStore');
var socket = require('../server').socket;

mongoose.Promise = global.Promise;

var SocketMessageSchema = mongoose.Schema({
    title:  {type: String},
    text:  {type: String},
    read: {type: Boolean},
    parameter: {type: String},
});
var SocketMessage = mongoose.model('SocketMessageModel', SocketMessageSchema);

var SocketSchema = mongoose.Schema({
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    id:  {type: String},
    clientId: {type: String, required: true},
    messages: [SocketMessageSchema],
});

var Socket = mongoose.model('SocketModel', SocketSchema);

socket.on('connection', function(client){
    if (client.id) {
        Socket.findOneAndUpdate({userId: client.handshake.query.userId},{
            $set: {clientId:client.id, id:client.handshake.query.id}}, function (err, docs) {
                if (err || (docs == null)) {
                    var socketData = new Socket({userId: client.handshake.query.userId, id: client.handshake.query.id, clientId: client.id});
                        socketData.save(function (err, docs) {
                    });
                } else if(docs !== null) {
                    docs.messages.forEach(message => {
                            socket.to(client.id).emit('message', message);
                            docs.messages.remove(message._id);
                        }
                    );
                    docs.save(function (err, docs) {

                    });
                }
                client.on('disconnect', function(data){
                    client.disconnect();
                });
        });
    }
});

socket.on('disconnect', function(client){
    client.disconnect();
});


socket.on('close', function(client){
    client.disconnect();
});

function publicRemoveAll(callback) {
    Socket.remove({},function(err, docs){
        callback(err, docs);
    });
}

function publicAll(callback) {
    Socket.find({},function(err, docs){
        callback(err, docs);
    });
}


function publicSendMessage(parentId, title, text, parameter) {
    Socket.findOne({id: parentId}, function (err, docs) {
        if (docs !== null) {
            privateEmitMessage(parentId, title, text, docs.clientId, parameter, docs);
        }
    });
}

function publicSendMessageToOrganisation(organisationId, title, text, parameter) {
    Socket.findOne({id: organisationId}, function (err, docs) {
        if (docs !== null) {
            privateEmitMessage(organisationId, title, text, docs.clientId, parameter, docs);
        }
    });
}

function publicSendMessageToAllParents(organisationId, title, text, parameter) {
    organisationLink.getAllMember(organisationId, function(err, members) {
        if(err) {
            return;
        } else if (members) {
            members.forEach(member => {
                if(member.parent && member.parent !== undefined) {
                    Socket.findOne({id: new mongoose.mongo.ObjectID(member.parent)}, function (err, docs) {
                        if (docs !== null) {
                            privateEmitMessage(member.parent, title, text, docs.clientId, parameter);
                        }
                    });
                }
            });
        }
    });
}

function privateEmitMessage(id, title, text, clientId, parameter, docs) {
    var message = {};
    message.title = title;
    message.text = text;
    message.parameter = parameter;
    if (socket.sockets.connected[clientId]) {
        socket.to(clientId).emit('message', message);
    } else {
        Socket.findOne({id: id}, function (err, socketdocs) {
            if (socketdocs) {
                socketdocs.messages.push({text: text, title: title, parameter: parameter});
                socketdocs.save(function (err) {});
            }
        });
    }
}

module.exports = {
    sendMessage : publicSendMessage,
    sendMessageToOrganisation: publicSendMessageToOrganisation,
    sendMessageToAllParents: publicSendMessageToAllParents,
    deleteAll: publicRemoveAll,
    all : publicAll
};