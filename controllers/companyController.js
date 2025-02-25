const {Company,User} = require('../models');
const {Op} = require('sequelize');

async function registerCompany(req, res) {
  try {
    const {name} = req.body;

    const existingCompany = await Company.findOne({ where: { name } });
    if (existingCompany) {
      return res.status(400).json({ message: 'Compañía ya registrada' });
    }

    const newCompany = await Company.create({
      name
    });

    res.status(201).json({ message: 'Compañía creada correctamente', company: newCompany });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCompanies(req, res) {
  try {
    const { name } = req.query;
    const where = {};

    if(name){
      where.name = {[Op.iLike]: `%${name}%` };
    }

    const company = await Company.findAll({where});

    if (!company) {
      return res.status(404).json({ message: 'Compañía no encontrada' });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error('Error al obtener la compañía:', error);
    res.status(500).json({ message: 'Error al obtener la compañia' });
  }
}

async function getCompanyById(req, res) {
    try {
      const company = await Company.findByPk(req.params.id);
  
      if (!company) {
        return res.status(404).json({ message: 'Compañía no encontrada' });
      }
  
      res.status(200).json(company);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function getCompaniesByColor(req, res) {
    const { color } = req.query;
  
    try {
      const companies = await Company.findAll({where: { color }});
  
      if (!companies || companies.length === 0) {
        return res.status(404).json({ message: 'No se encontraron compañías con ese color' });
      }
  
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function getUsersCompany(req,res){
  const id = req.params.id;

  try{
    const company = await Company.findOne({ 
      where: { id: id },
      attributes: ['id','name','color'],
      include: {
        model: User,
        as: 'users',
        attributes: {exclude: ['password']}
      }
    });
    
    if(!company){
      return res.status(404).json({ message: 'Compañía no encontrada' });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error('Error al obtener la compañía con usuarios:', error);
    res.status(500).json({ message: 'Error al obtener la compañía' });
  }
}

module.exports = {getCompanies, getCompaniesByColor, getCompanyById, registerCompany, getUsersCompany};