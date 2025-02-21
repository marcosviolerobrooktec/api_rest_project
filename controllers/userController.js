const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const {User,Company} = require('../models');

async function register(req, res) {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: 'Usuario registrado', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.findAll({ 
      attributes: { exclude: ['password'] },
      include: {
        model: Company,
        as: 'company',
        attributes: ['name']
      }
     });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] },
      include: {
        model: Company,
        as: 'company',
        attributes: ['name']
      } 
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserByEmail(req, res) {
  const { email } = req.query;

  try {
    const user = await User.findOne({ where: { email: email }, attributes: {exclude: ['password']},
      include: {
        model: Company,
        as: 'company',
        attributes: ['name']
      } 
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
}

async function updateEmail(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.email = email;
    await user.save();

    res.status(200).json({ message: 'Email actualizado correctamente', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateProfilePhoto(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
    }
    const imagePath=path.join('public',req.file.filename)
    user.profilePicture = imagePath;
    await user.save();

    res.status(200).json({ message: 'Foto de perfil actualizada', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = { register, login, getUsers, getUserById, getUserByEmail, updateEmail, deleteUser, updateProfilePhoto};