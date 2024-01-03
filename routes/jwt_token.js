import express from 'express'
import { createToken } from '../controllers/jwtController.js';

let jwt_token = express.Router()

jwt_token.post(
  '/generate-token',
  createToken
);

/*
 jwt_token.get(
  '/my-tokens/:id',
  getToken
  );

*/

export default jwt_token;