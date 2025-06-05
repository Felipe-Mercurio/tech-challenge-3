import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // Importe styled-components
import { login } from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

// Reutilizando e adaptando os estilos do PostDetail
const Container = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Centraliza verticalmente o formulário */
  padding: 3rem 1rem;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 2.5rem 3rem;
  border-radius: 12px;
  max-width: 450px; /* Ajuste o tamanho máximo do card de login */
  width: 100%;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center; /* Centraliza o conteúdo do card */
`;

const Title = styled.h2` /* Alterado para h2 para o título do formulário */
  margin-bottom: 2rem; /* Aumentado um pouco o espaçamento */
  color: #333;
`;

const Input = styled.input`
  width: calc(100% - 2rem); /* Considera o padding */
  padding: 0.8rem 1rem;
  margin-bottom: 1.5rem; /* Espaçamento entre os inputs */
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #3498db;
  border: none;
  padding: 0.8rem 1.8rem; /* Ajustado o padding do botão */
  color: white;
  font-weight: 600;
  border-radius: 8px;
  font-size: 1.1rem; /* Aumentado um pouco o tamanho da fonte */
  transition: background-color 0.3s ease;
  width: 100%; /* Botão ocupa a largura total do formulário */

  &:hover {
    background-color: #2980b9;
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login({ login: email, password });
      if (data.token) {
        loginContext(data.token, data.user);
        navigate('/');
      } else {
        alert('Falha no login. Verifique suas credenciais.'); // Mensagem mais clara
      }
    } catch (error) { // Capture o erro para debug
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
  }

  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Nome ou Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Entrar</Button>

          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            Ainda não tem conta? <Link to="/register">Registre-se</Link>
          </p>

        </form>
      </Card>
    </Container>
  );
}