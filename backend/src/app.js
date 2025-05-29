const express = require('express');
const postsRouter = require('./routes/posts');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use('/posts', postsRouter);


app.use(cors({
  origin: ['http://localhost:3000', 'https://tech-challenge-3-topaz.vercel.app'], // front local e deploy
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

module.exports = app;
