const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../src/middlewares/authMiddleware');
const app = express();

const requireRole = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    return next();
  } else {
    return res.status(403).json({ error: 'Acesso negado' });
  }
};

app.use(express.json());

// Rota de teste protegida
app.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Acesso autorizado', user: req.user });
});
// Rota protegida só pelo token (authMiddleware)
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Acesso autorizado' });
});

// Rota protegida pelo token + role Admin
app.get('/admin', authMiddleware, requireRole('Admin'), (req, res) => {
  res.json({ message: 'Área de admin' });
});
const JWT_SECRET = process.env.JWT_SECRET || 'seusegredoaqui';

describe('authMiddleware', () => {
  it('deve permitir acesso com token válido', async () => {
    const token = jwt.sign({ id: 1, email: 'test@example.com', level: 'Aluno' }, JWT_SECRET, { expiresIn: '1h' });

    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe('test@example.com');
  });

  it('deve bloquear acesso sem token', async () => {
    const res = await request(app).get('/protected');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token não fornecido.');
  });

  it('deve bloquear acesso com token inválido', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer tokeninvalido');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token inválido.');
  });
});
