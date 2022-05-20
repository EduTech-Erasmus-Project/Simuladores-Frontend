import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer, Representative } from './domain/customer';
import { CustomerService } from './domain/customerservice';
import { Product } from './domain/product';
import { ProductService } from './domain/productservice';
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
  private customerService: CustomerService; private productService: ProductService;

  constructor() {

  }

  ngOnInit(): void {
   
    this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
   
    this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ];
  }

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
