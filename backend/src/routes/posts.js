const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Lista todos os posts
router.get('/', postController.getAllPosts);

// Cria um novo post
router.post('/', postController.createPost);

// Busca posts por palavra-chave (query ?q=)
router.get('/search', postController.searchPosts);

// Lê um post específico
router.get('/:id', postController.getPostById);

// Atualiza um post existente
router.put('/:id', postController.updatePost);

// Deleta um post
router.delete('/:id', postController.deletePost);



module.exports = router;
