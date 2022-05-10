export class Usuario {
    private correo: string;
    private password: string;
    private tipoUsuario: string;

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

    getTipoUsuario(): string {
        return this.tipoUsuario;
    }

    setTipoUsuario(tipo: string): void {
        this.tipoUsuario = tipo;
    }
}