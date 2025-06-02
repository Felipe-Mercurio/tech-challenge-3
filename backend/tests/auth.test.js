const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const { User } = require('../src/models');

describe('Auth API', () => {
  const userData = {
    name: 'john2',
    email: 'john2@example.com',
    password: '123456',
    level: 'Aluno'
  };

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash('secure123', 10);
    await User.create({
      name: 'john_doe',
      email: 'john@example.com',
      password: hashedPassword,
      level: 'Aluno'
    });
  });

  describe('POST /auth/register', () => {
    it('deve registrar um usuário com sucesso', async () => {
      const res = await request(app).post('/auth/register').send(userData);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toMatchObject({
        name: userData.name,
        email: userData.email,
        level: userData.level,
      });
    });

    it('deve retornar erro se campos obrigatórios faltarem', async () => {
      const res = await request(app).post('/auth/register').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('deve retornar erro 409 se email já estiver registrado', async () => {
      // Usuário criado no beforeAll com email 'john@example.com'
      const res = await request(app).post('/auth/register').send({
        name: 'anyname',
        email: 'john@example.com', // email já existente
        password: '123456',
        level: 'Aluno'
      });
      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty('error', 'Email já registrado');
    });

    it('deve retornar erro 500 se ocorrer falha inesperada no registro', async () => {
      const originalFindOne = User.findOne;
      User.findOne = jest.fn().mockImplementation(() => {
        throw new Error('Erro simulado');
      });

      const res = await request(app).post('/auth/register').send({
        name: 'testuser',
        email: 'test@example.com',
        password: '123456',
        level: 'Aluno'
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('error', 'Erro interno ao registrar usuário');

      User.findOne = originalFindOne;
    });
  });

  describe('POST /auth/login', () => {
    it('deve logar com sucesso usando email', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          login: 'john_doe',
          password: 'secure123'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('deve logar com sucesso usando name', async () => {
      const res = await request(app).post('/auth/login').send({
        login: 'john_doe',
        password: 'secure123'
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('deve retornar erro para senha inválida', async () => {
      const res = await request(app).post('/auth/login').send({
        login: 'john@example.com',
        password: 'WrongPass'
      });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error');
    });

    it('deve retornar erro se usuário não existir', async () => {
      const res = await request(app).post('/auth/login').send({
        login: 'NULL',
        password: userData.password
      });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('deve retornar erro se campos faltarem', async () => {
      const res = await request(app).post('/auth/login').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('deve retornar erro 500 se ocorrer falha inesperada no login', async () => {
      const originalFindOne = User.findOne;

      // Simula uma rejeição da promise (erro async)
      User.findOne = jest.fn().mockRejectedValue(new Error('Erro simulado'));

      const res = await request(app).post('/auth/login').send({
        login: userData.email,
        password: userData.password,
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('error', 'Erro interno ao logar');

      // Restaura o método original
      User.findOne = originalFindOne;
    });
  });

  it('não deve retornar a senha no JSON', async () => {
    const hashedPassword = await bcrypt.hash('123456', 10);
    const user = await User.create({
      name: 'testuser',
      email: 'testuser@example.com',
      password: hashedPassword,
      level: 'Aluno'
    });

    const json = user.toJSON();

    expect(json).not.toHaveProperty('password');
    expect(json.name).toBe('testuser');
    expect(json.email).toBe('testuser@example.com');
  });

});
