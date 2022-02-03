import { variable } from "@angular/compiler/src/output/output_ast";

export class Escenario {
    private idEjercitario: number;
    private numeroDeEjercitario : number;
    private tipoDeEjercitario : string;
    private nombreDeEjercitario: string;
    private instruccionPrincipalEjercitario: string;
    private principalCompetenciasEjercitario : string;
    private duracionEjercitarioPorMinutos: number;
    private urlEjercitarios : string;
    private instruccionesParticipantes: string;
    //private asignacion

    constructor( ){

    }

    get getidEjercitario(){
        return this.idEjercitario;
    }

    set setidEjercitario(id: number){
        this.idEjercitario = id
    }

    get getNumeroDeEjercitario(){
        return this.numeroDeEjercitario;
    }

    set setNumeroDeEjercitario(numeroDeEjercitario: number){
        this.numeroDeEjercitario = numeroDeEjercitario
    }

    get getTipoDeEjercitario(){
        return this.tipoDeEjercitario
    }

    set setTipoDeEjercitario( tipoDeEjercitario : string ){
        this.tipoDeEjercitario=tipoDeEjercitario;
    }

    get  getNombreDeEjercitario (){
        return this.nombreDeEjercitario
    }

    set setNombreDeEjercitario (nombreDeEjercitario : string ){
        this.nombreDeEjercitario = nombreDeEjercitario;
    }

    get  getInstruccionPrincipalDeEjercitario (){
        return this.instruccionPrincipalEjercitario
    }

    set setInstruccionPrincipalEjercitario ( instruccionPrincipalEjercitario: string ){
        this.instruccionPrincipalEjercitario = instruccionPrincipalEjercitario;
    }

    get  getPrincipalCompetenciasEjercitario(){
        return this.principalCompetenciasEjercitario;
    }


    set setPrincipalCompetenciasEjercitario ( principalCompetenciasEjercitario: string){
        this.principalCompetenciasEjercitario = principalCompetenciasEjercitario;
    }

    get  getDuracionEjercitarioPorMinutos (){
        return this.duracionEjercitarioPorMinutos;
    }

    set setDuracionEjercitarioPorMinutos ( duracionEjercitarioPorMinutos :number ){
        this.duracionEjercitarioPorMinutos = duracionEjercitarioPorMinutos;
    }

    get  getUrlEjercitarios (){
        return this.urlEjercitarios;
    }

    set setUrlEjercitarios( urlEjercitarios: string ){
        this.urlEjercitarios  = urlEjercitarios;
    }

    get getInstruccionesParticipantes(){
        return this.instruccionesParticipantes;
    }

    set setInstruccionesParticipantes(instruccionesPrincipales: string){
        this.instruccionesParticipantes = instruccionesPrincipales;
    }
}

export interface EscenarioInterface{
    idEjercitario: number;
    numeroDeEjercitario : number;
    tipoDeEjercitario : string;
    nombreDeEjercitario: string;
    instruccionPrincipalEjercitario: string;
    principalCompetenciasEjercitario : string;
    duracionEjercitarioPorMinutos: number;
    instruccionesParticipantes : string;
    urlEjercitarios: string;
}