import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { PhotoService } from 'src/app/demo/service/photoservice';

@Component({
  selector: 'app-inicio-e',
  templateUrl: './inicio-e.component.html',
  styleUrls: ['./inicio-e.component.css'],
  animations: [
    trigger('mask-anim', [
        state('void', style({
            opacity: 0
        })),
        state('visible', style({
            opacity: 0.8
        })),
        transition('* => *', animate('250ms cubic-bezier(0, 0, 0.2, 1)'))
    ])
]
})
export class InicioEComponent implements OnInit {

  menuClick: boolean;
  sidebarActive: boolean;
  staticMenuActive: boolean;
  topbarMenuActive: boolean;
  megaMenuMobileClick: boolean;
  megaMenuMobileActive: boolean;
  topbarMobileMenuClick: boolean;
  topbarMobileMenuActive: boolean;
  menuMobileActive: boolean;
  activeTopbarItem: any;
  topbarItemClick: boolean;

  lineData: any;

    barData: any;

    pieData: any;

    polarData: any;

    radarData: any;

    
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



  customEvents: any[];


  activeNews = 1;
  constructor( private breadcrumbService: BreadcrumbService, private photoService: PhotoService) { 
    this.breadcrumbService.setItems([
      { label: 'UI Kit' },
      { label: 'Charts', routerLink: ['/uikit/chart'] },
      { label: 'Media', routerLink: ['/uikit/media'] },
      {label: 'Timeline', routerLink: ['/pages/timeline']}
  ]);
  }
  
  ngOnInit() {

    this.customEvents = [
        {
            status: 'Ingresar al Juego',
            date: '15/10/2020 10:30',
            icon: PrimeIcons.SHOPPING_CART,
            color: '#9C27B0',
            image: 'entrarJuego.jpg',
            content: 'Al ingresar al ambiente de juego, realiza configuraciones que cree pertinentes. El participante selecciona un escenario para practicar una determinada habilidad. '
        },
        {status: 'Leer las instrucciones', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7',
        image: 'leerInstrucciones.jpg',
        content: 'En cada escenario, existe las instrucciones para el participante. Se explica cuales son las tareas que debe realizar y su puesto en la empresa en algunos casos. El participante tiene la posibilidad de volver a leer las instrucciones con el botón de volver. De igual manera tiene el botón de seguir. Para facilitar su selección cuentan con navegación por teclado'
    },

        {status: 'Responder', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800',
        image: 'respuesta.jpg', 
        content: 'El participante después de leer las instrucciones y haber comprendido los contendios, ingresa a la escena respuesta, las respuestas ingresadas como el tiempo de respuesta es guardada para posteriores estudios, que se presentan en esta sección'
    },
        {status: 'Análisis de respuestas', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B', 
        image: 'analisis.jpg',
        content: 'En esta sección se presenta los resultados de cada estudiante en cada escenario. Mediante una estadística descriptiva, de forma que el experto pueda observar de forma más rápida y comprensible los datos que se obtuvieron de la resolución de escenarios por parte de los participantes'
    }
    ];

 
    this.photoService.getImages().then(images => {
      this.images = images;
  });


    this.lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              backgroundColor: 'rgb(255, 205, 86)',
              borderColor: 'rgb(255, 205, 86)'
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgb(75, 192, 192)'
          }
      ]
  };

  this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: 'rgb(54, 162, 235)',
              borderColor: 'rgb(54, 162, 235)',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };

  this.pieData = {
      labels: ['A', 'B', 'C'],
      datasets: [
          {
              data: [540, 325, 702, 421],
              backgroundColor: [
                  'rgb(54, 162, 235)',
                  'rgb(255, 99, 132)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)'
              ]
          }]
  };

  this.polarData = {
      datasets: [{
          data: [
              11,
              16,
              7,
              3
          ],
          backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)'
          ],
          label: 'My dataset'
      }],
      labels: [
          'Blue',
          'Purple',
          'Orange',
          'Green'
      ]
  };

  this.radarData = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: 'rgba(54, 162, 235,0.2)',
              borderColor: 'rgba(54, 162, 235,1)',
              pointBackgroundColor: 'rgba(54, 162, 235,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(54, 162, 235,1)',
              data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: 'rgba(255, 99, 132,0.2)',
              borderColor: 'rgba(255, 99, 132,1)',
              pointBackgroundColor: 'rgba(255, 99, 132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 99, 132,1)',
              data: [28, 48, 40, 19, 96, 27, 100]
          }
      ]
  };

  }

  onSidebarClick(event: Event) {
    this.menuClick = true;
  }

  onToggleMenuClick(event: Event) {
    this.staticMenuActive = !this.staticMenuActive;
    event.preventDefault();
  }

  onMenuButtonClick(event) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.isMobile()) {
        this.menuMobileActive = !this.menuMobileActive;
    }

    event.preventDefault();
  }

  onMegaMenuMobileButtonClick(event) {
    this.megaMenuMobileClick = true;
    this.megaMenuMobileActive = !this.megaMenuMobileActive;

    event.preventDefault();
  }

  onTopbarMobileMenuButtonClick(event) {
    this.topbarMobileMenuClick = true;
    this.topbarMobileMenuActive = !this.topbarMobileMenuActive;

    event.preventDefault();
  }

  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
        this.activeTopbarItem = null; } else {
        this.activeTopbarItem = item; }

    event.preventDefault();
  }

  isMobile() {
    return window.innerWidth <= 991;
}

}
