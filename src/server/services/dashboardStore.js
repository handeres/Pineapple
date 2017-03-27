/**
 * Created by Hannes on 17.03.2017.
 */




function publicByOrganisationMember(organisationId, callback) {
    Organisationlink.find({organisationId : organisationId}).populate('groupId').exec(function(err, docs){


    });
}