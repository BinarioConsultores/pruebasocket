import {Router, Request, Response} from 'express';
import Server from '../clases/server';
export const router = Router();

router.get('/mensajes',(req:Request, res:Response)=>{
    res.json({
        ok:true,
        mensaje: 'Respuesta ok!'
    })
});
router.post('/mensajes',(req:Request, res:Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.cuerpo;

    const payload = {
        cuerpo: cuerpo,
        de:de
    }
    const server = Server.instance;
    server.io.emit("mensaje-nuevo", payload);
    res.json({
        ok:true,
        mensaje: 'Respuesta ok! con post',
        cuerpo
    })
});
router.post('/mensajes/:id',(req:Request, res:Response)=>{
    const cuerpo = req.body.cuerpo;
    const id = req.params.id;
    const de = req.body.cuerpo;

    const payload = {
        de:de,
        cuerpo: cuerpo,
    }
    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado',payload);

    res.json({
        ok:true,
        mensaje: 'Respuesta ok! con post',
        cuerpo,
        id
    })
});