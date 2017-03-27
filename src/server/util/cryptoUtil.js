const crypto = require('crypto')
,
    algorithm = 'aes-256-ctr',
    password = 'arbon9320nicolas2011';

function publicEncrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

function publicDecrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

module.exports = {encrypt : publicEncrypt, decrypt: publicDecrypt};