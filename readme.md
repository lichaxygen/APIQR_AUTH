# xygen.io/QRefy

este codigo pertenece a xygen.io/QRefy.

Backend con typescript + express js + bun (se puede utilizar con otro javascript runtime como node pero se eligio bun por la performance que tiene en comparación con node)

<b>Autentificación OAUTH2 para Google y Github</b>

<b>Autentificación Bearer para custom JWT Tokens</b>

## Uso/Instalación

Instalar dependencias

```
cd APIQR_AUTH
npm install // o cualquier otro package manager como puede ser 'bun' 
```

## Variables Env
```
PORT=3000
SECRET_JWT=xygen.io_cool_jwt
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres

POSTGRES_USER=postgres
POSTGRES_DB=postgres
POSTGRES_PASSWORD=postgres

NODE_ENV=development
DOMAIN_PAGE=localhost
```

la variable de DOMAIN_PAGE es donde esta hosteada la aplicación de React

si se esta usando el testing de EJS para los auth se tiene que cambiar el NODE_ENV a testing
