import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeIcons, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Customer, Representative } from 'src/app/demo/domain/customer';
import { Product } from 'src/app/demo/domain/product';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { PhotoService } from 'src/app/demo/service/photoservice';
import { ProductService } from 'src/app/demo/service/productservice';






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
    ],
    //para tabla 
    styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers.rowexpand-table .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],

    
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

    //imagens
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


    // para instrucciones en orden
  customEvents: any[];

// para imagenes de f
  activeNews = 1;

  // para tabla 
    customers1: Customer[];

    customers2: Customer[];

    customers3: Customer[];

    selectedCustomers1: Customer[];

    selectedCustomer: Customer;

    representatives: Representative[];

    statuses: any[];

    products: Product[];

    rowGroupMetadata: any;

    activityValues: number[] = [0, 100];

    @ViewChild('dt') table: Table;


// para mostrar productos
products2: Product[];

sortOptions: SelectItem[];

sortOrder: number;

sortField: string;

sourceCities: any[];

targetCities: any[];

orderCities: any[];

sortKey: any



  constructor( private breadcrumbService: BreadcrumbService, private photoService: PhotoService,
    private customerService: CustomerService, private productService: ProductService, private productService2: ProductService) { 
    this.breadcrumbService.setItems([
      { label: 'UI Kit' },
      { label: 'Charts', routerLink: ['/uikit/chart'] },
      { label: 'Media', routerLink: ['/uikit/media'] },
      {label: 'Timeline', routerLink: ['/pages/timeline']},
      { label: 'Table', routerLink: ['/uikit/table'] }
  ]);
  }
  
  ngOnInit() {

    // para instrucciones... como en orden 
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

 //para fotos
    this.photoService.getImages().then(images => {
      this.images = images;
  });

//analisis
    this.lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Escenario 1',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              backgroundColor: 'rgb(255, 205, 86)',
              borderColor: 'rgb(255, 205, 86)'
          },
          {
              label: 'Escenario 2',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              backgroundColor: 'rgb(47, 100, 12)',
              borderColor: 'rgb(47, 100, 12)'
          },

          {
            label: 'Escenario 3',
            data: [56, 95, 8, 18, 37, 5, 10],
            fill: false,
            backgroundColor: 'rgb(255, 25, 36)',
            borderColor: 'rgb(255, 25, 36)'
        },
        {
            label: 'Escenario 4',
            data: [82, 84, 60, 30, 36, 27, 20],
            fill: false,
            backgroundColor: 'rgb(50, 12, 192)',
            borderColor: 'rgb(50, 12, 192)'
        },

        {
            label: 'Escenario 5',
            data: [15, 19, 40, 11, 26, 15, 30],
            fill: false,
            backgroundColor: 'rgb(25, 205, 68)',
            borderColor: 'rgb(25, 205, 68)'
        },
        {
            label: 'Escenario 6',
            data: [18, 28, 10, 29, 26, 17, 10],
            fill: false,
            backgroundColor: 'rgb(255, 129, 192)',
            borderColor: 'rgb(255, 129, 192)'
        }
      ]
  };
//analisis
  this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
         
        {
            label: 'Escenario 1',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: 'rgb(255, 205, 86)',
            borderColor: 'rgb(255, 205, 86)'
        },
        {
            label: 'Escenario 2',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: 'rgb(47, 100, 12)',
            borderColor: 'rgb(47, 100, 12)'
        },

        {
          label: 'Escenario 3',
          data: [56, 95, 8, 18, 37, 5, 10],
          fill: false,
          backgroundColor: 'rgb(255, 25, 36)',
          borderColor: 'rgb(255, 25, 36)'
      },
      {
          label: 'Escenario 4',
          data: [82, 84, 60, 30, 36, 27, 20],
          fill: false,
          backgroundColor: 'rgb(50, 12, 192)',
          borderColor: 'rgb(50, 12, 192)'
      },

      {
          label: 'Escenario 5',
          data: [15, 19, 40, 11, 26, 15, 30],
          fill: false,
          backgroundColor: 'rgb(25, 205, 68)',
          borderColor: 'rgb(25, 205, 68)'
      },
      {
          label: 'Escenario 6',
          data: [18, 28, 10, 29, 26, 17, 10],
          fill: false,
          backgroundColor: 'rgb(255, 129, 192)',
          borderColor: 'rgb(255, 129, 192)'
      }
      ]
  };
