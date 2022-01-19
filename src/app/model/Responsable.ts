import { Perfil } from "./Perfil";

export class Responsable extends Perfil{

    private nivelDeFormacion: string;

    constructor(id : number, email : string, nombre : string, apellido : string, 
        telefono : string, pais : string, ciudad : string, direccion : string , 
        nivelDeFormacion: string){
        
        super(id, email, nombre, apellido, telefono, pais, ciudad, direccion)
        this.nivelDeFormacion = nivelDeFormacion;
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
    
    get getnivelDeFormacion(){
        return this.nivelDeFormacion;
    }

    set setNivelDeFormacion(nivelDeFormacion: string){
        this.nivelDeFormacion = nivelDeFormacion;
    }

}