module.exports = (sequelize, DataTypes) => {
    const UserProject = sequelize.define('UserProject', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'id'
        }
      }
    }, {
      tableName: 'UserProject'
    });
  
    return UserProject;
  };