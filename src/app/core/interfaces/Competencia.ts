import { Ejercitario } from "./Ejercitario";

export interface Competencia {
  id?: number;
  titulo?: string;
  descripcion?: string;
  niveles?: Nivele[];
}

export interface Nivele {
  name?: string;
  value?: string;
  status?: boolean;
  ejercitarios?: Ejercitario[];
}
