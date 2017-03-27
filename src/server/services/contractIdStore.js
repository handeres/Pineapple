/**
 * Created by Hannes on 14.02.2017.
 */

var mongoose = require('mongoose');
var response = require('../util/responseUtility')

//Use default promise
mongoose.Promise = global.Promise;


var ContractIdSchema = mongoose.Schema({
    contractId : {type: String, required: true },
    role: {type: Date, default:Date.now, required: true },
    createdDate: {type: Date, default:Date.now},
});

var Absence = mongoose.model('ContractIDModel', ContractIdSchema);