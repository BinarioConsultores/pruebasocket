import { Usuario } from './usuario';
export class UsuariosLista{
    private lista:Usuario[] = [];
    constructor(){}
    //Agregar un usuario a la lista de usuarios
    public agregar(usuario:Usuario){
        this.lista.push(usuario);
        console.log("[Back-agregar] => Lista de usuarios actuales", this.lista);
        return usuario;
    }
    //actualizar el nombre de un usuario dado su id y el nuevo nombre
    public actualizarNombre(id:string, nombre:string){
        
        for(let usuario of this.lista){
            if(usuario.id === id){
                console.log("Actualizando de: ", usuario);
                usuario.nombre = nombre;
                console.log("a: ", usuario);
                break;
            }
        }
        console.log("[actualizarNombre] nueva lista=> ");
        console.log(this.lista);
    }
    //Obtener la lista de usuarios
    public getLista(){
        return this.lista;
    }
    //obtener un usuario especifico dado su id
    public getUsuario(id:string){
        for(let usuario of this.lista){
            if(usuario.id === id){
                return usuario;
            }
        }
    }
    //Obtener usuarios en una sala en particular
    public getUsuariosBySala(sala:string){
        return this.lista.filter((usuario)=>{
            if(usuario.sala === sala){
                return usuario;
            }
        })
    }
    //eliminar usuario
    public borrarUsuario(id:string){
        const tmpUsuario = this.getUsuario(id);
        this.lista = this.lista.filter((usuario)=>{
            if(usuario.id !== id){
                return usuario;
            }
        });
        console.log("[borrarUsuario] => " +this.lista );
        return tmpUsuario;
    }
}