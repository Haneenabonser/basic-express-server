'use strict';

const supertest = require('supertest');
const server = require('../src/server');
const request = supertest(server.app);


describe('Test Server Routes', ()=>{
  it('Bad route', async ()=>{
    const response = await request.get('/haneeeen');
    expect(response.status).toEqual(404);
  });
  it('Handles bad method', async ()=>{
    const response = await request.put('/person?name=haneen');
    expect(response.status).toEqual(404);
  });
  it('No name in query string', async ()=>{
    const response = await request.get('/person?name=');
    expect(response.status).toEqual(500);
  });
  it('Correct name in query string', async ()=>{
    const response = await request.get('/person?name=haneen');
    expect(response.status).toEqual(200);
  });
  it('Correct object output when given name in query string', async ()=>{
    const response = await request.get('/person?name=Alaa');
    expect(response.body).toEqual({ name: 'Alaa' });
  });
});