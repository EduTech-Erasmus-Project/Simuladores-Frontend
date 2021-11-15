//import { Page } from "@domain/page";
//import { getAccesibilityName } from "@utils/chart-utils";
import { BasicChart } from "./basic-chart";

export class PageCompliance extends BasicChart {

    constructor(subtitle?: string) {
        super({
            chart: {
                polar: true,
                height: '400',
                type: 'line'
            },
        
            title: {
                text: 'Cumplimiento'
            },
        
            subtitle: {
                text: subtitle
            },
        
            pane: {
                size: '65%'
            },
        
            xAxis: {
                tickInterval: 1,
                categories: ['Perceptible', 'Operable', 'Comprensible', 'Robusto'],
                tickmarkPlacement: 'on'
            },
        
            yAxis: {
                min: 0,
                max: 100,
                labels: {
                    formatter: function () {
                        return '<strong>' + this.value + '% </strong>';
                    }
                },
                tickInterval: 25,
                showLastLabel: true,
                lineWidth: 0,
            },
            
            tooltip: {
                shared: true,
                pointFormat: '<span style="color: black">{series.name}: <b>{point.y:,.0f}%</b><br/>'
            }
        });
    }
    /*
    setSerie(page: Page, perceivable: number, operable: number, 
        understandable: number, robust: number, color: string = '#7cb5ec'): void {
        
        let serieName: string = page.title ? page.title : page.url;
        let serie: any = {
            type: 'area',
            name: serieName,
            data: [perceivable, operable, understandable, robust]
        }

        this.removeSeries();
        this.addSerieToChart(serie);        
        this.addColor(color, true);
    }
    */
}