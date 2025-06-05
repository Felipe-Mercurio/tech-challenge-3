import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  background-color: #3498db;
  padding: 1rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

const NavArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const UserInfo = styled.span`
  font-size: 0.95rem;
  font-weight: 400;
  color: #ecf0f1;
`;

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <HeaderContainer>
      <Logo to="/">MeuBlog</Logo>
      <NavArea>
        {user && <UserInfo>Olá, {user.name}</UserInfo>}
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          {user ? (
            <>
              <NavLink to="/posts/create">Criar Post</NavLink>
              <NavLink to="/admin">Admin</NavLink>
              <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </NavLinks>
      </NavArea>
    </HeaderContainer>
  );
}
