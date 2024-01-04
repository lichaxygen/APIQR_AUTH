import User from "../../models/User.js";
import { validate_body } from "../../schemas/user_validator.js"


/* Crear usuario completo */
export async function createUser(req, res) {

  let body = validate_body(req.body)
  
  if(!body.success){
    res.status(400).json(
      {error: body.error.errors}
    );
  }
  
  try {

    const {
      name,
      id_user_api,
      company,
      email,
      password,
      address,
      zip_code,
      city,
      country,
      entry_date,
      apis_left
    } = body.data
    
    if(user){
      res.status(409).send('Conflict, theres a user with this ')
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({
      name,
      company,
      email,
      password: hashedPassword,
      address,
      zip_code,
      city,
      country,
      entry_date,
      apis_left
    });
     
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }

}
export async function deleteUser(request, response) {


}

export async function modifyUser(request, response) {

}
