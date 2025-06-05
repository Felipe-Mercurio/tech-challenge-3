import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getPostById, updatePost } from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

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
  position: relative;
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

// Modal styles (igual do PostDetail)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 6px 30px rgba(0,0,0,0.2);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const ModalMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #333;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        const data = await getPostById(id);
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      } catch (error) {
        console.error('Erro ao carregar post:', error);
      }
    }
    loadPost();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmSave = async () => {
    try {
      const post = { title, content, author };
      await updatePost(id, post, user.token);
      setShowConfirmModal(false);
      navigate('/');
    } catch (error) {
      alert('Erro ao salvar o post.');
      console.error(error);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Editar Post</Title>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <Label htmlFor="author">Autor</Label>
          <Input
            id="author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />

          <Label htmlFor="content">Conteúdo</Label>
          <TextArea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />

          <ButtonGroup>
            <Button type="submit">Salvar</Button>
          </ButtonGroup>
        </form>
      </Card>

      {showConfirmModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalMessage>Tem certeza que deseja salvar as alterações?</ModalMessage>
            <ModalButtonGroup>
              <Button onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
              <Button onClick={confirmSave}>Confirmar</Button>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
