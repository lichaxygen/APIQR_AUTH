import express from 'express';
import cors from 'cors';
import config from '../config.js'
import routes from './routes/users_api.ts';
import jwt_token from './routes/jwt_token.ts';
import { view } from './routes/view.ts';

const app = express();

// Middleware para permitir CORS y CSRF
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
app.use(express.json());

// Rutas de la API
app.use('/api',routes);
app.use('/token', jwt_token);

if(process.env.NODE_ENV === 'testing'){
  app.set('view engine', 'ejs');
  app.use('/', view);
}

app.listen(config.port, () => console.log('Server running on port 3000'));