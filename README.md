# Tech Challenge 3 – Aplicação Full Stack de Posts

## 🧩 Visão Geral

Aplicação full stack composta por uma **API RESTful** e uma **interface web** para gerenciamento de posts.  
Usuários podem criar, visualizar, buscar, editar e excluir posts, com autenticação e controle de acesso por níveis:  
**Aluno**, **Professor** e **Admin**.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js + Express
- PostgreSQL + Sequelize (ORM)
- JWT (autenticação)
- Jest + Supertest (testes automatizados)
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- Railway (deploy da API e banco)

### Frontend
- React.js
- React Router DOM
- Context API (autenticação)
- Styled-Components (estilização)
- Vercel (deploy)

---

## ⚙️ Configuração e Execução

### 🔒 Variáveis de Ambiente

#### Backend – `.env`
```env
DB_USER=seu_usuario_postgres
DB_PASS=sua_senha_postgres
DB_NAME=nome_do_banco
DB_HOST=localhost
PORT=3000
JWT_SECRET=sua_chave_secreta
```

### 🔐 Autenticação e Permissões

Autenticação via JWT

Níveis de usuário:

- 🟢 Aluno: apenas visualiza posts

- 🟡 Professor: pode criar, editar e excluir seus próprios posts

- 🔴 Admin: tem controle total sobre todos os posts

### 📌 Funcionalidades

- Login e logout com persistência de sessão

- Listagem de posts com filtro por título ou conteúdo

- Criação, edição e exclusão (com permissões)

- Tela de administração com busca

- Experiência responsiva e intuitiva

- Feedback visual durante carregamento e erros
