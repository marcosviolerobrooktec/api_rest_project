module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'Projects'
    });
  
    Project.associate = function(models) {
      Project.belongsToMany(models.User, {
        through: 'UserProject',
        foreignKey: 'projectId',
        as: 'users'
      });
    };
  
    return Project;
  };
  