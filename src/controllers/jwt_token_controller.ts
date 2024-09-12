import { validate_body } from "../utils/zod_validators/token_validator.js";
import bcrypt from 'bcrypt';
import config from "../../config.js";
import jwt, { Secret } from 'jsonwebtoken';
import { selectUser } from "../../models/queries/queries.js";
import db from "../../models/db.js";
import { token } from "../../models/schema.ts";

/*
  Uso 'zod' porque se lo vi a un flaco en yt 
  - https://www.youtube.com/watch?v=j81EEYSh3hQ&ab_channel=MonsterlessonsAcademy -
  zod me permite poder tener validaciones de tipos de datos en la api en runtime y esto me da la posibilidad de si me pasan algo erroneo 
  o no me envian un dato que es requerido, poder enviar un status 400 que contenga en el mensaje el tipo de error.
*/

export let createToken = async (req, res) => {

  const validatedToken = validate_body(req.body);
  console.log(validatedToken);

  if (!validatedToken.success) {
    return res.status(400).json(
      { error: validatedToken.error.errors }
    )
  }

  try {
    console.log(validatedToken.data)

    const { username: req_username,password: req_password, token_type: req_token } = validatedToken.data;
    

    const user = (await selectUser(req_username))[0];

    if (!user || !bcrypt.compare(req_password, user.password)) {
      return res.status(401).json(
        { error: 'Invalid credentials' }
      );
    }

    const id_user = user.id;
    const tokenJWT = jwt.sign(
      // payload del token
      { id_user, req_token },
      // secreto para el token esta en .env
      (config.jwt_token_secret as Secret),
      // expire date para que no se quede siempre el token
      { 'expiresIn': "1d" }
    );
    const date = new Date();
    // armo el date pero con +1 dia
    const token_expire_date_txt = date.setDate(date.getDate() + 1);

    const token_expire_date = new Date(token_expire_date_txt); 
    await db.insert(token).values({
      username: req_username,
      token: tokenJWT,
      token_type: req_token,
      token_expire_date: token_expire_date,
      api_user_id: id_user
    }).execute();

    res.status(200).json({ tokenJWT });

  } catch (error) {

    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });

  }

}

