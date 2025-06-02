const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');

const JWT_SECRET = process.env.JWT_SECRET;

// POST /auth/login
exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ email: login }, { name: login }],
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(password, user.password);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, level: user.level },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao logar' });
  }
};

// POST /auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, level } = req.body;

    if (!name || !email || !password || !level) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email já registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      level,
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      level: user.level,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao registrar usuário' });
  }
};
