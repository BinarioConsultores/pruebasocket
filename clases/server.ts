import { SERVER_PORT } from '../globals/environment';
import express from 'express';

export default class Server{
    public app:express.Application;
    public port:Number;
    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
    }

    start(callback:Function){
        this.app.listen(this.port, callback);
    }
}