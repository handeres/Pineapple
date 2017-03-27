/**
 * Created by Hannes
 */
let organisationTest = require('./organisationTest');
let groupTest = require('./groupTest');
let chai = require('chai');
let chaiHttp = require('chai-http');
let test = require('../test');
let server = require('../server');

let should = chai.should();
let app = server.app;

chai.use(chaiHttp);

let memberId;
let contractId;

module.exports.getId = function getId() {
    return memberId;
}

module.exports.getContractId = function getContractId() {
    return contractId;
}

let memberData = {
    name: 'Nicolas',
    surname: 'Anderes',
    callingName: 'Nico',
    birthday: '08.02.2011',
    groupId: groupTest.getId()
}


describe('/member', () => {
    it('member', (done) => {
        chai.request(app)
            .get('/api/members/deleteAll/')
            .set('Authorization', organisationTest.getToken())
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
});

describe('/create Member', () => {
    it('it should create a Member', (done) => {
        chai.request(app)
            .post('/api/members/create/')
            .set('Authorization', organisationTest.getToken())
            .set('organisationid', organisationTest.getId())
            .send(memberData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success');
                memberId = res.body.userData.id;
                contractId = res.body.userData.contractId;
                done();
            })
    });
});


describe('/get Member', () => {
    it('it should get a Member', (done) => {
        chai.request(app)
            .get('/api/members/' + memberId)
            .set('Authorization', organisationTest.getToken())
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
});

