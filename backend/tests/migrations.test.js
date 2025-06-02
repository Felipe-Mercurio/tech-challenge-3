const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize, Sequelize } = require('../src/models');

describe('Migrations', () => {
  let umzug;

  beforeAll(() => {
    umzug = new Umzug({
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
  });

  it('deve aplicar todas as migrations sem erro', async () => {
    const executed = await umzug.executed();
    console.log('Migrations executadas:', executed.map(m => m.name));
    expect(executed.length).toBeGreaterThan(0);
  });
});
