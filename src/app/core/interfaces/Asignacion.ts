import { Escenario } from "./Escenario";
export interface Asignacion {
  idAsignacion?: number;
  fechaAsignacion?: string;
  ejercitario?: Escenario;
  participante_id?: number;
  evaluador_id?: number;
  participante?: string;
  evaluador?: string;
  numeroDeEjercitario?: number;
  nombreDeEjercitario?: string;
  tipoDeEjercitario?: string;
}

