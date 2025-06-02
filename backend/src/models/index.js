const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const definePost = require('./post');
const Post = definePost(sequelize);

const defineUser = require('./user');
const User = defineUser(sequelize);

module.exports = {
  sequelize,
  Sequelize,
  Post,
  User,
};
