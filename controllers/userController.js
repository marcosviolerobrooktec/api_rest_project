const bcrypt = require('bcryptjs');
const path = require('path');
const {Op} = require('sequelize');
const {User, Company, Project} = require('../models');

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

async function getUsers(req, res) {
  try {
    const { name, email, companyIds, projectId } = req.query;

    const where = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    if (email) {
      where.email = { [Op.iLike]: `%${email}%` }; 
    }

    if (companyIds) {
      where.companyId = { [Op.in]: companyIds }; 
    }

    if(projectId){
      where['$projects.id$'] = projectId;
    }

    const users = await User.findAll({
      where, 
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Company,
          as: 'company',
          attributes: ['name']
        },
        {
          model: Project,
          as: 'projects',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ]
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

async function assignProjects(req, res) {
  try {
    const userId = req.user.userId;
    const {projectIds} = req.body;

    const user = await User.findByPk(userId);

    const projects = await Project.findAll({
      where: {
        id: {
          [Op.in]: projectIds
        }
      }
    });

    const foundProjectIds = projects.map(project => project.id);
    const missingProjectIds = projectIds.filter(id => !foundProjectIds.includes(id));

    const existingProjects = await user.getProjects();
    const existingProjectIds = existingProjects.map(project => project.id);
    const assignedProjectIds = projectIds.filter(id =>existingProjectIds.includes(id));
    const newProjectIds = projectIds.filter(id =>!existingProjectIds.includes(id) && foundProjectIds.includes(id));

    if (newProjectIds.length > 0) {
      const newProjects = projects.filter(project => newProjectIds.includes(project.id));
      await user.addProjects(newProjects);
    }

    res.status(200).json({ 
      message: 'Proceso completado',
      assignedProjects: {
        description: 'Se han asignado estos proyectos:',
        projects: newProjectIds
      },
      alreadyAssignedProjects: {
        description: 'Estos proyectos ya estaban asignados:',
        projects: assignedProjectIds
      },
      missingProjects: {
        description: 'Estos proyectos no existen:',
        projects: missingProjectIds
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { register, getUsers, getUserById, updateEmail, deleteUser, updateProfilePhoto, assignProjects};