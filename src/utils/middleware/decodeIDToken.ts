/*
  Que espera este middleware?
  
  Que se envie esto desde el front:

    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
*/
import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

export async function decodeIDToken(req: Request, res: Response, next: NextFunction){
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
      console.log(decodedToken);
    } catch (err) {
      console.log(err);
    }
  }
  next();
}