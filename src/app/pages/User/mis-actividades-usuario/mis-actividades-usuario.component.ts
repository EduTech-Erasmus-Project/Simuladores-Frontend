import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../../Structure/menu-lateral/menu-lateral.component';
import { MenuFooterPageComponent } from '../../Structure/menu-footer-page/menu-footer-page.component';
import { MenuTopBarComponent } from '../../Structure/menu-top-bar/menu-top-bar.component';
import { Customer, Representative } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { ProductService } from 'src/app/demo/service/productservice';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mis-actividades-usuario',
  templateUrl: './mis-actividades-usuario.component.html',
  styleUrls: ['./mis-actividades-usuario.component.css'],
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
export class MisActividadesUsuarioComponent implements OnInit {

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
  buscarTextoRegistro: string;
  representatives: Representative[];
  customers1: Customer[];
  selectedCustomers1: Customer[];
  statuses: any[];
  private correoParticanteActividades: string = '';

  constructor(private _Activatedroute:ActivatedRoute, private customerService: CustomerService, private productService: ProductService,
    private breadcrumbService: BreadcrumbService) { 
      this.breadcrumbService.setItems([
        { label: 'UI Kit' },
        { label: 'Table', routerLink: ['/uikit/table'] }
    ]);
    }

  ngOnInit(): void {

    this.correoParticanteActividades = this._Activatedroute.snapshot.paramMap.get("correo");
    console.log("Pagina de Mis actividades: ", this.correoParticanteActividades)

    this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
      // @ts-ignore
      this.customers1.forEach(customer => customer.date = new Date(customer.date));
    });
  
  
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
        {label: '10', value: '10'},
        {label: '9', value: '9'},
        {label: '9', value: '9'},
        {label: '9', value: '9'},
        {label: '5', value: '5'},
        {label: '4', value: '4'}
    ];
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
