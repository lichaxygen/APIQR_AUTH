import express from 'express';
import admin from 'firebase-admin'
import { VerifySessionCookie } from '../middleware/sessionCookies';

export let cookie = express.Router();

cookie.post('/sessionLogin', async (req, res)=>{
  const idToken = req.body.idToken.toString();
  const expiresIn = 60*60*24*5*1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = {maxAge: expiresIn, httpOnly: true};
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({status: "success"}));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST");
      }
    )
});

cookie.get('/sessionLogout', async(req, res)=>{
  res.clearCookie('session');
  res.redirect('/login');
});

cookie.get('/validate', VerifySessionCookie);