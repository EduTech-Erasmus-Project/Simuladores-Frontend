import { User } from "./User";

export interface Evaluador {
  id?: number;
  usuario?: User;
  codigoEvaluador?: string;
  aprobacion?: string;
  razon?: string;
}
