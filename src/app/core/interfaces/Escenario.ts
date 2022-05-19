import { variable } from "@angular/compiler/src/output/output_ast";

export interface Escenario {
  id?: number;
  numeroDeEjercitario?: number;
  tipoDeEjercitario?: string;
  nombreDeEjercitario?: string;
  instruccionPrincipalEjercitario?: string;
  principalCompetenciasEjercitario?: string;
  duracionEjercitarioPorMinutos?: number;
  urlEjercitarios?: string;
  instruccionesParticipantes?: string;
  instruccionPrincipalDeEjercitario?: string;
}

export interface informacionEjercitarioInterface {
  name: string;
  value: number;
}
