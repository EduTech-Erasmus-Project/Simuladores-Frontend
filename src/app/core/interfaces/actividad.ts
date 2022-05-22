export interface Actividad {
  id?: number;
  tiempoInicio?: string;
  tiempoFin?: string;
  tiempoTotal?: number;
  fecha?: Date;
  preguntasCorrectas?: number;
  PreguntasContestadas?: number;
  totalPreguntas?: number;
  calificacion?: number;
  ejercitario_id?: number;
  participante_id?: number;
  calificacionPorcentaje?: number;
}
