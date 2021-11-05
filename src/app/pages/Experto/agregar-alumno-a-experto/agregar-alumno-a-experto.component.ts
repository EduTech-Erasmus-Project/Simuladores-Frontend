import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Customer, Representative } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { ProductService } from 'src/app/demo/service/productservice';

@Component({
  selector: 'app-agregar-alumno-a-experto',
  templateUrl: './agregar-alumno-a-experto.component.html',
  styleUrls: ['./agregar-alumno-a-experto.component.css']
})
export class AgregarAlumnoAExpertoComponent implements OnInit {

  customers1: Customer[];
  representatives: Representative[];
  statuses: any[];
  selectedCustomers1: Customer[];
  
  constructor(private customerService: CustomerService, private productService: ProductService,
      private breadcrumbService: BreadcrumbService) { 
        this.breadcrumbService.setItems([
          { label: 'UI Kit' },
          { label: 'Table', routerLink: ['/uikit/table'] }
      ]);
    }
  ngOnInit(): void {
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

}
