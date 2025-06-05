#!/bin/sh

# Aguarda o banco ficar disponível
echo "⏳ Aguardando o banco de dados ficar pronto..."
until npx sequelize-cli db:migrate:status > /dev/null 2>&1
do
  sleep 2
done

# Executa as migrations
echo "📦 Rodando as migrations..."
npx sequelize-cli db:migrate

# (Opcional) Executa os seeders
# echo "🌱 Rodando os seeders..."
# npx sequelize-cli db:seed:all

# Inicia a aplicação
echo "🚀 Iniciando o servidor..."
exec npm start
