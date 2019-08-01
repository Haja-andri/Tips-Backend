const request = require('supertest');
const server = require('./server'); 

    // http calls made with supertest return promises, we can use async/await if desired
describe('index route GET/', () => {
    it('return 200 ok', async () => {

        return await 
        request(server).get('/')
        .expect(200)
        .expect('Content-type', /json/)
        .then(res =>{
            expect(res.body.api).toBe('running');
        })
    });
});