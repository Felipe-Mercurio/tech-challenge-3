const request = require('supertest');
const app = require('../src/app');
const { Post, sequelize } = require('../src/models');

describe('Posts API', () => {
  beforeAll(async () => {
    // Limpa a tabela antes dos testes
    await Post.destroy({ where: {} });
  });

  describe('POST /posts', () => {
    it('should create a new post successfully', async () => {
      const response = await request(app)
        .post('/posts')
        .send({
          title: 'Test Post',
          content: 'This is a test post content',
          author: 'Test Author',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Post');
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/posts')
        .send({ title: 'Missing content and author' });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 500 if creation fails', async () => {
      jest.spyOn(Post, 'create').mockRejectedValueOnce(new Error('Erro forçado'));
      
      const response = await request(app)
        .post('/posts')
        .send({ title: 'Erro', content: 'Testando', author: 'Teste' });

      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('Erro ao criar o post.');
    });

  });

  describe('GET /posts', () => {
    it('should return all posts', async () => {
      // Cria dois posts para garantir
      await Post.create({ title: 'Post 1', content: 'Content 1', author: 'Author 1' });
      await Post.create({ title: 'Post 2', content: 'Content 2', author: 'Author 2' });

      const response = await request(app).get('/posts');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('GET /posts/:id', () => {
    let post;

    beforeAll(async () => {
      post = await Post.create({ title: 'Single Post', content: 'Some content', author: 'Author' });
    });

    it('should return a post by id', async () => {
      const response = await request(app).get(`/posts/${post.id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', post.id);
      expect(response.body.title).toBe(post.title);
    });

    it('should return 404 if post not found', async () => {
      const response = await request(app).get('/posts/999999');
      expect(response.statusCode).toBe(404);
    });

    it('should return 500 if getAll fails', async () => {
      jest.spyOn(Post, 'findAll').mockRejectedValueOnce(new Error('Erro forçado'));

      const response = await request(app).get('/posts');

      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('Erro ao buscar posts.');
    });

  });

  describe('PUT /posts/:id', () => {
    let post;

    beforeEach(async () => {
      post = await Post.create({ title: 'Update Post', content: 'Old content', author: 'Old Author' });
    });

    it('should update a post successfully', async () => {
      const response = await request(app)
        .put(`/posts/${post.id}`)
        .send({ title: 'Updated Title', content: 'Updated content', author: 'Updated Author' });

      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe('Updated Title');
      expect(response.body.content).toBe('Updated content');
      expect(response.body.author).toBe('Updated Author');
    });

    it('should return 404 if post to update is not found', async () => {
      const response = await request(app)
        .put('/posts/999999')
        .send({ title: 'No Post', content: 'No content', author: 'No author' });

      expect(response.statusCode).toBe(404);
    });


    it('should return 400 if update fails', async () => {
      const post = await Post.create({ title: 'Test', content: 'test', author: 'Autor' });

      jest.spyOn(Post.prototype, 'update').mockRejectedValueOnce(new Error('Erro forçado'));

      const response = await request(app)
        .put(`/posts/${post.id}`)
        .send({ title: 'Updated Title', content: 'Updated content', author: 'Updated Author' });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Erro ao atualizar o post.');
    });

  });

  describe('DELETE /posts/:id', () => {
    let post;

    beforeEach(async () => {
      post = await Post.create({ title: 'Delete Post', content: 'Content to delete', author: 'Author' });
    });

    it('should delete a post successfully', async () => {
      const response = await request(app).delete(`/posts/${post.id}`);
      expect(response.statusCode).toBe(204);

      // Verifica se realmente deletou
      const check = await Post.findByPk(post.id);
      expect(check).toBeNull();
    });

    it('should return 404 if post to delete is not found', async () => {
      const response = await request(app).delete('/posts/999999');
      expect(response.statusCode).toBe(404);
    });

    it('should return 500 if delete fails', async () => {
      const post = await Post.create({ title: 'Test', content: 'test', author: 'Autor' });

      jest.spyOn(Post.prototype, 'destroy').mockRejectedValueOnce(new Error('Erro forçado'));

      const response = await request(app).delete(`/posts/${post.id}`);

      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('Erro ao deletar o post.');
    });
  });
});

afterAll(async () => {
  await sequelize.close();
});
