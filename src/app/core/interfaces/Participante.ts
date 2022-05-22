import { User } from "./User";

export interface Participante {
  id?: number;
  usuario?: User;
  codigoEstudiante?: string;
  aceptacionResponsable?: string;
  razon?: string;
  evaluador?: number;
  ref?: string;
}
