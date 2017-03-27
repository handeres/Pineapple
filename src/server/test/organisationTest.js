/**
 * Created by Hannes
 */
let chai = require('chai');
let chaiHttp = require('chai-http');
let test = require('../test');
let server = require('../server');

let should = chai.should();
let app = server.app;

chai.use(chaiHttp);

let orgId;
let contractId;
let token;
let userId;

module.exports.getId = function getId() {
    return orgId;
}

module.exports.getUserId = function getUserId() {
    return userId;
}

module.exports.getToken= function getToken() {
    return token;
}


let organisationData = {
    name: 'unitTest',
    adress: {
        name: 'Hannes',
        surname: 'Anderes',
        street: 'Henri-Dunant-Strasse',
        number: '5',
        zipCode: '9320',
        city: 'Arbon',
        email: 'handeres@gmx.ch',
        phone: '0000',
        mobile: '1111',
    }
}

describe('/Organisation', () => {
     it('delete', (done) => {
         chai.request(app)
             .get('/api/organisation/deleteAll/')
             .send()
             .end((err, res) => {
                 res.should.have.status(200);
                 done();
             })
     });
 });
/*
 * Test Create Organisation
 */
describe('/create Organisation', () => {
    it('it should create a organisation', (done) => {
        chai.request(app)
            .post('/api/organisation/create/')
            .send(organisationData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success');
                orgId = res.body.userData.id;
                contractId = res.body.userData.uniqueId;
                console.log(orgId);
                done();
            })
    });
});


describe('/Users', () => {
    it('delete', (done) => {
        chai.request(app)
            .get('/api/users/deleteAll/')
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
});
/*
 * Test Register POST
 */
describe('/Register', () => {
    it('it should register a user', (done) => {
        let register = {
            email:  'organisation@unittest.ch',
            contractId: contractId,
            password: '123456',
            password2: '123456'
        }
        chai.request(app)
            .post('/api/users/register/')
            .send(register)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success');
                done();
            })
    });
});
/*
 * Test Authenticate
 */
describe('/authenticate', () => {
    it('it should authenticate a user', (done) => {
        let authenticate = {
            name:  'organisation@unittest.ch',
            password: '123456',
        }
        chai.request(app)
            .post('/api/users/authenticate/')
            .send(authenticate)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('userId');
                res.body.should.have.property('token');
                res.body.should.have.property('firstLogin');
                res.body.should.have.property('organisationId');
                token =  res.body.token;
                userId =  res.body.userId;
                done();
            })
    });
});

/*
 * Test Create Organisation
 */
describe('/get Organisation', () => {
    it('it should get a organisation', (done) => {
        chai.request(app)
            .get('/api/organisation/' + orgId)
            .set('Authorization', token)
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].name.should.be.eql(organisationData.name);
                res.body[0].adress.name.should.be.eql(organisationData.adress.name);
                res.body[0].adress.surname.should.be.eql(organisationData.adress.surname);
                res.body[0].adress.street.should.be.eql(organisationData.adress.street);
                res.body[0].adress.number.should.be.eql(organisationData.adress.number);
                res.body[0].adress.zipCode.should.be.eql(organisationData.adress.zipCode);
                res.body[0].adress.city.should.be.eql(organisationData.adress.city);
                res.body[0].adress.email.should.be.eql(organisationData.adress.email);
                res.body[0].adress.phone.should.be.eql(organisationData.adress.phone);
                //res.body[0].adress.mobile.should.be.eql(organisationData.adress.mobile);
                done();
            })
    });
});


