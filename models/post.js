'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.belongsToMany(models.Tag, { through: models.TagPost })
    }
  }
  Post.init({
    UserId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    hooks: {
      beforeCreate: (instance) => {
        const wordfilter = require('wordfilter');
        wordfilter.addWords(['setan','babi', 'iblis', 'anjing']);
        const isBadWord = wordfilter.blacklisted(instance.content)

        if (isBadWord) {
          throw 'Dilarang memposting kata kata kasar!'
        }
      },
      
      

    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};