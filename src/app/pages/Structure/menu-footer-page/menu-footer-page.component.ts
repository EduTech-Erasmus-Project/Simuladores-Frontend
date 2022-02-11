import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-footer-page',
  template: `
    <div class="layout-footer">
      <div class="logo-text">
        <img src="https://pbs.twimg.com/profile_images/1407722978817753092/1c1uNlH7_400x400.jpg" alt="mirage-layout" />
        <div class="text">
          <h1>Simuladores Laborales</h1>
          <span>ERASMUS + EDUTECH project</span>
        </div>
      </div>

      <div class="logo-text">
        <i class="pi pi-map-marker" style="font-size: 2rem"></i>
        <div class="text">
          <h1 style="font-weight: bold;">Ubicacion</h1>
          <span>Calle Vieja, El vecino <br> Cuenca-Ecuador</span>
        </div>
      </div>

      <div class="logo-text">
      <img
        src="https://cdn.pixabay.com/photo/2020/04/25/18/14/european-union-flag-5092020_960_720.png"
        alt="mirage-layout"
      />
      <div class="text">
        <h1 style="font-weight: bold">Cofinanciado por la UE</h1>
        <span style="font-size: 0.8em">
            &copy; 2022 Todos los derechos reservados | Developed By <a href="https://edutech-project.org/">EduTech</a>  <br>
            <a [routerLink]="['/terminos-condiciones']"> Términos y condiciones</a>
        </span>
           
      </div>
    </div>
      
      <div class="logo-text">
        <i class="pi pi-wifi" style="font-size: 2rem"></i>
        <div class="text">
          <h1 style="font-weight: bold;">Redes Sociales</h1>
          
            <div class="icon icon-hastag">
              <span> <i class="pi pi-envelope" style="font-size: 1em;"></i> <a href="mailto:catedraunescoinclusion@ups.edu.ec">  catedraunescoinclusion@ups.edu.ec </a></span>
            </div>

            <div class="icon icon-hastag">
              <span> <i class="pi pi-facebook" style="font-size: 1em;"></i> <a href=" https://www.facebook.com/inclusionups/">  https://www.facebook.com/inclusionups/ </a></span>
            </div>
          
        </div>        
      </div>
    </div>

      
  `,
  styles: [
  ]
})
export class MenuFooterPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
