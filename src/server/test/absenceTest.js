/**
 * Created by Hannes
 */

let organisationTest = require('./organisationTest');
let groupTest = require('./groupTest');
let parentTest = require('./parentTest');
let memberTest = require('./memberTest');
let chai = require('chai');
let chaiHttp = require('chai-http');
let test = require('../test');
let server = require('../server');

let should = chai.should();
let app = server.app;

chai.use(chaiHttp);


let absenceId;

let absenceData = {
    memberId: '',
    fromDate: new Date(),
    untilDate: new Date(),
    reason: 'Krankheit',
}



describe('/deleteAll', () => {
    it('it should delete absences', (done) => {
        chai.request(app)
            .get('/api/absences/deleteAll/')
            .set('Authorization', parentTest.getToken())
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
});

describe('/create Absence', () => {

    it('it should create a Absence', (done) => {
        absenceData.memberId = memberTest.getId();
        chai.request(app)
            .post('/api/absences/create/')
            .set('Authorization', parentTest.getToken())
            .set('organisationid', organisationTest.getId())
            .set('parentid', parentTest.getParentId())
            .send(absenceData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success');
                absenceId = res.body.userData;
                done();
            })
    });
});


describe('/get Absence', () => {
    it('it should get a Absence', (done) => {
        chai.request(app)
            .get('/api/absences/' + absenceId)
            .set('Authorization', parentTest.getToken())
            .set('organisationid', organisationTest.getId())
            .set('parentid', parentTest.getParentId())
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
});