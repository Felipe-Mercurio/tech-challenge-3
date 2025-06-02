import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LoadingWrapper from '../components/LoadingWrapper';
import API_URL from '../api/api.js';

const Container = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  width: 300px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 2rem;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const PostCard = styled.div`
  padding: 1rem;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const PostTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const PostAuthor = styled.p`
  color: #666;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Busca os posts sempre que o query muda (reativo)
  const fetchPosts = useCallback(async () => {
    const endpoint = query
      ? `${API_URL}/posts/search?q=${encodeURIComponent(query)}`
      : `${API_URL}/posts`;


    const res = await fetch(endpoint);
    if (!res.ok) throw new Error('Erro ao buscar posts');
    const data = await res.json();
    setPosts(data);
  }, [query]);

  // Recarrega posts sempre que query muda
  useEffect(() => {
    fetchPosts().catch(console.error);
  }, [fetchPosts]);

  const handleSearchChange = (e) => setQuery(e.target.value);

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <LoadingWrapper fetchData={fetchPosts}>
      <Container>
        <Title>Posts</Title>

        <SearchInput
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Filtrar por título ou autor..."
        />

        <PostsGrid>
          {posts.map((post) => (
            <PostCard key={post.id} onClick={() => handlePostClick(post.id)}>
              <PostTitle>{post.title}</PostTitle>
              <PostAuthor>Autor: {post.author}</PostAuthor>
            </PostCard>
          ))}
        </PostsGrid>
      </Container>
    </LoadingWrapper>
  );
};

export default Home;
