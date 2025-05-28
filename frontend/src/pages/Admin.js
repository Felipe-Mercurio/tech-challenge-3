import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getPosts();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      await deletePost(id, user.token);
      setPosts(posts.filter(p => p.id !== id));
    }
  }

  return (
    <div>
      <h1>Administração de Posts</h1>
      <Link to="/posts/create">Criar novo post</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title} - {post.author}
            {' '}
            <Link to={`/posts/edit/${post.id}`}>Editar</Link>
            {' '}
            <button onClick={() => handleDelete(post.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
