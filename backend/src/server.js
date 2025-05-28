const app = require('./app');
const { sequelize } = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conexão com o banco de dados bem-sucedida.');

    await sequelize.sync(); // Cria tabelas automaticamente (não recomendado em produção sem migrações)
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('🔴 Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();
