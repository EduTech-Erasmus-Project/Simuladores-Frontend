import { animate, state, style, transition, trigger } from '@angular/animations';
import { PrimeIcons, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Customer, Representative } from 'src/app/demo/domain/customer';
import { Product } from 'src/app/demo/domain/product';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { PhotoService } from 'src/app/demo/service/photoservice';
import { ProductService } from 'src/app/demo/service/productservice';





import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CategoriesAverage } from '../dashboard-settings/categories-average';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
let Solid = require('highcharts/modules/solid-gauge');
let Exporting = require('highcharts/modules/exporting')



Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
Solid(Highcharts);
Exporting(Highcharts);

@Component({
  selector: 'app-rep-escenario1',
  templateUrl: './rep-escenario1.component.html',
  styleUrls: ['./rep-escenario1.component.css'],

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
export class RepEscenario1Component implements OnInit {

  private subtitleChart: string = 'Fuente: Observatorio UPS';
  private categoriesAverage: CategoriesAverage = new CategoriesAverage(this.subtitleChart);
  private categoriesComplianceChart: Highcharts.Chart;
 // private categoriesCompliance: CategoriesCompliance = new CategoriesCompliance(this.subtitleChart);
  private categoriesAverageChart: Highcharts.Chart;
  private countryCategoriesAverageChart: Highcharts.Chart;

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

/// parala tabla 
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
    
    
    
    // para mostrar productos
    products2: Product[];
    
    sortOptions: SelectItem[];
    
    sortOrder: number;
    
    sortField: string;
    
    sourceCities: any[];
    
    targetCities: any[];
    
    orderCities: any[];
    
    sortKey: any
    


    // para las graficas 
    
    lineData: any;

    barData: any;


  constructor(private breadcrumbService: BreadcrumbService, private photoService: PhotoService,
    private customerService: CustomerService, private productService: ProductService) { 

    // para la grafica 
    this.breadcrumbService.setItems([
      { label: 'UI Kit' },
      { label: 'Charts', routerLink: ['/uikit/chart'] }
  ]);

    }

  ngOnInit(): void {

     //para fotos
     this.photoService.getImages().then(images => {
      this.images = images;
     });

     this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
      // @ts-ignore
      this.customers1.forEach(customer => customer.date = new Date(customer.date));
    });
    this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
    this.customerService.getCustomersMedium().then(customers => this.customers3 = customers);
    this.productService .getProductsWithOrdersSmall().then(data => this.products = data);
  
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
        {label: 'Unqualified', value: 'unqualified'},
        {label: 'Qualified', value: 'qualified'},
        {label: 'New', value: 'new'},
        {label: 'Negotiation', value: 'negotiation'},
        {label: 'Renewal', value: 'renewal'},
        {label: 'Proposal', value: 'proposal'}
    ];


    try {

      // this.categoriesComplianceChart = Highcharts.chart('categories-compliance', this.categoriesComplianceChart.);
       //this.countryCategoriesAverageChart = Highcharts.chart('country-categories-average', this.countryCategoriesAverage.getOptions());
      this.categoriesAverageChart = Highcharts.chart('categories-average', this.categoriesAverage.getOptions());
 
      // this.pagesComplianceChart = Highcharts.chart('pages-compliance', this.pagesCompliance.getOptions());
      // this.pagesAverageChart = Highcharts.chart('pages-average', this.pagesAverage.getOptions());
      // this.pageComplianceChart = Highcharts.chart('page-compliance', this.pageCompliance.getOptions());
 
      // await this.loadSeries();
      // this.updateAllCharts();
 
     } catch (error) {
       console.log(error);
     }
 


     //para las graficas
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
    
   }
 
   async loadSeries(): Promise<void> {
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