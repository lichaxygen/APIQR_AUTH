import express from 'express';
import cors from 'cors';
import config from '../config.js'
import routes from './routes/users_api.ts';
import jwt_token from './routes/jwt_token.ts';
import admin from "firebase-admin";
import serviceAccountKey from "../serviceAccountKey.json";
import { qr_gen } from './routes/qr_gen.ts';


admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccountKey))),
});

const app = express();
// Configuración de CORS
var corsOptions = {
  origin: ["http://localhost:3000","http://localhost:5173"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.disable('x-powered-by')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware para permitir CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/qrcode', qr_gen);
app.use('/api',routes);
app.use('/token', jwt_token);
app.listen(config.port, () => console.log('Server running on port ' + config.port));