import express from "express";
import { generateStaticQR } from '../controllers/qr_gen_controller';

export const qr_gen = express.Router();
qr_gen.get('/generate-qr-static', generateStaticQR);

