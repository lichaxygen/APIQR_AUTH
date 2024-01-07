import express from 'express';
import cors from 'cors';
import config from '../config.js'
import routes from './routes/users_api.ts';
import jwt_token from './routes/jwt_token.ts';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import admin from "firebase-admin";
import serviceAccountKey from "../serviceAccountKey.json";
import { cookie } from './routes/cookie.ts';


admin.initializeApp({
  // el service account key se saca del settings de firebase
  credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccountKey))),
});

const csrfMidleware = csrf({
  cookie: true
})
const app = express();

// Middleware para permitir CORS
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// Configuración de CORS
app.use(cors());
app.disable('x-powered-by')

// Configuración de Express
app.use(express.urlencoded({ extended: true }));
// puede usar json
app.use(express.json());
// puede usar cookies para las sesiones
app.use(cookieParser());
// csrf related cookies
app.use(csrfMidleware);

// crsf middleware
app.all('*', (req, res, next) => {  
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
})
// Rutas de la API
app.use('/api',routes);
app.use('/token', jwt_token);
app.use('/cookie', cookie);


app.listen(config.port, () => console.log('Server running on port 3000'));