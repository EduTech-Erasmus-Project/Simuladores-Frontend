//import { getAccesibilityName } from "@utils/chart-utils";
import { BasicChart } from "./basic-chart";

export class PagesCompliance extends BasicChart {

    constructor(subtitle?: string) {
        super({
            chart: {
                polar: true,
                height: '400',
                type: 'line'
            },
        
            title: {
                text: 'Cumplimiento entre Páginas'
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
    
    /**
     * This method add a serie of accessibility indicators average
     * values
     * @param name Series name
     * @param perceivable Perceivable Average
     * @param operable Operable Average
     * @param understandable Undestandable Average
     * @param strong Strong Average
     */
    addSerie(name: string, perceivable: number,
        operable: number, understandable: number, strong: number): void {

        let accessibilityAverage: number[] = [perceivable, operable, 
            understandable, strong];

        let serie: any = {
            type: 'line',
            name: name,
            data: accessibilityAverage
        }

        this.addSerieToChart(serie);
    }
}