import dotenv from 'dotenv';

dotenv.config();

export const config = {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  jwt_token_secret: process.env.SECRET_JWT,
  port: process.env.PORT
};

export const db_config = {
  connection_string: process.env.DATABASE_URL,
}

export default config;