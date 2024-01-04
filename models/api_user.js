import { DataTypes } from 'sequelize';
import {sequelize} from './database.js';

const APIUser = sequelize.define('api_user', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  company: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  adress: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  zip_code:{
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
  }, 
  country: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  entry_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type_user: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  apis_left: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    default: 0, 
  },
  user_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});

export default APIUser;

