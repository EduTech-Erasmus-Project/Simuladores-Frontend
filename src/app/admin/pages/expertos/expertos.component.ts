import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { ProductService } from 'src/app/demo/service/productservice';
import { Customer } from 'src/app/demo/domain/customer';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-expertos',
  templateUrl: './expertos.component.html',
  styleUrls: ['./expertos.component.scss'],
  styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers.rowexpand-table .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],

})
export class ExpertosComponent implements OnInit {
  customers1: Customer[];
  selectedCustomer1: Customer;

  customers2: Customer[];
  selectedCustomer2: Customer;

  customers3: Customer[];
  selectedCustomer3: Customer;

  @ViewChild('dt') table: Table;
  private customerService: CustomerService; private productService: ProductService;

  constructor() {

  }

  ngOnInit(): void {
   
   
  }

 
}
