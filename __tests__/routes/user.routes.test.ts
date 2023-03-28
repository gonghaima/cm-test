import request from 'supertest';

import app from '../../src/app';
import { userData, expectedResult } from '../../__mock__/index';

describe('User routes', () => {
  test('Post a user data', async () => {
    const res = await await request(app).post('/user').send(userData);
    expect(res.body).toEqual(expectedResult);
  });
});
