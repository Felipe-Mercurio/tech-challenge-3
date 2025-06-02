const express = require('express');
const postsRouter = require('./routes/posts');
const cors = require('cors');

const app = express();
const authRoutes = require('./routes/auth');

app.use(cors({
  origin: ['http://localhost:3000', 'https://tech-challenge-3-topaz.vercel.app'], // front local e deploy
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());


app.use('/auth', authRoutes);
app.use('/posts', postsRouter);

module.exports = app;
