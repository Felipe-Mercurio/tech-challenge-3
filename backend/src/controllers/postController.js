const { Post } = require('../models');
const { Op } = require('sequelize');

// GET /posts - Lista de Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os posts.' });
  }
};

// GET /posts/:id - Leitura de um Post específico
exports.getPostById = async (req, res) => {
  const id = req.params.id;

  // Validação simples: id deve ser número inteiro positivo (ajuste se usar UUID)
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post não encontrado.' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o post.' });
  }
};


// POST /posts - Criação de Postagens
exports.createPost = async function createPost(req, res) {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const post = await Post.create({ title, content, author });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o post.' });
  }
};

// PUT /posts/:id - Edição de Postagens
exports.updatePost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if ([title, content, author].some(field => !field || field.trim() === '')) {
      return res.status(400).json({ error: 'Todos os campos (título, conteúdo e autor) são obrigatórios.' });
    }

    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado.' });
    }

    await post.update({ title, content, author });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar o post.' });
  }
};


// DELETE /posts/:id - Exclusão de Postagens
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post não encontrado.' });

    await post.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o post.' });
  }
};

// GET /posts/search?q=palavra - Busca de Posts
exports.searchPosts = async (req, res) => {
  try {
    const query = req.query.q;

    // Se query não existe ou está vazia, retornar todos os posts (ou erro 400, conforme regra de negócio)
    if (!query || query.trim() === '') {
      return res.status(200).json([]); // ou res.status(400) se for obrigatório
    }

    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { content: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os posts.' });
  }
};
