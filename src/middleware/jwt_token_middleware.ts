import { validate_body } from '../schemas/apiuser_validator.js'; 
import { searchTokenByUsername } from "../../models/queries/queries.js";
import jwt from 'jsonwebtoken';

export const validateToken = async (req, res, next) => {
  let body = validate_body(req.body)
  let body_info = body.data;

  const token = req.headers.authorization.split(' ')[1];
  const auth_header_type = req.headers.authorization.split(' ')[0];
  
  if(body.error){
    return res.status(400).json(
      {error: body_info.error.errors }
    )
  }
  if(auth_header_type != "Bearer"){
    return res.status(401).send("Wrong header authorization");
  }
  if(!token) return res.status(401).send("No credentials");

  console.log("BODY:", body)
  try {
    console.log("Body-username: ", body_info.username)
    // conseguir token de la base de datos
    let db_token = await searchTokenByUsername(body_info.username);

    // si no es el usuario que registro el token tambien tiene error
    console.log("Token:", db_token)
    console.log("Username body:", body_info.username)
  
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
      config.jwt_token_secret,
     );
    } catch {
      res.status(500).send("Internal server error");
    }
    next();
}

export default validateToken;