import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const post = { title, content, author };
    await createPost(post, user.token);
    navigate('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Post</h2>
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Autor" value={author} onChange={e => setAuthor(e.target.value)} required />
      <textarea placeholder="Conteúdo" value={content} onChange={e => setContent(e.target.value)} required />
      <button type="submit">Criar</button>
    </form>
  );
}
