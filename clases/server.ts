import { SERVER_PORT } from '../globals/environment';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import { UsuariosLista } from './usuarios-lista';
import { Usuario } from './usuario';

export default class Server{

    private static _instance:Server;

    public app:express.Application;
    public port:Number;
    //servicor para emitir y escuchar eventos
    public io: socketIO.Server;
    private httpServer:http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        //configurando el nuevo server
        this.httpServer = new http.Server(this.app);
        //cnfigurando el socket
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    public static get instance(){
        if(this._instance){
            return this._instance;
        }else{
            this._instance = new this();
            return this._instance;
        }
    }
    usuariosConectados = new UsuariosLista;
    private escucharSockets(){
        console.log("Escuchando conexiones o sockets");

        this.io.on('connection',cliente=>{
            console.log("[Back-Connection] nuevo cliente conectado " + cliente.id);
            const usuario = new Usuario(cliente.id);
            console.log("[Back-Connection] Nuevo Usuario Creado " ,usuario);
            this.usuariosConectados.agregar(usuario);

            cliente.on('disconnect',()=>{
                console.log("[Disconnect] nuevo cliente desconectado");
                this.usuariosConectados.borrarUsuario(cliente.id);
            });

            cliente.on('mensaje',(payload:any)=>{
                console.log("[Mensaje]nuevo mensaje ",payload);
                this.io.emit("mensaje-nuevo",payload);
            });

            cliente.on('configurar-usuario',(payload:any, callback:Function)=>{

                console.log('[configurar-usuario]Configurando a: ' + payload.nombre);
                this.usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
                callback({
                    ok:true,
                    mensaje: `Usuario ${payload.nombre} configurado`,
                });
                
            });

        });
    }

    start(callback:Function){
        this.httpServer.listen(this.port, callback);

    }
}