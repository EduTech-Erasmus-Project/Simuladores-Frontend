export class Perfil {
    private id : number;
    private email : string;
    private password : string;
    private nombre : string; 
    private apellido : string;
    private telefono : string;
    private pais : string;
    private ciudad : string;
    private direccion : string;

    constructor(id : number, email : string, nombre : string, apellido : string, 
        telefono : string, pais : string, ciudad : string, direccion : string){
        this.id = id;
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.pais = pais;
        this.ciudad = ciudad;
        this.direccion = direccion;
    }

    get getId(){
        return this.id;
    }

    set setId(id: number){
        this.id = id
    }

    get getEmail(){
        return this.email;
    }

    set setEmail(email: string){
        this.email = email
    }

    get getPassword(){
        return this.password;
    }

    set setPassword(password: string){
        this.password = password
    }
    get getNombre(){
        return this.nombre;
    }

    set setNombre(nombre: string){
        this.nombre = nombre
    }
    get getApellido(){
        return this.apellido;
    }

    set setApellido(apellido: string){
        this.apellido = apellido
    }
    get getTelefono(){
        return this.telefono;
    }

    set setTelefono(telefono: string){
        this.telefono = telefono
    }
    get getPais(){
        return this.pais;
    }

    set setPais(pais: string){
        this.pais = pais
    }
    get getCiudad(){
        return this.ciudad;
    }

    set setCiudad(ciudad: string){
        this.ciudad = ciudad
    }
    get getDireccion(){
        return this.direccion;
    }

    set setDireccion(direccion: string){
        this.direccion = direccion
    }

}
