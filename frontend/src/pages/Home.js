import React, { useState, useCallback } from 'react';
import LoadingWrapper from '../components/LoadingWrapper';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    const res = await fetch('https://seu-backend.railway.app/posts');
    if (!res.ok) throw new Error('Erro ao buscar posts');
    const data = await res.json();
    setPosts(data);
  }, []);

  return (
    <LoadingWrapper fetchData={fetchPosts}>
      <div>
        <h1>Posts</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <strong>{post.title}</strong> — {post.author}
            </li>
          ))}
        </ul>
      </div>
    </LoadingWrapper>
  );
};

export default Home;
