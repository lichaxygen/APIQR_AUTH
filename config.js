import dotenv from 'dotenv';

dotenv.config();

export const config = {
  jwt_token_secret: process.env.SECRET_JWT,
  port: process.env.PORT,

  // oauth2 google 
  id_client_google: process.env.CLIENT_ID_GOOGLE,
  client_secret_google: process.env.CLIENT_SECRET_GOOGLE,
  url_redirect_google: process.env.GOOGLE_REDIRECT_URL
};

export const db_config = {
  connection_string: process.env.DATABASE_URL,
}

export default config;