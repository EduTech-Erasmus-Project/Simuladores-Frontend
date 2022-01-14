import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { PhotoService } from 'src/app/demo/service/photoservice';
import { EjercitarioParticipanteService } from 'src/app/service/ejercitarioParticipante/ejercitario-participante.service';

@Component({
  selector: 'app-presentacion-inicio-user',
  templateUrl: './presentacion-inicio-user.component.html',
  styles: [
  ]
})
export class PresentacionInicioUserComponent implements OnInit {

  public correoParticanteInicio: string = '';
  images: any[];

  galleriaResponsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '960px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  constructor(private ejercitarioService: EjercitarioParticipanteService, private _Activatedroute:ActivatedRoute, private route: ActivatedRoute, private breadcrumbService: BreadcrumbService, private photoService: PhotoService) {
    this.breadcrumbService.setItems([
      { label: 'UI Kit' },
      { label: 'Charts', routerLink: ['/uikit/chart'] },
      { label: 'Media', routerLink: ['/uikit/media'] },
      {label: 'Timeline', routerLink: ['/pages/timeline']}
    ]);
   }

  ngOnInit(): void {
    this.photoService.getImages().then(images => {
      this.images = images;
    });

    this.correoParticanteInicio=this._Activatedroute.snapshot.paramMap.get("correo");
    console.log("Pagina de Inicio:", this.correoParticanteInicio)
    this.obtenercionAsignacionesEjercitario();
  }
  
  obtenercionAsignacionesEjercitario(){
    this.ejercitarioService.obtenerAsignacionesEjercitario(this.correoParticanteInicio).subscribe(
      response => {
        console.log(response.asignaciones);
      },
      error => {
        console.log(error);
      });
  }



}
