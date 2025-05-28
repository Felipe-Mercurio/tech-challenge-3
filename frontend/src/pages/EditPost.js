import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    async function loadPost() {
      const data = await getPostById(id);
      setTitle(data.title);
      setContent(data.content);
      setAuthor(data.author);
    }
    loadPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const post = { title, content, author };
    await updatePost(id, post, user.token);
    navigate('/admin');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Post</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} required />
      <input value={author} onChange={e => setAuthor(e.target.value)} required />
      <textarea value={content} onChange={e => setContent(e.target.value)} required />
      <button type="submit">Salvar</button>
    </form>
  );
}
