const { Post } = require('../models');

// GET /posts - Lista de Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar posts.' });
  }
};

// GET /posts/:id - Leitura de um Post específico
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post não encontrado.' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o post.' });
  }
};

// POST /posts - Criação de Postagens
exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = await Post.create({ title, content, author });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar o post.' });
  }
};

// PUT /posts/:id - Edição de Postagens
exports.updatePost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post não encontrado.' });

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
    res.json({ message: 'Post deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o post.' });
  }
};

// GET /posts/search?q=palavra - Busca de Posts
exports.searchPosts = async (req, res) => {
  try {
    const query = req.query.q;
    const posts = await Post.findAll({
      where: {
        [require('sequelize').Op.or]: [
          { title: { [require('sequelize').Op.iLike]: `%${query}%` } },
          { content: { [require('sequelize').Op.iLike]: `%${query}%` } },
        ],
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar posts.' });
  }
};
