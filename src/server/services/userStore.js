/**
 * Created by Hannes on 15.01.2017.
 */
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var crypto = require('../util/cryptoUtil');
var organisation = require('./organisationStore');
var organisationLink = require('./organisationLinkStore');
var role = require('./roleStore');
var member = require('./memberStore');
var response = require('../util/responseUtility');

//Use default promise
mongoose.Promise = global.Promise;

var RoleSchema = mongoose.Schema({
    role:  {type: String, required: true},
});

var UserSchema = mongoose.Schema({
    name:  {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    contractId: {type: String},
    id: {type: String},
    organisationId: {type: String},
    firstLogin: {type: Boolean, required: true, default:true}
});

var User = mongoose.model('UserModel', UserSchema);

var encrpytUser = function(user) {
    if (user.isModified('password')) {
        encryptedValue = crypto.encrypt(user.password);
        user.password = encryptedValue;
    }
}

function publicRegister(email, contractId, password, password2, callback) {
    User.find({name : email}, function(err, docs){
        if(docs) {
            if (docs.length) {
                callback(err, { success: false, message: 'Diese E-Mail Adresse ist bereits registriert!'});
                return;
            }
        }
        privateGetRole(contractId, function(err, roleDocs) {
            if (err || (false === roleDocs.success)) {
                callback(err, roleDocs);
            } else {
                privateCreateUser(email, password, roleDocs.userRole, contractId, roleDocs.id, roleDocs.organisationId, function (err, userDoc) {
                    callback(err, userDoc);
                });
            }
        });
    });

}

function publicHasUser(email, callback) {
    User.find({name : email}, function(err, docs){
        if(docs) {
            if (docs.length) {
                callback(err, { success: true, message: 'Diese E-Mail Adresse ist bereits registriert!'});
                return;
            } else {
                callback(err, { success: false, message: 'E-Mail Adresse ist nicht bekannt!'});
            }
        } else {
            callback(err, { success: false, message: 'E-Mail Adresse ist nicht bekannt!'});
        }
    });
}

function privateCreateUser(email, password, userRole, contractId, id, organisationId, callback) {
    let firstLogin = true
    if (userRole === role.ORGANISATION_ROLE) {
        firstLogin = false;
    }
    var user = new User({name: email,
        password: password,
        role: userRole,
        contractId: contractId,
        id:id,
        organisationId: organisationId,
        firstLogin: firstLogin});
    encrpytUser(user);
    user.save(function (err, user) {
        if (err) {
            callback(err, { success: false });
        } else {
            callback(err, { success: true });
        }
    });
}

function privateGetRole(contractId, callback) {
    var userRole;
    organisation.getByContractId(contractId, function(err, orgDocs) {
        if (orgDocs) {
            userRole = role.ORGANISATION_ROLE;
            callback(err, { success: true, userRole: userRole, organisationId:orgDocs._id, parentId: "", id:orgDocs._id });
        } else {
            member.getByContractId(contractId, function(err, memberDocs) {
                if (memberDocs && (err === null)) {
                    userRole = role.PARENT_ROLE;
                    callback(err, { success: true, userRole: userRole, organisationId:memberDocs.organisation, parentId: memberDocs.parent, id:memberDocs.parent});
                } else {
                    callback(err, { success: false, message: 'Keine gültige Vertrags ID'});
                }
            });
        }
    });
}

function publicUse(req, res, callback) {
    // check header or url parameters or post parameters for token
    var token = req.headers.authorization || req.query.token || req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'dfdfgdfhgfjhgj', function (err, decoded) {
            if (err) {
                callback(err, {success: false, message: 'Interner Fehler beim authentifizieren aufgetreteten!'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                callback(err, {success: true, message: 'Authenticate token gültig!'});
            }
        });
    } else {
        // if there is no token
        // return an error
        callback(null, {success: false, message: 'Kein token vorhanden!'});
    }
}

function publicFirstLoginDone(uid, id, callback) {
    if (id === undefined) {
        User.findOneAndUpdate({_id: new mongoose.mongo.ObjectID(uid)}, {$set: {firstLogin: false}}, function (err, docs) {
            response.default(err, callback);
        });
    } else {
        User.findOneAndUpdate({_id: new mongoose.mongo.ObjectID(uid)}, {$set: {firstLogin: false, id: id}}, function (err, docs) {
            response.default(err, callback);
        });
    }
}

function publicAuthenticate(name, password, callback) {
    /* Wegen NoSQL injection. Damit kein Code ausgeführt werden kann */
    if ((typeof(name)=="string") &&
        (typeof(password)=="string")) {
    } else {
        callback(err, {success: false, message: 'Interner Fehler ist aufgetretten!'});
    }
    // find the user
    User.findOne({ name: name
    }, function(err, user) {
        if (err) {
            callback(err, {success: false, message: 'Interner Fehler ist aufgetretten!'});
        }
        if (!user) {
            callback(err, {success: false, message: 'E-Mail Adresse ist nicht bekannt!'});
        } else if (user) {

            if (user.password != crypto.encrypt(password)) {
                callback(err, {success: false, message: 'Passwort ist nicht korrekt!'});
            } else {
                var token = jwt.sign(user, 'dfdfgdfhgfjhgj', {
                    expiresIn: 36000000 /* ms */
                });
                privateGetAuthenticateData(user, token, function(err, authDocs) {
                    if (err) {
                        callback(err, {success: false, message: 'Interner Fehler ist aufgetretten!'});
                    } else {
                        callback(err, authDocs);
                    }
                });
            }
        }
    });
}

function privateGetAuthenticateData(user, token, callback) {
    if (user.role === role.ORGANISATION_ROLE) {
        organisation.get(user.organisationId, function(err, orgDocs) {
            if (err) {
                callback(err, {success: false, message: 'Interner Fehler ist aufgetretten!'});
            }
            if (orgDocs) {
                privateAuthenticateCallback(err, token, user, "", orgDocs[0]._id, callback);
            }
        });
    } else if (user.role === role.PARENT_ROLE) {
        if (user.id) {
            organisationLink.getParent(user.organisationId, user.id, function (err, parentDocs) {
                if (err) {
                    callback(err, {success: false, message: 'Interner Fehler ist aufgetretten!'});
                }
                if (parentDocs) {
                    privateAuthenticateCallback(err, token, user, parentDocs._id, user.organisationId, callback)
                }
            });
        }  else { // Wenn noch kein USer besteht über contract Id anmelden
            privateGetRole(user.contractId, function(err, roleDocs) {
                privateAuthenticateCallback(err, token, user, roleDocs.id, user.organisationId, function (err, authDoc) {
                    if (roleDocs.id) {
                        User.findOneAndUpdate({_id: new mongoose.mongo.ObjectID(user._id)}, {id: roleDocs.id}, function (err, docs) {
                            callback(err, authDoc);
                        });
                    } else {
                        callback(err, authDoc);
                    }
                });
            });
        }
    }
}

function privateAuthenticateCallback(err, token, user, parentId, organisationId, callback) {
    console.log('privateAuthenticateCallback');
    callback(err, {success: true,
        userId: user._id,
        id: user.id,
        token: token,
        role: user.role,
        firstLogin: user.firstLogin,
        contractId: user.contractId,
        parentId: parentId,
        organisationId: organisationId});
}

function publicAll(callback) {
    User.find({},function(err, docs){
        callback(err, docs);
    });
}

function publicDeleteAll(callback) {
    User.remove({},function(err, docs){
        callback(err, docs);
    });
}

module.exports = {
    authenticate : publicAuthenticate,
    hasUser: publicHasUser,
    register: publicRegister,
    use: publicUse,
    all: publicAll,
    deleteAll :publicDeleteAll,
    firstLoginDone: publicFirstLoginDone
};

