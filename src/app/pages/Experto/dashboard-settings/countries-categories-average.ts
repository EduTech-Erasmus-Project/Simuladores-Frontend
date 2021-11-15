//import { Country } from "@domain/country";
import { BasicChart } from "./basic-chart";

export class CountryCategoriesAverage extends BasicChart{
    constructor(subtitle?: string) {
        super({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Promedio Países - Categorías'
            },
    
            subtitle: {
                text: subtitle
            },
    
            xAxis: {
                crosshair: true,
                title: {
                    text: 'Países',
                    align: 'middle'
                }
            },
    
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'Promedio [%]',
                    align: 'middle'
                },
            },
    
            tooltip: {
                // pointFormat: '<strong style="color:{series.color}">{series.name}</strong>: <b>{point.y}</b><br/>',
                // shared: true,
                // valueSuffix: ' %'
    
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
    
                borderRadius: 10,
                animation: true
            },
    
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                    },
                },
                column: {
                    dataLabels: {
                        enabled: true
                    },
                    pointPadding: 0.2,
                    borderWidth: 0,
                    borderRadius: 3
                }
            }
        });
    }

    addSerie(name: string, countryAverages: number[]): void {
        let serie: any = {
            name: name,
            data: countryAverages
        };

        this.addSerieToChart(serie);
    }

    /*
    setCountryList(countryList: Country[]): void {
        let countryNames: string[] = [];
        countryList.forEach((country: Country) => {
            countryNames.push(country.name);
        });
        this.getOptions().xAxis.categories = countryNames;
    }
    */
}