/**
 * Created by Hannes
 */
let chai = require('chai');
let chaiHttp = require('chai-http');
let test = require('../test');
let server = require('../server');
let organisationTest = require('./organisationTest');
let memberTest = require('./memberTest');

let should = chai.should();
let app = server.app;

chai.use(chaiHttp);

let parentId;
let token;


module.exports.getParentId = function getParentId() {
    return parentId;
}

module.exports.getToken = function getToken() {
    return token;
}

let parentData = {
    contractId: memberTest.getContractId(),
    adress: {
        name: 'Franziska',
        surname: 'Lhomme',
        street: 'Henri-Dunant-Strasse',
        number: '5',
        zipCode: '9320',
        city: 'Arbon',
        email: 'handeres@gmx.ch',
        phone: '0000',
        mobile: '1111',
    }
}

describe('/deleteAll', () => {
    it('it should delete all parents', (done) => {
        chai.request(app)
            .get('/api/parents/deleteAll/')
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
});


describe('/create Parent', () => {
    it('it should create a Parent', (done) => {
        parentData.contractId = memberTest.getContractId();
        chai.request(app)
            .post('/api/parents/create/')
            .set('userid', organisationTest.getUserId())
            .send(parentData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success');
                parentId = res.body.parentId;
                done();
            })
    });
});


/*
 * Test Register POST
 */
describe('/Register', () => {
    it('it should register a parent user', (done) => {
        let register = {
            email:  'parent@unittest.ch',
            contractId: memberTest.getContractId(),
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
            name:  'parent@unittest.ch',
            password: '123456',
        }
        chai.request(app)
            .post('/api/users/authenticate/')
            .send(authenticate)
            .set('userid', organisationTest.getUserId())
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('userId');
                res.body.should.have.property('token');
                res.body.should.have.property('firstLogin');
                res.body.should.have.property('organisationId');
                token =  res.body.token;
                done();
            })
    });
});

/*
 * Test Create Organisation
 */
describe('/get Parent', () => {
    it('it should get a Parent', (done) => {
        chai.request(app)
            .get('/api/parents/' + parentId)
            .set('Authorization', token)
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].adress.name.should.be.eql(parentData.adress.name);
                res.body[0].adress.surname.should.be.eql(parentData.adress.surname);
                res.body[0].adress.street.should.be.eql(parentData.adress.street);
                res.body[0].adress.number.should.be.eql(parentData.adress.number);
                res.body[0].adress.zipCode.should.be.eql(parentData.adress.zipCode);
                res.body[0].adress.city.should.be.eql(parentData.adress.city);
                res.body[0].adress.email.should.be.eql(parentData.adress.email);
                res.body[0].adress.phone.should.be.eql(parentData.adress.phone);
                //res.body[0].adress.mobile.should.be.eql(organisationData.adress.mobile);
                done();
            })
    });
});


