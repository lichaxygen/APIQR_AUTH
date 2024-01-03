import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Token = sequelize.define('token', {
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
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token_expire_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

export default Token;
