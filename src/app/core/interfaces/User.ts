import { Evaluador } from "./Evaluador";
import { Participante } from "./Participante";

export interface User {
  id?: number;
  email?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  pais?: string;
  ciudad?: string;
  direccion?: string;
  fechaNacimiento?: Date;
  carreraUniversitaria?: string;
  genero?: string;
  numeroDeHijos?: number;
  estadoCivil?: string;
  etnia?: string;
  estudiosPrevios?: string;
  codigoEstudiante?: string;
  nivelDeFormacion?: string;
  calificacion?: number;
  tiempo?: number;
  responsable?: any;
  password?: string;
  tipoUser?: string;
  participante?: Participante;
  evaluador?: Evaluador;
  codigo?: string;
}
