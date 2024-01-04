import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {sequelize, test_connection} from './models/database.js';
import routes from './routes/users_api.js';
import csrf from 'csurf';
import jwt_token from './routes/jwt_token.js';
import validateToken from './middleware/jwt_token_middleware.js';

const app = express();

// Middleware para permitir CORS y CSRF
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
let csrfMiddleware = csrf({cookie: true});

// Configuración de CORS y CSRF
app.use(cookieParser());
app.use(csrfMiddleware);
app.use(cors());
app.disable('x-powered-by')

// Configuración de Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas de la API
app.use('/api',routes);
app.use('/token', jwt_token);


test_connection();
sequelize.sync({ force: true })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
    // Iniciar el servidor
    const port = 3000;
    app.listen(port, () => {
      console.log(`Servidor iniciado en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar los modelos:', error);
  });