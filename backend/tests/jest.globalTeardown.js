const path = require('path');
const { sequelize } = require(path.resolve(__dirname, '../src/models'));

module.exports = async () => {
  console.log('🔒 Fechando conexão com banco (globalTeardown)...');
  await sequelize.close();
};
