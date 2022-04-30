export interface Actividad {
    idActividad: number;
    comentario: string;
    tiempoInicio: string;
    tiempoFin: string;
    tiempoTotalResolucionEjercitario: number;
    fechaDeActividad: string;
    totalRespuestasCorrectasIngresadasParticipante: number;
    numeroTotalDeRespuestasContestadasPorElParticipante: number;
    numeroTotalDePreguntasDelEjercitario: number;
    calificacionActividad: number;
    ActividadPorEjercitario_id: number;
    ActividadDeParticipante_id: number;
    ejercitario?: string;
}

