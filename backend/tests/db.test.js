const { sequelize } = require('../src/models');

describe('Conexão com PostgreSQL via Sequelize', () => {
  test('Deve conectar e retornar tabelas do schema público', async () => {
    const [results] = await sequelize.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);

    expect(Array.isArray(results)).toBe(true);
  });
});
