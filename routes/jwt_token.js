import express from 'express'
import { createToken } from '../controllers/jwt_token/jwt_token_controller.js';

let jwt_token = express.Router()

jwt_token.post(
  '/generate-token',
  createToken
);

/*
 qr_gen.get(
  'generate-qr/',
  validateToken,
  generateQR
 )

 jwt_token.get(
  '/my-tokens/:id',
  getToken
  );

*/

export default jwt_token;