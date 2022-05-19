import { Actividad } from "./Actividad";

export class Comentario {
    private comentario: string;
    private fechaComentario: Date;
    private comentarioActividad: Actividad;

    constructor(comentatio: string, fecha: Date, comentarioActividad: Actividad){
        this.comentario = comentatio;
        this.fechaComentario = fecha;
        this.comentarioActividad = comentarioActividad;
    }
    
    set setComentario(comentario: string){
        this.comentario = comentario;
    }

    set setFecha(fechaComentario: Date){
        this.fechaComentario = fechaComentario;
    }

    set setActividad(actividad: Actividad){
        this.comentarioActividad = actividad;
    }

    get getComentario():string{
        return this.comentario;
    }

    get getFecha():Date{
        return this.fechaComentario;
    }

    get getActividad():Actividad{
        return this.comentarioActividad;
    }
}

export interface ComentarioInterface {
    idComentario: number;
    comentario: string;
    fechaComentario: string;
    comentarioActividad_id: number;
}