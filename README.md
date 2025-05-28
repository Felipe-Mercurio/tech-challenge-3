# Tech Challenge 3 - API de Posts

## Visão Geral

API RESTful para gerenciamento de posts, permitindo criar, consultar, atualizar, deletar e buscar posts por título ou conteúdo.

Desenvolvida com Node.js, Express, Sequelize, e banco de dados PostgreSQL.

Deploy realizado na Railway.

---

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL (banco de dados)
- Jest + Supertest (testes automatizados)
- Docker e Docker Compose (containerização)
- GitHub Actions (CI/CD)
- Railway (deploy do banco de dados e da API)

---

## Configuração e Execução Local

### Pré-requisitos

- Node.js instalado
- Docker e Docker Compose instalados
- Conta no Railway (para deploy remoto, opcional)

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```env
DB_USER=seu_usuario_postgres
DB_PASS=sua_senha_postgres
DB_NAME=nome_do_banco
DB_HOST=localhost
PORT=3000
```

### Rodando com Docker

docker-compose up --build

### Rodando localmente sem Docker

npm install
npm start

### Rodando testes automatizados

npm test
