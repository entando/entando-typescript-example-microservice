import supertest from 'supertest';
import { createMockInstance, activateMock, MockInstance, Mock, MockUser } from 'keycloak-mock';

import app from '../../../src/server';

import {
  CREATE_HELLO_REQUEST,
  CREATE_HELLO_RESPONSE,
  DELETE_HELLO_RESPONSE,
  GET_HELLO_RESPONSE,
  UPDATE_HELLO_REQUEST,
  UPDATE_HELLO_RESPONSE,
} from './__mocks__/hello.mock';

interface KeycloakTestCache {
  keycloak?: MockInstance
  user?: MockUser
  mock?: Mock
  token?: string
}

const global: KeycloakTestCache = { };

beforeAll(async () => {
  const keycloak = await createMockInstance({
    authServerURL: `${process.env.KEYCLOAK_URL}`,
    realm: `${process.env.KEYCLOAK_REALM}`,
    clientID: `${process.env.KEYCLOAK_CLIENT_ID}`,
    clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
  });

  const user = keycloak.database.createUser({
    username: 'test',
    email: 'hello@hello.com',
    credentials: [{
      value: 'mypassword',
    }],
  });

  global.mock = activateMock(keycloak);
  global.token = keycloak.createBearerToken(user.profile.id);
});

afterAll(() => {
  global.mock?.instance.database.clear();
});

describe('User can create a Hello World message', () => {
  test('tests create a hello world message successfully', async () => {
    const response = await supertest(app).post('/api/hello')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(CREATE_HELLO_REQUEST)
      .expect(201);
      
    expect(response.body.payload).toMatchObject(CREATE_HELLO_RESPONSE);
  });

  test('tests create a hello world message without authorization token', async () => {
    const response = await supertest(app).post('/api/hello')
      .send(CREATE_HELLO_REQUEST)
      .expect(403);

    expect(response.body.message).toBe('Access Denied');
  });
});

describe('User can update a Hello World message', () => {
  test('tests update a hello world message successfully', async () => {
    const response = await supertest(app).put('/api/hello/world')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(UPDATE_HELLO_REQUEST)
      .expect(200);
      
    expect(response.body.payload).toMatchObject(UPDATE_HELLO_RESPONSE);
  });

  test('tests update a hello world message without authorization token', async () => {
    const response = await supertest(app).put('/api/hello/world')
      .send(CREATE_HELLO_REQUEST)
      .expect(403);

    expect(response.body.message).toBe('Access Denied');
  });
});

describe('User can retrieve a Hello World message', () => {
  test('tests retrieving a hello world message successfully', async () => {
    const response = await supertest(app).get('/api/hello/world')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .expect(200);
      
    expect(response.body.payload).toMatchObject(GET_HELLO_RESPONSE);
  });

  test('tests retrieving a hello world message without authorization token', async () => {
    const response = await supertest(app).get('/api/hello/world')
      .expect(403);

    expect(response.body.message).toBe('Access Denied');
  });
});

describe('User can delete a Hello World message', () => {
  test('tests deleting a hello world message successfully', async () => {
    const response = await supertest(app).delete('/api/hello/world')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .expect(200);
      
    expect(response.body.payload).toMatchObject(DELETE_HELLO_RESPONSE);
  });

  test('tests deleting a hello world message without authorization token', async () => {
    const response = await supertest(app).delete('/api/hello/world')
      .expect(403);

    expect(response.body.message).toBe('Access Denied');
  });
});
