import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getPostById, deletePost } from '../api/api';

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

const Title = styled.h1`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Label = styled.p`
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Content = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  white-space: pre-wrap;
  color: #444;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2.5rem;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: ${(props) => (props.danger ? '#e74c3c' : '#3498db')};
  border: none;
  padding: 0.6rem 1.4rem;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.danger ? '#c0392b' : '#2980b9')};
  }
`;

// Modal styles
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

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error('Erro ao carregar post:', error);
      }
    }
    fetchPost();
  }, [id]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePost(id);
      navigate('/');
    } catch (error) {
      alert('Erro ao deletar o post.');
      console.error(error);
    }
  };

  if (!post) return <p>Carregando...</p>;

  return (
    <Container>
      <Card>
        <Title>{post.title}</Title>
        <Label>Autor:</Label>
        <Content>{post.author}</Content>

        <Label>Conteúdo:</Label>
        <Content>{post.content}</Content>

        <ButtonGroup>
          <Button onClick={() => navigate(`/posts/${id}/edit`)}>Editar</Button>
          <Button danger onClick={handleDeleteClick}>Deletar</Button>
        </ButtonGroup>
      </Card>

      {showDeleteModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalMessage>Tem certeza que deseja deletar este post?</ModalMessage>
            <ModalButtonGroup>
              <Button onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
              <Button danger onClick={confirmDelete}>Confirmar</Button>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
