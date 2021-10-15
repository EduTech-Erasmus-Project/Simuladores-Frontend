import { Component, OnInit } from '@angular/core';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { CountryService } from 'src/app/demo/service/countryservice';

interface City {
  name: string,
  code: string
}

interface Country {
  name: string,
  code: string
}

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styles: [`:host ::ng-deep .p-multiselect {
		min-width: 15rem;
	}

	:host ::ng-deep .multiselect-custom-virtual-scroll .p-multiselect {
		min-width: 20rem;
	}

	:host ::ng-deep .multiselect-custom .p-multiselect-label {
		padding-top: .25rem;
		padding-bottom: .25rem;

	}


	:host ::ng-deep .multiselect-custom .country-item.country-item-value {
		padding: .25rem .5rem;
		border-radius: 3px;
		display: inline-flex;
		margin-right: .5rem;
		background-color: var(--primary-color);
		color: var(--primary-color-text);
	}

	:host ::ng-deep .multiselect-custom .country-item.country-item-value img.flag {
		width: 17px;
	}

	:host ::ng-deep .multiselect-custom .country-item {
		display: flex;
		align-items: center;
	}

	:host ::ng-deep .multiselect-custom .country-item img.flag {
		width: 18px;
		margin-right: .5rem;
	}

	:host ::ng-deep .multiselect-custom .country-placeholder {
		padding: 0.25rem;
	}

	:host ::ng-deep .p-colorpicker {
		width: 2.5em
	}
    `]
})
export class DatosUsuarioComponent implements OnInit {
  
    countries: any[];

    filteredCountries: any[];

    selectedCountryAdvanced: any[];

    valSlider = 50;

    valColor = '#424242';

    valRadio: string;

    valCheck: string[] = [];

    valSwitch: boolean;

    cities: SelectItem[];

    selectedList: SelectItem;

    selectedDrop: SelectItem;

    selectedMulti: string[] = [];

    valToggle = false;

    paymentOptions: any[];

    valSelect1: string;

    valSelect2: string;

    valueKnob = 20;

    
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

  filterCountry(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
        const country = this.countries[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.filteredCountries = filtered;
  }

}
