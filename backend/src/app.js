const express = require('express');
const postsRouter = require('./routes/posts');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://tech-challenge-3-topaz.vercel.app'], // front local e deploy
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

// ✅ CORS já ativado aqui antes de usar as rotas
app.use('/posts', postsRouter);

module.exports = app;
