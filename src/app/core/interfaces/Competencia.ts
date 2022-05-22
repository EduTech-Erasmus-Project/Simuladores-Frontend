import { Ejercitario } from "./Ejercitario";

export interface Competencia {
    titulo?:      string;
    descripcion?: string;
    niveles?:     Nivele[];
}

export interface Nivele {
    name?:         string;
    value?:        string;
    ejercitarios?: Ejercitario[];
}



