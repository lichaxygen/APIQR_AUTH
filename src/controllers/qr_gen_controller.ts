import { Request, Response } from "express";
import qrcode, { QRCodeToDataURLOptions } from 'qrcode';

export async function generateStaticQR(req: Request, res: Response) {
  const { url, format, size, margin, colorDark, colorLight } = req.query;
  
  const qrOptions: QRCodeToDataURLOptions = {
    errorCorrectionLevel: 'H',
    type: format && format.toString() === 'webp' ? 'image/webp' : 'image/png',
    width: parseInt(size as string) || 300,
    margin: parseInt(margin as string) || 1,
    color: {   
      dark: typeof colorDark === 'string' ? colorDark : '#000000', 
      light: typeof colorLight === 'string' ? colorLight : '#ffffff' 
    },
  };

  qrcode.toBuffer(url as string, (err, qrCodeData) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error generating QR code');
      return;
    }

    res.set('Content-Type', qrOptions.type === 'image/webp' ? 'image/webp' : 'image/png');
    res.send(qrCodeData);
  });
}
export async function generateDynamicQR(req: Request, res: Response) {
  // TODO
  res.send("TODO!");
}