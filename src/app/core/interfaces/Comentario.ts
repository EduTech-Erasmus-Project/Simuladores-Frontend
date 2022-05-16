import { Actividad } from "./Actividad";

export interface Comentario {
  comentario?: string;
  fechaComentario?: Date;
  comentarioActividad?: Actividad;
  idComentario?: number;
  comentarioActividad_id?: number;
  fecha?: Date;
  
}
