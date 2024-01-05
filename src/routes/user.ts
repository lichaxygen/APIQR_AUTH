import express from 'express'
import { createUser, deleteUser, modifyUser } from '../controllers/users/user_controllers'
import validateToken from '../middleware/jwt_token_middleware'

let users = express.Router()
// CREAR
users.post('/', createUser)
//BORRAR
users.delete('/:id', validateToken, deleteUser)
// MODIFICAR
users.put('/:id',validateToken, modifyUser)


export default users;