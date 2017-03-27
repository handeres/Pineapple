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

let eventId;


let eventData = {
    title: 'Badi',
    description: 'Wir gehen schwimmen in der Badi',
    from: new Date(),
    to: new Date(),
    timeFrom: '08:00',
    timeTo:'16:00',
}


describe('/deleteAll', () => {
    it('it should delete events', (done) => {
        chai.request(app)
            .get('/api/events/deleteAll/')
            .set('Authorization', organisationTest.getToken())
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
});

describe('/create Event', () => {

    it('it should create a Event', (done) => {
        console.log('organisationID: ' + organisationTest.getId());
        chai.request(app)
            .post('/api/events/create/')
            .set('Authorization', parentTest.getToken())
            .set('organisationid', organisationTest.getId())
            .set('userid', organisationTest.getUserId())
            .send(eventData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success');
                eventId = res.body.userData;
                done();
            })
    });
});


describe('/get Absence', () => {
    it('it should get a Absence', (done) => {
        chai.request(app)
            .get('/api/events/' + eventId)
            .set('Authorization', parentTest.getToken())
            .set('organisationid', organisationTest.getId())
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
});