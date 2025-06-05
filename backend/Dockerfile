# Dockerfile
FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g nodemon

COPY . .

# Adiciona permissão de execução ao script DEPOIS de copiá-lo
RUN chmod +x /app/entrypoint.sh

EXPOSE 3001

# Usa entrypoint para rodar o script
ENTRYPOINT ["/app/entrypoint.sh"]
