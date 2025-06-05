import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import LoadingWrapper from '../components/LoadingWrapper';

const Container = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const PostTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
`;

const PostAuthor = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
  color: #fff;

  &:first-child {
    background-color: #3498db;
  }

  &:first-child:hover {
    background-color: #2980b9;
  }

  &:last-child {
    background-color: #e74c3c;
  }

  &:last-child:hover {
    background-color: #c0392b;
  }
`;

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(''); // 👈 controle do input
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      try {
        await deletePost(id, user.token);
        setPosts((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Erro ao deletar:', error);
        alert('Erro ao excluir o post. Tente novamente.');
      }
    }
  }

  // 👇 Filtragem com base no título ou autor
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <LoadingWrapper fetchData={fetchPosts}>
      <Container>
        <Title>Administração de Posts</Title>

        <SearchInput
          type="text"
          placeholder="Buscar por título ou autor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <PostsGrid>
          {filteredPosts.map((post) => (
            <PostCard key={post.id}>
              <PostTitle>{post.title}</PostTitle>
              <PostAuthor>Autor: {post.author}</PostAuthor>
              <Actions>
                <Button onClick={() => navigate(`/posts/edit/${post.id}`)}>Editar</Button>
                <Button onClick={() => handleDelete(post.id)}>Excluir</Button>
              </Actions>
            </PostCard>
          ))}
        </PostsGrid>
      </Container>
    </LoadingWrapper>
  );
}