//analisis
  this.pieData = {
      labels: ['Esc 1', 'Esc 2', 'Esc3', 'Esc4', 'Esc5', 'Esc6'],
      datasets: [
          {
              data: [30, 15, 30, 10, 5, 10],
              backgroundColor: [
                  'rgb(54, 162, 235)',
                  'rgb(255, 99, 132)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(75, 19, 192)',
                  'rgb(75, 192, 19)'
              ]
          }]
  };
  //analisis

  this.polarData = {
      datasets: [{
          data: [
              100,
              77,
              53,
              39,
              25,
              17
          ],
          backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(75, 19, 192)',
              'rgb(75, 192, 19)'
          ],
          label: 'My dataset'
      }],
      labels: [
        'Esc 1', 'Esc 2', 'Esc3', 'Esc4', 'Esc5', 'Esc6'
      ]
  };

  // para anlsis

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

  //para tabla 
  this.customerService.getCustomersLarge().then(customers => {
    this.customers1 = customers;
    // @ts-ignore
    this.customers1.forEach(customer => customer.date = new Date(customer.date));
});
this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
this.customerService.getCustomersMedium().then(customers => this.customers3 = customers);
this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

this.representatives = [
    {name: 'Amy Elsner', image: 'amyelsner.png'},
    {name: 'Anna Fali', image: 'annafali.png'},
    {name: 'Asiya Javayant', image: 'asiyajavayant.png'},
    {name: 'Bernardo Dominic', image: 'bernardodominic.png'},
    {name: 'Elwin Sharvill', image: 'elwinsharvill.png'},
    {name: 'Ioni Bowcher', image: 'ionibowcher.png'},
    {name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png'},
    {name: 'Onyama Limba', image: 'onyamalimba.png'},
    {name: 'Stephen Shaw', image: 'stephenshaw.png'},
    {name: 'XuXue Feng', image: 'xuxuefeng.png'}
];

this.statuses = [
    {label: 'Bajo Bajo', value: 'Bajo Bajo'},
    {label: 'Calificado', value: 'Calificado'},
    {label: 'Nuevo', value: 'Nuevo'},
    {label: 'Medio Alto', value: 'Medio Alto'},
    {label: 'Bajo Alto', value: 'Bajo Alto'},
    {label: 'Alto Alto', value: 'Alto Alto'}
];

// para mostrar los productos 

this.productService.getProducts().then(data => this.products = data);

        this.sourceCities = [
            {name: 'San Francisco', code: 'SF'},
            {name: 'London', code: 'LDN'},
            {name: 'Paris', code: 'PRS'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Berlin', code: 'BRL'},
            {name: 'Barcelona', code: 'BRC'},
            {name: 'Rome', code: 'RM'}];
        this.targetCities = [];

        this.orderCities = [
            {name: 'San Francisco', code: 'SF'},
            {name: 'London', code: 'LDN'},
            {name: 'Paris', code: 'PRS'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Berlin', code: 'BRL'},
            {name: 'Barcelona', code: 'BRC'},
            {name: 'Rome', code: 'RM'}];

        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'}
        ];

  }


  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
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

// para tabla 
onSort() {
    this.updateRowGroupMetaData();
}

updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.customers3) {
        for (let i = 0; i < this.customers3.length; i++) {
            const rowData = this.customers3[i];
            const representativeName = rowData.representative.name;

            if (i === 0) {
                this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
            }
            else {
                const previousRowData = this.customers3[i - 1];
                const previousRowGroup = previousRowData.representative.name;
                if (representativeName === previousRowGroup) {
                    this.rowGroupMetadata[representativeName].size++;
                }
                else {
                    this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                }
            }
        }
    }
}


}
