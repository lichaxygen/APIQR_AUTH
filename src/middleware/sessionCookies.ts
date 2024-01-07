import admin from "firebase-admin";
import {Request, Response} from 'express';

// verifica la cookie de session si no la tiene lo redirrecciona al login 
export const VerifySessionCookie = async (req: Request, res: Response, next) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then(()=>
      next()
    ).catch(
      () => res.redirect(`http://${import.meta.env.DOMAIN_PAGE}/login`)
    );
}