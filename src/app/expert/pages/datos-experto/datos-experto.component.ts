import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/core/interfaces/User";

@Component({
  selector: "app-datos-experto",
  templateUrl: "./datos-experto.component.html",
  styleUrls: ["./datos-experto.component.scss"],
})
export class DatosExpertoComponent implements OnInit {
  
  
  public responsable: User;
 

  constructor(private router: Router,) {}

  ngOnInit(): void {
    this.obtenerInformacionExperto();
    
  }

  

  obtenerInformacionExperto() {
    // this.responsableServiceInformacion
    //   .obtenerInformacionEvaluadorCorreo(this.correoResponsableDatos)
    //   .then((responsable) => {
    //     this.responsable? = responsable;
    //     this.nombreResponsable = this.responsable??.nombre;
    //     this.direccionResponsable = this.responsable?.direccion;
    //     this.nivelDeFormacionResponsable = this.responsable?.nivelDeFormacion;
    //     this.apellidoResponsable = this.responsable??.apellido;
    //     this.telefonoResponsable = this.responsable?.telefono;
    //     this.paisResponsable = this.responsable??.pais;
    //     this.ciudadResponsable = this.responsable??.ciudad;
    //   });
  }

  

}
