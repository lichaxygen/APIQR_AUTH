import Token from '../models/Token.js';
import { validate_body } from '../schemas/validator.js'; 
import jwt from 'jsonwebtoken';
import config from "../config.js";

export const validateToken = async (req, res, next) => {
  let body = validate_body(req.body)
  let body_info = body.data

  const token = req.headers.authorization.split(' ')[1];
  const auth_header_type = req.headers.authorization.split(' ')[0];

  if(auth_header_type != "Bearer"){
    return res.status(401).send("Wrong header authorization");
  }

  if(body.error){
    return res.status(400).json(
      {error: validatedToken.error.errors }
    )
  }

  if(!token) return res.status(401).send("No credentials");

  console.log("BODY:", body)
  try {

    // conseguir token de la base de datos
    let db_token = await Token.findOne({
        where: {
          token: token
        }
      }
    );
    // si no es el usuario que registro el token tambien tiene error
    console.log("Token:", db_token)
    console.log("Username body:", body_info.username)
    console.log("DB username:", db_token.username)
  
    if(db_token.username != body_info.username){
      return res.status(401).send("Unauthorized token");
    }
    // no esta en la base de datos
    if(!db_token){
      return res.status(401).send("Unauthorized token");
    }
    // verifico el token y veo el payload
    console.clear()
    console.log(token)
    jwt.verify(
      token,
      "xygen.io_token",
     );
    } catch {
      res.status(500).send("Internal server error");
    }
    next();
}

export default validateToken;