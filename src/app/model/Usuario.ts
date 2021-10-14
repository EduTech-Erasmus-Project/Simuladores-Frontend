export class Usuario {
    private correo: string;
    private password: string;

    constructor(correo: string, password: string) {
        this.correo = correo;
        this.password = password;
    }

    getCorreo(): string {
        return this.correo;
    }

    getPassword(): string {
        return this.password;
    }
}