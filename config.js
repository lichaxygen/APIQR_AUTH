import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: process.env.DB_HOST,  
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  jwt_token_secret: process.env.SECRET_JWT
};

export default config;