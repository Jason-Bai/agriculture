module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    c_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    isDelete: {
      type: DataTypes.ENUM('yes', 'no'),
      defaultValue: 'no'
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['c_name']
    }],
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Category.hasMany(models.Category, {
          foreignKey: 'parentId',
          as: 'categoryItems'
        });

        Category.belongsTo(models.Category, {
          foreignKey: 'parentId',
          onDelete: 'CASCADE'
        });

        Category.belongsTo(models.User, {
          foreignKey: 'creatorId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Category;
};
