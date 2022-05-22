import { Component, OnInit, ViewChild} from '@angular/core';
import { Customer, Representative } from './domain/customer';
import { CustomerService } from './domain/customerservice';
import { Product } from './domain/product';
import { ProductService } from './domain/productservice';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-simuladores',
  templateUrl: './simuladores.component.html',
  styleUrls: ['./simuladores.component.scss'],
  styles: [`
  @media screen and (max-width: 960px) {
      :host ::ng-deep .p-datatable.p-datatable-customers.rowexpand-table .p-datatable-tbody > tr > td:nth-child(6) {
          display: flex;
      }
  }

`],
})
export class SimuladoresComponent implements OnInit {
  customers: Customer[];
  selectedCustomer1: Customer;
  display:boolean;
  display1:boolean;

  @ViewChild('dt') table: Table;
  private customerService: CustomerService; private productService: ProductService;



  constructor() { }

  ngOnInit(): void {
  }

}
