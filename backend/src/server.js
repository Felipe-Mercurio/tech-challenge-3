require('dotenv').config(); // Carrega o .env

const app = require('./app'); // Importa o express configurado
const { sequelize } = require('./models'); // Conecta ao banco

const PORT = process.env.PORT || 3001;

// Testa conexão com o banco e inicia o servidor
(async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conectado ao banco de dados com sucesso.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('🔴 Falha ao conectar no banco:', error);
    process.exit(1);
  }
})();
