/**
 * Created by Hannes
 */
let organisationTest = require('./organisationTest');
let chai = require('chai');
let chaiHttp = require('chai-http');
let test = require('../test');
let server = require('../server');

let should = chai.should();
let app = server.app;

chai.use(chaiHttp);

let groupId;


module.exports.getId = function getId() {
    return groupId;
}

let groupData = {
    name: 'unitTestGroup',
    level: 'A'
}

describe('/group', () => {
     it('delete', (done) => {
         chai.request(app)
             .get('/api/groups/deleteAll/')
             .set('Authorization', organisationTest.getToken())
             .send()
             .end((err, res) => {
                 res.should.have.status(200);
                 done();
             })
     });
 });

describe('/create Group', () => {

    it('it should create a Group', (done) => {
        chai.request(app)
            .post('/api/groups/create/')
            .set('Authorization', organisationTest.getToken())
            .set('organisationid', organisationTest.getId())
            .send(groupData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success');
                groupId = res.body.userData;
                done();
            })
    });
});


describe('/get Group', () => {
    it('it should get a group', (done) => {
        chai.request(app)
            .get('/api/groups/' + groupId)
            .set('Authorization', organisationTest.getToken())
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
});
