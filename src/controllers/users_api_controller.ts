import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { insertApiUser, selectUser, insertToken } from "../../models/queries/queries";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../config";
import { validate_body } from "../zod_validators/token_validator";

async function createHash(password: string) : Promise<string> {
  const hashedPassword = await bcrypt.genSalt(10).then(salt=>{
    console.log('Salt: ', salt)
    return bcrypt.hash(password as string, salt)
  }).then(hash=>{
    console.log('Hash: ', hash)
  }).catch(err=>new Error("Error: error while hashing the password\n", err));
  return String(hashedPassword);
}

export async function userRegister (req: Request, res: Response) {
  try {
    let vbody = validate_body(req.body);

    if(!vbody.success) {
      return res.status(400).json(
        { error: vbody.error.errors }
      )
    }
    const { username, password } = vbody.data;
    let hashed = await createHash(String(password));
    await insertApiUser(username, String(hashed))
    .catch(err=>new Error("Error: error while making the insert api user query\n", err));
    res.status(201).json({ message: 'User created successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
}


export async function userLogin(req: Request, res: Response) {
  try {

    let vbody = validate_body(req.body);

    if(!vbody.success) {
      return res.status(400).json(
        { error: vbody.error.errors }
      )
    }
    const { username, password } = vbody.data;
    const data = await selectUser(username);
    console.log("Request password: ", password, "Hashed password: ", data[0].password)

    const passwordMatch = await bcrypt.compare(password, data[0]?.password);
  
    if (!passwordMatch || !data[0]) {
      return res.status(401).json({ message: 'Incorrect username or password.' });
    }
  
    const tokenValue = jwt.sign(
      { id:data[0].id }, 
      (config.jwt_token_secret as Secret),
      { expiresIn: '1h' });
    
    await insertToken(username, tokenValue);
    
    res.status(200).json({ token: tokenValue });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
}