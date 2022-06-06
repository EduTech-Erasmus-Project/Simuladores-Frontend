import { Actividad } from "./actividad";
import { User } from "./User";

export interface Reporte {
    usuario?:     User;
    competencia?: Competencia;
}

export interface Competencia {
    id?:      number;
    titulo?:  string;
    niveles?: Nivele[];
}

export interface Nivele {
    label?:        string;
    value?:        string;
    estado?:       string;
    fecha?:        Date;
    calificacion?: number;
    intentos?:     number;
    actividades?:  Actividad[];
}







