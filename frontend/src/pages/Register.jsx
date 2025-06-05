import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
  text-align: center;
`;

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    level: '',
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('As senhas não coincidem');
    }

    if (!form.level) {
      return setError('Selecione um nível de acesso');
    }

    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao registrar');
    }
  };

  return (
    <Container>
      <Title>Criar Conta</Title>
      <form onSubmit={handleSubmit}>
        <Label>Nome</Label>
        <Input type="text" name="name" value={form.name} onChange={handleChange} required />

        <Label>Email</Label>
        <Input type="email" name="email" value={form.email} onChange={handleChange} required />

        <Label>Senha</Label>
        <Input type="password" name="password" value={form.password} onChange={handleChange} required />

        <Label>Confirmar Senha</Label>
        <Input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />

        <Label>Nível de Acesso</Label>
        <Select name="level" value={form.level} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="Aluno">Aluno</option>
          <option value="Professor">Professor</option>
          <option value="Admin">Admin</option>
        </Select>

        <Button type="submit">Registrar</Button>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </Container>
  );
}
