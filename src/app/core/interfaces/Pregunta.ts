export interface Pregunta {
  id?: number;
  respuesta?: Respuesta;
  respuesta_correcta?: RespuestaCorrecta;
}

export interface Respuesta {
  id?: number;
  numeroPregunta?: number;
  respuestaIngresada?: string;
  tiempoRespuesta?: string;
  correcto?: boolean;
}

export interface RespuestaCorrecta {
  contenido?: string;
  respuestaCorrecta?: string;
  numeroPregunta?: number;
}
