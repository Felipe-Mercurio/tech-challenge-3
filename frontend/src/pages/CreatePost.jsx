import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createPost } from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

// --- Estilos reutilizados do EditPost.jsx ---
const Container = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 1rem;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 2.5rem 3rem;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #3498db;
  border: none;
  padding: 0.6rem 1.8rem;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;
// ---------------------------------------------------

export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const post = { title, content, author };
      await createPost(post, user.token);
      navigate('/');
    } catch (err) {
      console.error('Erro ao criar post:', err);
      alert('Não foi possível criar o post. Verifique os dados e tente novamente.');
    }
  };

  return (
    <Container>
      <Card>
        <Title>Criar Novo Post</Title>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Label htmlFor="author">Autor</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <Label htmlFor="content">Conteúdo</Label>
          <TextArea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <ButtonGroup>
            <Button type="submit">Criar</Button>
          </ButtonGroup>
        </form>
      </Card>
    </Container>
  );
}
