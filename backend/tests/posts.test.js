const request = require('supertest');
const app = require('../src/app');

describe('Testes de API /posts', () => {
  it('deve listar todos os posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
  });
});
