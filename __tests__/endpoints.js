const request=require('supertest');
const app = require('../app');
const validData=require('./validData.json');
const messages=require('../errorMessage');


describe('GET /',function(){
    it('respond with status code 200',function(done){
        request(app)
            .get('/')
            .expect(200,done)
    });
})

describe('POST /',function(){
    it('Post correct JSON data,respond with status code 200',function(done){
        request(app)
            .post('/')
            .send(validData)
            .set('Content-Type','application/json')
            .expect(200,done)
    });
})
describe('POST /',function(){
    let invalidData='';
    let responseMessage=messages.payloadIsMissing;
    it('Post invalid data, respond with status code 400',function(done){
        request(app)
            .post('/')
            .send(invalidData)
            .set('Content-Type','application/json')
            .expect(responseMessage)
            .expect(400,done)
    });
})

describe('POST /',function(){
    let invalidData={"payload":{}};
    let responseMessage=messages.payloadIsNull;
    it('Given payload key with value of an empty object,respond with status code 400',function(done){
        request(app)
            .post('/')
            .send(invalidData)
            .set('Content-Type','application/json')
            .expect(responseMessage)
            .expect(400,done)
    });
})

describe('POST /',function(){
    let invalidData={"payload":[]};
    let responseMessage=messages.payloadIsNull;
    it('Given payload key with value of an empty array,respond with status code 400',function(done){
        request(app)
            .post('/')
            .send(invalidData)
            .set('Content-Type','application/json')
            .expect(responseMessage)
            .expect(400,done)
    });
})