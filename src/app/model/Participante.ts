import { Perfil } from "./Perfil"
import { Responsable } from "./Responsable"

export class Participante extends Perfil{

    
    private fechaNacimiento : string
    private carreraUniversitaria : string
    private genero : string
    private numeroDeHijos : number
    private estadoCivil : string
    private etnia : string
    private estudiosPrevios : string
    private codigoEstudiante : string
    private nivelDeFormacion : string
    private responsable : Responsable; 

    constructor(id : number, email : string, nombre : string, apellido : string, 
        telefono : string, pais : string, ciudad : string, direccion : string , 
        fechaNacimiento : string, carreraUniversitaria : string, genero : string, numeroDeHijos : number,
        estadoCivil : string, etnia : string, estudiosPrevios : string, codigoEstudianteccion : string, 
        nivelDeFormacion : string, responsable: Responsable){

        super(id, email, nombre, apellido, telefono, pais, ciudad, direccion)
        this.fechaNacimiento = fechaNacimiento;
        this.carreraUniversitaria = carreraUniversitaria;
        this.genero = genero;
        this.numeroDeHijos = numeroDeHijos;
        this.estadoCivil = estadoCivil;
        this.etnia = etnia;
        this.estudiosPrevios = estudiosPrevios;
        this.codigoEstudiante = codigoEstudianteccion;
        this.nivelDeFormacion = nivelDeFormacion;
        this.responsable = responsable;
    }

    get getId(){
        return super.getId;
    }

    set setId(id: number){
        super.setId = id;
    }

    get getEmail(){
        return super.getEmail;
    }

    set setEmail(email: string){
        super.setEmail = email;
    }

    get getPassword(){
        return super.getPassword;
    }

    set setPassword(password: string){
        super.setPassword=password;
    }
    get getNombre(){
        return super.getNombre;
    }

    set setNombre(nombre: string){
        super.setNombre = nombre;
    }
    get getApellido(){
        return super.getApellido;
    }

    set setApellido(apellido: string){
        super.setApellido = apellido;
    }
    get getTelefono(){
        return super.getTelefono
    }

    set setTelefono(telefono: string){
        super.setTelefono = telefono;
    }
    get getPais(){
        return super.getPais;
    }

    set setPais(pais: string){
        super.setPais = pais;
    }
    get getCiudad(){
        return super.getCiudad;
    }

    set setCiudad(ciudad: string){
        super.setCiudad = ciudad;
    }
    get getDireccion(){
        return super.getDireccion;
    }

    set setDireccion(direccion: string){
        super.setDireccion = direccion;
    }

    get getFechaNacimiento(){
        return this.fechaNacimiento;
    }

    set setFechaNacimiento(fechaNacimiento: string){
        this.fechaNacimiento = fechaNacimiento;
    }

    get getCarreraUniversitaria(){
        return this.carreraUniversitaria;
    }

    set setcarreraUniversitaria(carreraUniversitaria: string){
        this.carreraUniversitaria = carreraUniversitaria;
    }

    get getGenero(){
        return this.genero;
    }

    set setGenero(genero: string){
        this.genero = genero;
    }
    get getNumeroDeHijos(){
        return this.numeroDeHijos;
    }

    set setNumeroDeHijos(numeroDeHijos: number){
        this.numeroDeHijos = numeroDeHijos;
    }
    get getEstadoCivil(){
        return this.estadoCivil;
    }

    set setEstadoCivil(estadoCivil: string){
        this.estadoCivil = estadoCivil;
    }
    get getEtnia(){
        return this.etnia;
    }

    set setEtnia(etnia: string){
        this.etnia = etnia;
    }
    get getEstudiosPrevios(){
        return this.estudiosPrevios;
    }

    set setEstudiosPrevios(estudiosPrevios: string){
        this.estudiosPrevios = estudiosPrevios;
    }
    get getCodigoEstudiante(){
        return this.codigoEstudiante;
    }

    set setCodigoEstudiante(codigoEstudiante: string){
        this.codigoEstudiante = codigoEstudiante;
    }
    get getNivelDeFormacion(){
        return this.nivelDeFormacion;
    }

    set setNivelDeFormacion(nivelDeFormacion: string){
        this.nivelDeFormacion = nivelDeFormacion;
    }
    get getResponsable(){
        return this.responsable;
    }

    set setResponsable(responsable: Responsable){
        this.responsable = responsable;
    }


}