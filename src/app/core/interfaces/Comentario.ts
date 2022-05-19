import { Evaluador } from "./Evaluador";
import { Participante } from "./Participante";
import { User } from "./User";

export interface Comentario {
  id?: number;
  evaluador?: Evaluador;
  participante?: Participante;
  comentario?: string;
  fechaComentario?: Date;
  actividad?: number;
}


