const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Lista todos os posts
router.get('/', postController.getAllPosts);

// Lê um post específico
router.get('/:id', postController.getPostById);

// Cria um novo post
router.post('/', postController.createPost);

// Atualiza um post existente
router.put('/:id', postController.updatePost);

// Deleta um post
router.delete('/:id', postController.deletePost);

// Busca posts por palavra-chave (query ?q=)
router.get('/search', postController.searchPosts);

module.exports = router;
