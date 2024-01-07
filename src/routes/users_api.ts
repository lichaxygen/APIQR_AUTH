import express from 'express';
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from '../../config.js';
import { insertApiUser, insertToken } from '../../models/queries/queries.ts';

const router = express.Router();
// User registration route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);
    
    await insertApiUser(username, hashedPassword).then(
      ()=>res.status(201).json({ message: 'User created successfully.' })
    ).catch(err=>new Error("Error: error while making the insert api user query\n", err))
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const data = selectUser(username);
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
});
export default router;
function selectUser(username: any) {
  throw new Error('Function not implemented.');
}

