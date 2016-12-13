const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'member'),
      defaultValue: 'member' },
    isDelete: {
      type: DataTypes.ENUM('yes', 'no'),
      defaultValue: 'no'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['name']
    }],
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        User.hasMany(models.Category, {
          foreignKey: 'creatorId',
          as: 'categories'
        });
      }
    },
    hooks: {
      beforeCreate: (user, options) => {
        return new Promise((resolve, reject) => {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              return reject(err);
            }
            bcrypt.hash(user.pass, salt, (err, hash) => {
              if (err) {
                return reject(err);
              }
              user.pass = hash;
              resolve(user);
            });
          });
        })
      }
    }
  });
  return User;
};
