import { Component, OnInit } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { CountryService } from 'src/app/demo/service/countryservice';

@Component({
  selector: 'app-registrar-user',
  templateUrl: './registrar-user.component.html',
  styleUrls: ['./registrar-user.component.css']
})
export class RegistrarUserComponent implements OnInit {

  groupedCities: SelectItemGroup[];  
  selectedCities4: any[];

  constructor(private countryService: CountryService, private breadcrumbService: BreadcrumbService) { 
    this.groupedCities = [
      {
          label: 'Alemania', value: 'de', 
          items: [
              {label: 'Berlin', value: 'Berlin'},
              {label: 'Frankfurt', value: 'Frankfurt'},
              {label: 'Hamburg', value: 'Hamburg'},
              {label: 'Munich', value: 'Munich'}
          ]
      },
      {
          label: 'Ecuador', value: 'ec', 
          items: [
              {label: 'Cuenca', value: 'Cuenca'},
              {label: 'Quito', value: 'Quito'},
              {label: 'Guayaquil', value: 'Guayaquil'},
              {label: 'Santo Domingo', value: 'Santo Domingo'},
              {label: 'Machala', value: 'Machala'},
              {label: 'Durán', value: 'Durán'},
              {label: 'Manta', value: 'Manta'},
              {label: 'Portoviejo', value: 'Portoviejo'},
              {label: 'Loja', value: 'Loja'},
              {label: 'Ambato', value: 'Ambato'}
              
          ]
      },
      {
        label: 'Japón', value: 'jp', 
        items: [
            {label: 'Kyoto', value: 'Kyoto'},
            {label: 'Osaka', value: 'Osaka'},
            {label: 'Tokyo', value: 'Tokyo'},
            {label: 'Yokohama', value: 'Yokohama'}
        ]
      },
      {
        label: 'Mexico', value: 'mx', 
        items: [
            {label: 'Guadalajara', value: 'Guadalajara'},
            {label: 'Guanajuato', value: 'Guanajuato'},
            {label: 'Puebla', value: 'Puebla'},
            {label: 'Morelia', value: 'Morelia'},
            {label: 'Monterrey', value: 'Monterrey'},
            {label: 'Querétaro', value: 'Querétaro'},
            {label: 'Mérida', value: 'Mérida'},
            {label: 'Ciudad de México', value: 'Ciudad de México'},
            {label: 'Xalapa', value: 'Xalapa'},
            {label: 'Zacatecas', value: 'Zacatecas'}
            
        ]
      },
      {
        label: 'USA', value: 'us', 
        items: [
            {label: 'Chicago', value: 'Chicago'},
            {label: 'Los Angeles', value: 'Los Angeles'},
            {label: 'New York', value: 'New York'},
            {label: 'San Francisco', value: 'San Francisco'}
        ]
      } 

    ];
    
    this.breadcrumbService.setItems([
      { label: 'UI Kit' },
      { label: 'Input', routerLink: ['/uikit/input'] }
    ]);
  }

  ngOnInit(): void {
  }

}
