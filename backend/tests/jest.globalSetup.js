const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize, Sequelize } = require('../src/models'); // Ajuste o caminho se necessário

module.exports = async () => {
  console.log('⏳ Rodando migrations antes dos testes...');

  const umzug = new Umzug({
    migrations: {
      glob: 'src/database/migrations/*.js',
      resolve: ({ name, path }) => {
        const migration = require(path);
        return {
          name,
          up: async () => migration.up(sequelize.getQueryInterface(), Sequelize),
          down: async () => migration.down(sequelize.getQueryInterface(), Sequelize),
        };
      },
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  await umzug.up();
  console.log('✅ Migrations aplicadas.');
};
