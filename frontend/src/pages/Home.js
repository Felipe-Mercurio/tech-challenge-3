import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, searchPosts } from '../api/api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      if (query.trim() === '') {
        const data = await getPosts();
        setPosts(data);
      } else {
        const data = await searchPosts(query);
        setPosts(data);
      }
    }
    fetchPosts();
  }, [query]);

  return (
    <div>
      <h1>Lista de Posts</h1>
      <input
        type="text"
        placeholder="Buscar posts..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h3>{post.title}</h3>
              <p>Autor: {post.author}</p>
              <p>{post.content.substring(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
