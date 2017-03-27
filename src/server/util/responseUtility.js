/**
 * Created by Hannes on 10.02.2017.
 */
function publicResponse(err, callback, data) {
    if (err) {
        callback(err, { success: false, message: "Leider ist ein interner Fehler aufgetreten!" });
    } else {
        callback(err, { success: true, userData: data });
    }
}

module.exports = {default : publicResponse};