import User from "../models/User.js";
import { validate_token } from "../schemas/token.js";
import jwt from 'jsonwebtoken';
import config from "../config.js";

/*
  Uso 'zod' porque se lo vi a un flaco en yt - https://www.youtube.com/watch?v=j81EEYSh3hQ&ab_channel=MonsterlessonsAcademy -
  zod me permite poder tener validaciones de tipos de datos en la api en runtime y esto me da la posibilidad de si me pasan algo erroneo 
  o no me envian un dato que es requerido, poder enviar un status 400 que contenga en el mensaje el tipo de error.
*/

export let createToken = async (req, res) => {
  const validatedToken = validate_token(req.body);
  console.log(validatedToken);
  if(validatedToken.error){
    return res.status(400).json(
      {error: validatedToken.error.errors }
    )
  }

  try {
    console.log(validatedToken.data)
    const {
      username: req_username, 
      password:req_password, 
      token_type:req_token} = validatedToken.data;
    const user = await User.findOne(
      { 
        where: {
          username: req_username,
          password: req_password
        }
      }
      );

    if (!user) {
      return res.status(401).json(
        { error: 'Invalid credentials' }
        );
    }

    const id_user = user.id;
    const token = jwt.sign(
      { id_user, req_token },
      config.jwt_token_secret,
      { 'expiresIn': "1d"}
    );
    const date = new Date();
    const token_expire_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()+1}`;
    
    await Token.create(
      { 
        id_user,
        req_username,
        token,
        req_token,
        token_expire_date
      }
      );
    
    res.status(200).json({ token });
  
  } catch (error) {
    
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  
  }

}

