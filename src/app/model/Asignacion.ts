import { Escenario } from "./Escenario";

export class Asignacion {
    private idAsignacion : number;
    private fechaAsignacion : string;
    private ejercitario : Escenario;
    
    private participante_id: number;
    private evaluador_id: number;
    
    constructor(idAsignacion : number, fechaAsignacion : string, participante_id: number, evaluador_id: number, ejercitario: Escenario){
        this.idAsignacion = idAsignacion;
        this.fechaAsignacion = fechaAsignacion;
        this.participante_id = participante_id;
        this.evaluador_id = evaluador_id;
        this.ejercitario = ejercitario;
    }

    get getidAsignacion(){
        return this.idAsignacion;
    }

    get getfechaAsignacion(){
        return this.fechaAsignacion;
    }

    get getparticipante_id(){
        return this.participante_id;
    }
    
    get getevaluador_id(){
        return this.evaluador_id;
    }

    get getEjercitario(){
        return this.ejercitario;
    }

    set setidAsignacion(id: number){
        this.idAsignacion = id;
    }

    set setfechaAsignacion(fecha: string){
        this.fechaAsignacion = fecha;
    }

    set setparticipante_id(idParticipante: number){
        this.participante_id = idParticipante;
    }
    
    set setevaluador_id(evaluadorId: number){
        this.evaluador_id= evaluadorId;
    }

    set setEjercitario(ejercitario: Escenario){
        this.ejercitario = ejercitario;
    }
   
}


export interface AsignacionTabla {
    idActividad?: number;
    tiempoTotalResolucionEjercitario?: number;
    fechaDeActividad?: string;
    totalRespuestasCorrectasIngresadasParticipante?: number;
    numeroTotalDePreguntasDelEjercitario?: number;
    calificacionActividad?: number;
    ejercitario?: string;
}