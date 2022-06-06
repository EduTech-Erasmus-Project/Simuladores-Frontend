import { Component, OnInit , ViewChild} from '@angular/core';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { ProductService } from 'src/app/demo/service/productservice';
import { Customer } from 'src/app/demo/domain/customer';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers.rowexpand-table .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
})
export class HomeComponent implements OnInit {
  
    lineData :any;
    pieData: any;

    customers1: Customer[];
    selectedCustomer1: Customer;

  

  @ViewChild('dt') table: Table;
  private customerService: CustomerService; private productService: ProductService;


  constructor() { }

  ngOnInit(): void {
    this.lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59 , 56, 55, 40],
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

  }

}
