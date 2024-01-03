import express from 'express'

let jwt_token = express.Router()

jwt_token.get(
  "/generate-token", 
  async(req, res)=>{
    const {user_api, password_api, type_key} = req.query;
    res.send(user_api, password_api, type_key);
  });
export default jwt_token;