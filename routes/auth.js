import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import routerUser from '../models/User.js';
import { config } from '../config.js';
import validateToken from '../middleware/validateJWTToken.js';

const router = express.Router();

// Ruta de registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await routerUser.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await routerUser.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos.' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos.' });
    }
    const token = jwt.sign(
      { id: user.id }, 
      config.jwt_token_secret,
      { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

export default router;
