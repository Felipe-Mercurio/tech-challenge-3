# Etapa 1: Build da aplicação
FROM node:24-alpine AS builder

WORKDIR /app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Copia todo o código para dentro do container
COPY . .

RUN npm install
# Defina o argumento para a variável de ambiente que o React usará no build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Executa o build (gera os arquivos estáticos em /app/build)
RUN npm run build

# Etapa 2: Servir a aplicação com nginx
FROM nginx:alpine

# Copia os arquivos estáticos da build para o diretório do nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Exponha a porta padrão do nginx
EXPOSE 3000

# Comando padrão para rodar o nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
