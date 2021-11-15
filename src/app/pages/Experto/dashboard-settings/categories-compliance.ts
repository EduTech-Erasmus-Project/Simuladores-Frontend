import { BasicChart } from './basic-chart';

export class CategoriesCompliance extends BasicChart{
    
    constructor(subtitle?: string){

        super({
            chart: {
                polar: true,
                type: 'line'
            },
        
            title: {
                text: 'Cumplimiento entre Categorías'
            },
        
            subtitle: {
                text: subtitle
            },
        
            pane: {
                // startAngle: 0,
                // endAngle: 360
                size: '80%'
            },
        
            xAxis: {
                labels: {
                    // formatter: function() {
                    //     return getAccesibilityName(this.value);
                    // },
                },
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
                // formatter: function () {
                //     return getAccesibilityName(this.x) +
                //         ': <b>' + this.y + ' %</b>';
                // }{series.color}
                shared: true,
                pointFormat: '<span style="color: black">{series.name}: <b>{point.y:,.0f}%</b><br/>'
            },

            series: []
        });
    }

    addSerie(name: string, perceivable: number, operable: number, 
        understandable: number, robust: number): void {
        
        let data: number[] = [perceivable, operable, understandable, robust];
        let serie: any = {
            type: 'line',
            name: name,
            data: data
        }
        this.addSerieToChart(serie);
    }
}