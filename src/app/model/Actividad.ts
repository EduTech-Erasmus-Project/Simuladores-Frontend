export interface ActividadInterface {
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
}

export class Actividad {
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
    
}

export interface ActividadTabla {
    idActividad?: number;
    tiempoTotalResolucionEjercitario?: number;
    fechaDeActividad?: string;
    totalRespuestasCorrectasIngresadasParticipante?: number;
    numeroTotalDePreguntasDelEjercitario?: number;
    calificacionActividad?: number;
    ejercitario?: string;
}