import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link> |{' '}
      {user ? (
        <>
          <Link to="/posts/create">Criar Post</Link> |{' '}
          <Link to="/admin">Admin</Link> |{' '}
          <button onClick={handleLogout}>Sair</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
}
