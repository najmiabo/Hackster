'use strict';
const dateFormat = require('../helper/formatter')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
    
    getFormatDate(val) {
      return dateFormat(val)
    }

    get showFullGender() {
      if (this.gender == "M") {
        return "Male"
      } else {
        return "Female"
      }
    }
  }
  Profile.init({
    UserId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};